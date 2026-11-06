/* Freebie Directory — render + filter logic. No dependencies, no network calls. */
(function () {
  "use strict";

  var CATEGORY_LABELS = {
    save: "Save & backup",
    achievements: "Achievements & backlog",
    controllers: "Controller mappers",
    screenshots: "Screenshot organizers",
    notes: "Wiki note-takers"
  };

  var CATEGORY_ORDER = ["save", "achievements", "controllers", "screenshots", "notes"];

  var state = {
    query: "",
    category: "all",
    offlineOnly: false
  };

  var entriesEl = document.getElementById("entries");
  var searchEl = document.getElementById("search");
  var filtersEl = document.getElementById("category-filters");
  var offlineEl = document.getElementById("offline-only");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function offlineLabel(flag) {
    if (flag === "yes") return { text: "Offline-first", cls: "off-yes" };
    if (flag === "partial") return { text: "Partly offline", cls: "off-part" };
    return { text: "Needs internet", cls: "off-no" };
  }

  function matches(entry) {
    if (state.category !== "all" && entry.category !== state.category) return false;
    if (state.offlineOnly && entry.offline !== "yes") return false;
    var q = state.query.trim().toLowerCase();
    if (!q) return true;
    var hay = [entry.name, entry.whatItChecks, entry.platform, entry.verdict,
               CATEGORY_LABELS[entry.category] || ""].join(" ").toLowerCase();
    return q.split(/\s+/).every(function (w) { return hay.indexOf(w) !== -1; });
  }

  function renderEntry(entry) {
    var cat = CATEGORY_LABELS[entry.category] || entry.category;
    var off = offlineLabel(entry.offline);
    var html = '' +
      '<article class="card">' +
        '<div class="card-head">' +
          '<h2><a href="' + esc(entry.url) + '" target="_blank" rel="noopener noreferrer">' + esc(entry.name) + "</a></h2>" +
          '<span class="badge ' + off.cls + '">' + esc(off.text) + "</span>" +
        "</div>" +
        '<p class="cat">' + esc(cat) + "</p>" +
        '<p class="checks"><strong>What it checks:</strong> ' + esc(entry.whatItChecks) + "</p>" +
        '<p class="platform"><strong>Platform:</strong> ' + esc(entry.platform) + "</p>" +
        '<p class="verdict"><span class="verdict-name">Dylan says:</span> ' + esc(entry.verdict) + "</p>" +
      "</article>";
    var tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    return tpl.content.firstElementChild;
  }

  function render() {
    entriesEl.innerHTML = "";
    CATEGORY_ORDER.forEach(function (cat) {
      var hits = ENTRIES.filter(function (e) {
        return e.category === cat && matches(e);
      });
      if (!hits.length) return;
      var h = document.createElement("h2");
      h.className = "section-title";
      h.textContent = CATEGORY_LABELS[cat] + " (" + hits.length + ")";
      entriesEl.appendChild(h);
      var grid = document.createElement("div");
      grid.className = "grid";
      hits.forEach(function (e) { grid.appendChild(renderEntry(e)); });
      entriesEl.appendChild(grid);
    });
    var total = CATEGORY_ORDER.reduce(function (n, cat) {
      return n + ENTRIES.filter(function (e) { return e.category === cat && matches(e); }).length;
    }, 0);
    if (!total) {
      entriesEl.innerHTML = '<p class="empty">Nothing matched. Try a broader search, or turn off "offline-first only".</p>';
    }
  }

  function buildFilters() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip active";
    btn.textContent = "All (" + ENTRIES.length + ")";
    btn.setAttribute("data-cat", "all");
    filtersEl.appendChild(btn);
    CATEGORY_ORDER.forEach(function (cat) {
      var n = ENTRIES.filter(function (e) { return e.category === cat; }).length;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = CATEGORY_LABELS[cat] + " (" + n + ")";
      b.setAttribute("data-cat", cat);
      filtersEl.appendChild(b);
    });
    filtersEl.addEventListener("click", function (ev) {
      var t = ev.target.closest("button.chip");
      if (!t) return;
      state.category = t.getAttribute("data-cat");
      Array.prototype.forEach.call(filtersEl.querySelectorAll("button"), function (b) {
        b.classList.toggle("active", b === t);
      });
      render();
    });
  }

  buildFilters();
  searchEl.addEventListener("input", function () {
    state.query = searchEl.value;
    render();
  });
  offlineEl.addEventListener("change", function () {
    state.offlineOnly = offlineEl.checked;
    render();
  });

  render();
})();
