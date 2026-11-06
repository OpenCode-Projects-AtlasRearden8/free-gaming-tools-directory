/* Freebie Directory — self-verification.
   Run: node tools/verify.js
   Validates data integrity, file references, license/credit lines, and secret-free files. */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.join(__dirname, "..");
let failures = 0;

function check(name, cond, detail) {
  if (cond) {
    console.log("  ok  " + name);
  } else {
    failures++;
    console.log("  FAIL " + name + (detail ? " — " + detail : ""));
  }
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

console.log("== Freebie Directory verification ==");

// --- 1. Data integrity ---
const sandbox = {};
vm.createContext(sandbox);
const entries = vm.runInContext(read("js/data.js") + "\n;ENTRIES", sandbox, { filename: "data.js" });
check("ENTRIES exists and is an array", Array.isArray(entries) && entries.length > 0);
check("at least 20 entries", entries.length >= 20, "found " + (entries && entries.length));

const CATS = ["save", "achievements", "controllers", "screenshots", "notes"];
const OFFLINE = ["yes", "partial", "no"];
let badFields = [];
let perCat = {};
entries.forEach((e, i) => {
  const where = `entry #${i} (${e.name || "?"})`;
  if (!e.name || typeof e.name !== "string") badFields.push(where + " name");
  if (!/^https:\/\/\S+/.test(e.url || "")) badFields.push(where + " url not https");
  if (!CATS.includes(e.category)) badFields.push(where + " category");
  if (!e.whatItChecks || e.whatItChecks.length < 20) badFields.push(where + " whatItChecks too short");
  if (!e.platform || typeof e.platform !== "string") badFields.push(where + " platform");
  if (!OFFLINE.includes(e.offline)) badFields.push(where + " offline flag");
  if (!e.verdict || e.verdict.length < 15 || e.verdict.length > 200) badFields.push(where + " verdict length/missing");
  perCat[e.category] = (perCat[e.category] || 0) + 1;
});
check("every entry has complete required fields", badFields.length === 0, badFields.join("; "));
CATS.forEach((c) => check(`category "${c}" has entries`, (perCat[c] || 0) > 0, "none"));

const names = entries.map((e) => e.name.toLowerCase());
const dups = names.filter((n, i) => names.indexOf(n) !== i);
check("no duplicate entries", dups.length === 0, dups.join(", "));

// --- 2. Files exist and connect ---
["index.html", "css/styles.css", "js/data.js", "js/app.js",
 "docs/curation-policy.html", "docs/tool-review-checklist.html",
 "README.md", "LICENSE"].forEach((f) => check(`file present: ${f}`, fs.existsSync(path.join(root, f))));

const idx = read("index.html");
check("index links css", idx.includes('href="css/styles.css"'));
check("index links data.js and app.js", idx.includes('src="js/data.js"') && idx.includes('src="js/app.js"'));
check("index does not load external scripts", !/<script[^>]+src=["']https?:/.test(idx));
check("index links docs", idx.includes("docs/curation-policy.html"));

for (const d of ["docs/curation-policy.html", "docs/tool-review-checklist.html"]) {
  const doc = read(d);
  check(`${d} links stylesheet`, doc.includes('href="../css/styles.css"'));
  check(`${d} links back to index`, doc.includes('href="../index.html"'));
}

// --- 3. License + credit ---
const lic = read("LICENSE");
check("LICENSE exact copyright line", lic.includes("Copyright (c) 2026 Asdale Dynamics, LLC"));
check("LICENSE is MIT", lic.includes("Permission is hereby granted, free of charge"));

const readme = read("README.md");
check("README credits Asdale Dynamics, LLC", readme.includes("Asdale Dynamics, LLC"));
check("README has run instructions", /python3 -m http\.server|xdg-open index\.html/.test(readme));

const idxWide = idx;
check("index credits", idxWide.includes("Asdale Dynamics, LLC"));

// --- 4. No secrets / API keys ---
const errRe = /(api[_-]?key\s*[:=]\s*["'][^"']{8,}|secret\s*[:=]\s*["'][^"']{8,}|Bearer\s+[A-Za-z0-9_\-]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/i;
const files = ["index.html", "css/styles.css", "js/data.js", "js/app.js",
  "docs/curation-policy.html", "docs/tool-review-checklist.html", "README.md", "LICENSE"];
let leaked = [];
files.forEach((f) => { if (errRe.test(read(f))) leaked.push(f); });
check("no secrets or API keys in files", leaked.length === 0, leaked.join(", "));

// --- 5. No tracking / no external requests ---
files.forEach((f) => {
  const c = read(f);
  check(`${f} has no analytics/tracking`, !/(googletagmanager|google-analytics|hotjar|plausible|posthog|umami|cloudflareinsights)/i.test(c));
});

console.log("--------------------------------------------------");
if (failures === 0) {
  console.log(`PASS — ${entries.length} entries checked, all ${files.length + 6} core files verified.`);
  process.exit(0);
} else {
  console.log(`FAIL — ${failures} problem(s).`);
  process.exit(1);
}
