/* Freebie Directory — data.
   Fields per entry:
   - name: tool name
   - url: official site or repository (https only)
   - category: save | achievements | controllers | screenshots | notes
   - whatItChecks: one plain-English line on what the tool actually checks or handles
   - platform: platforms in plain words
   - offline: "yes" | "partial" | "no" (offline-first flag)
   - verdict: one-line verdict in Dylan's plain voice
*/
const ENTRIES = [
  // ---------- Save managers ----------
  {
    name: "Ludusavi",
    url: "https://github.com/mtkennerly/ludusavi",
    category: "save",
    whatItChecks: "Checks which of your games keep save files where, then backs them up (18,000+ games mapped, across Steam, GOG, Epic, and more).",
    platform: "Windows, macOS, Linux",
    offline: "yes",
    verdict: "If you've ever lost a 60-hour save, this is the tool that makes sure it never happens again."
  },
  {
    name: "GameSave Manager",
    url: "https://www.gamesave-manager.com",
    category: "save",
    whatItChecks: "Checks your drive for known save-file locations and copies them into dated backup archives you can restore later.",
    platform: "Windows",
    offline: "yes",
    verdict: "Old-school, does one job, and the job is 'stop your saves from dying quietly in a folder you forgot about.'"
  },
  {
    name: "Rclone",
    url: "https://rclone.org",
    category: "save",
    whatItChecks: "Checks folders against a mirror — point it at your saves directory and it syncs diffs to a drive or cloud of your choice.",
    platform: "Windows, macOS, Linux",
    offline: "partial",
    verdict: "A belt-and-suspenders option for people who tired of clicking 'backup' and want the computer to do it forever."
  },

  // ---------- Achievements & backlog ----------
  {
    name: "Playnite",
    url: "https://github.com/JosefNemec/Playnite",
    category: "achievements",
    whatItChecks: "Checks every launcher you own games on and merges them into one library, with playtime and completion info in one place.",
    platform: "Windows",
    offline: "partial",
    verdict: "If your games are scattered across five launchers and you can't remember what you own, this is the tunnel out."
  },
  {
    name: "GOG Galaxy (free client)",
    url: "https://www.gog.com/galaxy",
    category: "achievements",
    whatItChecks: "Checks achievements, playtime, and friend activity across multiple store accounts and rolls them into one unified library.",
    platform: "Windows, macOS",
    offline: "no",
    verdict: "The launcher you install for the library view, then cheerfully ignore the store part of."
  },
  {
    name: "Backloggd",
    url: "https://www.backloggd.com",
    category: "achievements",
    whatItChecks: "Checks nothing on your PC — it's a website where you log owned, played, and beaten games to see how your backlog stacks up.",
    platform: "Web (any device)",
    offline: "no",
    verdict: "The polite mirror every backlog owner needs: here's how many games you bought and never started."
  },
  {
    name: "RetroAchievements",
    url: "https://retroachievements.org",
    category: "achievements",
    whatItChecks: "Checks your emulator gameplay against community-made achievement sets for thousands of classic console games.",
    platform: "Via supported emulators (Windows, macOS, Linux)",
    offline: "no",
    verdict: "Gives your old cartridges a coffee-stained notebook's worth of goals. Fair warning: the 100% rabbit hole is deep."
  },
  {
    name: "HowLongToBeat",
    url: "https://howlongtobeat.com",
    category: "achievements",
    whatItChecks: "Checks crowd-sourced completion times for games, so you know whether that backlog item is an evening or a month.",
    platform: "Web (community extensions for most launchers)",
    offline: "no",
    verdict: "The single most useful 'should I even start this' tool on the internet, powered entirely by people who finished the game."
  },

  // ---------- Controller mappers ----------
  {
    name: "AntiMicroX",
    url: "https://github.com/AntiMicroX/antimicrox",
    category: "controllers",
    whatItChecks: "Checks your controller's buttons and sticks, then maps them to keyboard and mouse actions for any game or app.",
    platform: "Windows, Linux",
    offline: "yes",
    verdict: "Makes old games with zero controller support play nice with a gamepad, no launchers, no fuss."
  },
  {
    name: "DS4Windows",
    url: "https://github.com/Ryochan7/DS4Windows",
    category: "controllers",
    whatItChecks: "Checks DualShock and DualSense pads and shows them to Windows as an Xbox controller, with remapping and lightbar control.",
    platform: "Windows",
    offline: "yes",
    verdict: "The reason your PlayStation controller works in every game on Windows, and you never think about it again."
  },
  {
    name: "JoyToKey",
    url: "https://joytokey.net",
    category: "controllers",
    whatItChecks: "Checks any gamepad input and turns it into keyboard presses, with per-game profiles you can switch between.",
    platform: "Windows",
    offline: "yes",
    verdict: "Ancient, unglamorous, and still the first answer to 'how do I use this random controller with that random game.'"
  },
  {
    name: "Input Remapper",
    url: "https://github.com/sezanzeb/input-remapper",
    category: "controllers",
    whatItChecks: "Checks your keyboard, mouse, and controller inputs and remaps them system-wide on Linux, per-device and per-app.",
    platform: "Linux",
    offline: "yes",
    verdict: "The Linux-native mapper that quietly does everything the Windows ones do, without fighting you."
  },
  {
    name: "x360ce",
    url: "https://github.com/x360ce/x360ce",
    category: "controllers",
    whatItChecks: "Checks for old DirectInput controllers and fakes them out as an Xbox 360 pad for games that only speak Xbox.",
    platform: "Windows",
    offline: "yes",
    verdict: "A translator for the weirdest controllers in your drawer. Ugly UI, perfect job."
  },

  // ---------- Screenshot organizers ----------
  {
    name: "ShareX",
    url: "https://getsharex.com",
    category: "screenshots",
    whatItChecks: "Checks hotkeys and capture triggers, then files screenshots into named folders with optional cleanup, watermarking, or upload steps.",
    platform: "Windows",
    offline: "yes",
    verdict: "Set the game's region once, hit one key forever, and all your screenshots land neatly sorted. Slightly deep settings, worth it."
  },
  {
    name: "Greenshot",
    url: "https://getgreenshot.org",
    category: "screenshots",
    whatItChecks: "Checks region, window, and full-screen capture hotkeys, then saves or opens shots in a lightweight built-in editor.",
    platform: "Windows, macOS",
    offline: "yes",
    verdict: "The screenshot tool for people who want three clicks and zero accounts. Boring in the best way."
  },
  {
    name: "Flameshot",
    url: "https://github.com/flameshot-org/flameshot",
    category: "screenshots",
    whatItChecks: "Checks region-selection shortcuts and gives you immediate on-screen annotate-then-save for every capture.",
    platform: "Linux, Windows, macOS",
    offline: "yes",
    verdict: "Fast, annotate-first, and the reason your bug reports and zone maps stopped being rectangles with no context."
  },
  {
    name: "digiKam",
    url: "https://www.digikam.org",
    category: "screenshots",
    whatItChecks: "Checks folders of images and indexes them into taggable, searchable, face-and-text-aware albums — screenshots included.",
    platform: "Windows, macOS, Linux",
    offline: "yes",
    verdict: "Heavyweight? Yes. But when your screenshots folder has 30,000 files and no memory of any of them, it's the tool."
  },
  {
    name: "XnView MP",
    url: "https://www.xnview.com/en/xnviewmp/",
    category: "screenshots",
    whatItChecks: "Checks your image folders and gives you a fast catalog with batch rename, convert, and delete-duplicates for screenshot dumps.",
    platform: "Windows, macOS, Linux",
    offline: "yes",
    verdict: "Opens a folder of 5,000 PNGs instantly and lets you actually live in it. Free for personal use."
  },

  // ---------- Wiki note-takers ----------
  {
    name: "Obsidian",
    url: "https://obsidian.md",
    category: "notes",
    whatItChecks: "Checks nothing online — it just opens a folder of local markdown files and links your game wiki notes together as you write.",
    platform: "Windows, macOS, Linux, mobile",
    offline: "yes",
    verdict: "The game-clan wiki killer: backlinks, canvases, and your notes stay yours forever, even offline on a plane."
  },
  {
    name: "Logseq",
    url: "https://logseq.com",
    category: "notes",
    whatItChecks: "Checks your daily journal pages and outliner blocks, then cross-links every note you write into one local knowledge graph.",
    platform: "Windows, macOS, Linux",
    offline: "yes",
    verdict: "Great for build notes and raid prep where you write a little every day and link it all later. Markdown-backed, local-first."
  },
  {
    name: "Joplin",
    url: "https://joplinapp.org",
    category: "notes",
    whatItChecks: "Checks your notebooks and syncs them if you want (to your own storage), keeping markdown notes and attachments organized locally.",
    platform: "Windows, macOS, Linux, mobile",
    offline: "yes",
    verdict: "The open-source note app with notebooks that actually behave. Sync is optional and pointed at your own places."
  },
  {
    name: "CherryTree",
    url: "https://www.giuspen.com/cherrytree/",
    category: "notes",
    whatItChecks: "Checks its own single-file tree of rich-text notes — one hierarchical file that holds your whole game wiki.",
    platform: "Windows, Linux",
    offline: "yes",
    verdict: "One file, endless nested pages, zero internet. For when you want your FFXIV notes in a single portable document."
  },
  {
    name: "Zettlr",
    url: "https://zettlr.com",
    category: "notes",
    whatItChecks: "Checks your markdown folders and treats them like an academic-grade writing project, with citations and export built in.",
    platform: "Windows, macOS, Linux",
    offline: "yes",
    verdict: "Overkill for a shopping list, perfect for writing a proper fan wiki or long-form game guide with sources."
  }
];
