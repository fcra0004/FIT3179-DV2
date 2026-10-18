// =============================================================
// embed.js: draws every chart on the page.
//
// CONTENTS
//   1. THEME: shared fonts, sizes and colours for every chart
//   2. CHART LIST: which spec file goes into which box
//   3. DRAW: load each spec with vegaEmbed
//   4. BIG YEAR above the "Find your state" maps
//   5. MOVE CONTROLS: put the slider and "Jump to" menu inside their cards
//   6. ZOOM BUTTONS for the Section 1 map
// =============================================================

// ---------- 1. THEME: shared look for every chart, so fonts, sizes and colours match the page ----------
var theme = {
  font: "Source Sans 3",
  background: "transparent",
  padding: 4,
  title: {
    font: "Fraunces", fontSize: 20, fontWeight: 800, anchor: "start", color: "#2d2a26",
    subtitleFont: "Source Sans 3", subtitleFontSize: 14, subtitleColor: "#6b6359", offset: 12
  },
  axis: {
    labelFontSize: 13, titleFontSize: 13, titleFontWeight: 600,
    labelColor: "#2d2a26", titleColor: "#2d2a26",
    gridColor: "#ece5d8", domainColor: "#c9c0b1", tickColor: "#c9c0b1"
  },
  legend: { labelFontSize: 13, titleFontSize: 13, labelLimit: 280 },
  header: { labelFont: "Source Sans 3", labelFontSize: 14 },
  text: { font: "Source Sans 3" },
  view: { stroke: null }
};

var options = { actions: false, config: theme };

// ---------- 2. CHART LIST ----------
// One line per chart: the id of its box in index.html = the name of its file in specs/.
var charts = [
  "library_cluster_map",  // Section 1: zoomable map of every library (Vega)
  "abs_attendance",       // Section 2: who visits, by age (bars)
  "visits_membership",    // Section 2: visits line chart + card-holder waffle
  "per_person_trend",     // Section 3: borrowing and visits per person (lines)
  "states_bump_slope",    // Section 3: state rankings (bump) + a decade later (slope)
  "loans_by_format",      // Section 4: physical vs digital loans (stacked area)
  "digital_pictogram",    // Section 4: phones vs books pictogram
  "state_explorer",       // Section 4: "Find your state" two maps + bars, with year slider
  "programs_linked"       // Section 5: programs heatmap + "Why they come" bars
];

// ---------- 3. DRAW ----------
// For each name: find <div id="name">, load specs/name.vg.json into it, and keep the
// finished chart (its "view") so the code below can read or change its signals.
var views = {};

charts.forEach(function (id) {
  vegaEmbed("#" + id, "specs/" + id + ".vg.json", options)
    .then(function (result) {
      views[id] = result.view;
      moveControls(id);
      if (id === "state_explorer") showExplorerYear(result.view);
    })
    .catch(console.error);
});

// ---------- 4. BIG YEAR ----------
// Show the slider's year (signal "yrLabel" in state_explorer.vg.json) in large type above the maps
function showExplorerYear(view) {
  var label = document.getElementById("explorer-year");
  function update(name, value) { label.textContent = value.replace("-", "–"); }
  update("yrLabel", view.signal("yrLabel"));
  view.addSignalListener("yrLabel", update);
}

// ---------- 5. MOVE CONTROLS ----------
// Move each chart's drop-down or slider into the control bar inside its card,
// so the control sits next to its instructions instead of below the chart.
function moveControls(id) {
  var targets = { state_explorer: ".slider-slot", library_cluster_map: ".jump-slot" };
  if (!targets[id]) return;
  var bindings = document.querySelector("#" + id + " .vega-bindings");
  var slot = document.getElementById(id).closest(".card").querySelector(targets[id]);
  if (bindings && slot) slot.appendChild(bindings);
}

// ---------- 6. ZOOM BUTTONS for the Section 1 map ----------
// The + / − / Reset buttons in index.html change the map's "view" signal
// (z = zoom level, tx/ty = map centre on screen), defined in library_cluster_map.vg.json.
document.querySelectorAll(".zoom-buttons button").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var view = views.library_cluster_map;
    if (!view) return;
    var v = view.signal("view");
    var w = view.width(), h = view.height();
    if (btn.dataset.zoom === "reset") {
      view.signal("view", { z: 1, tx: w / 2, ty: h / 2 }).runAsync();
      return;
    }
    var factor = btn.dataset.zoom === "in" ? 1.8 : 1 / 1.8;
    var z = Math.min(300, Math.max(1, v.z * factor));
    var k = z / v.z;
    // zoom around the centre of the map
    view.signal("view", {
      z: z,
      tx: w / 2 - (w / 2 - v.tx) * k,
      ty: h / 2 - (h / 2 - v.ty) * k
    }).runAsync();
  });
});
