// =============================================================
// embed.js: draws every chart on the page.
//
// CONTENTS
//   1. THEME: shared fonts, sizes and colours for every chart
//   2. CHART LIST: which spec file goes into which box
//   3. DRAW: load each spec with vegaEmbed
//   4. BIG YEAR above the "Find your state" maps
//   5. MOVE CONTROLS: put the checkboxes, slider and "Jump to" menu inside their cards
//   6. ZOOM BUTTONS for the Section 6 map
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
    labelFontSize: 13, titleFontSize: 13, titleFontWeight: 400,
    labelColor: "#2d2a26", titleColor: "#6b6359",
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
  "s1_waterfall_subscription_costs",              // Section 1: what your subscriptions cost (waterfall, with checkboxes)
  "s2_bar_library_visits_by_age",                 // Section 2: who visits, by age (bars)
  "s2_line_waffle_visits_and_card_holders",       // Section 2: visits line chart + card-holder waffle
  "s3_line_borrowing_visits_per_person",          // Section 3: borrowing and visits per person (lines)
  "s3_bump_slope_state_borrowing_ranks",          // Section 3: state rankings (bump) + a decade later (slope)
  "s4_stacked_area_physical_vs_digital_loans",    // Section 4: physical vs digital loans (stacked area)
  "s4_marimekko_state_loans_by_format",           // Section 4: 2024-25 loans by state and format (Marimekko)
  "s4_choropleth_symbolmap_bars_state_explorer",  // Section 4: "Find your state" two maps + bars, with year slider
  "s5_heatmap_bars_programs_by_age",              // Section 5: programs heatmap + "Why they come" bars
  "s6_dotmap_clustered_library_locations"         // Section 6: zoomable map of every library (Vega)
];

// ---------- 3. DRAW ----------
// For each name: find <div id="name">, load specs/name.vg.json into it, and keep the
// finished chart (its "view") so the code below can read or change its signals.
var views = {};

charts.forEach(function (id) {
  var spec = "specs/" + id + ".vg.json";
  // The "Find your state" charts are resized to share the card's full width evenly
  if (id === "s4_choropleth_symbolmap_bars_state_explorer") spec = fitExplorer(id, spec);
  Promise.resolve(spec)
    .then(function (s) { return vegaEmbed("#" + id, s, options); })
    .then(function (result) {
      views[id] = result.view;
      moveControls(id);
      if (id === "s4_choropleth_symbolmap_bars_state_explorer") showExplorerYear(result.view);
    })
    .catch(console.error);
});

// Load the explorer spec, then set its three charts to equal widths that fill the card.
// 36px = the gap between charts (the spec's "spacing"); 45px = room for the bar chart's y axis.
function fitExplorer(id, url) {
  return fetch(url).then(function (r) { return r.json(); }).then(function (spec) {
    var box = document.getElementById(id).clientWidth;
    var each = Math.floor((box - 2 * spec.spacing - 45) / 3);
    spec.hconcat.forEach(function (chart) { chart.width = each; });
    return spec;
  });
}

// ---------- 4. BIG YEAR ----------
// Show the slider's year (signal "yrLabel" in s4_choropleth_symbolmap_bars_state_explorer.vg.json) in large type above the maps
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
  var targets = {
    s1_waterfall_subscription_costs: ".sub-slot",                // the four app checkboxes
    s4_choropleth_symbolmap_bars_state_explorer: ".slider-slot", // the year slider
    s6_dotmap_clustered_library_locations: ".jump-slot"          // the "Jump to" city menu
  };
  if (!targets[id]) return;
  var bindings = document.querySelector("#" + id + " .vega-bindings");
  var slot = document.getElementById(id).closest(".card").querySelector(targets[id]);
  if (bindings && slot) slot.appendChild(bindings);
}

// ---------- 6. ZOOM BUTTONS for the Section 6 map ----------
// The + / − / Reset buttons in index.html change the map's "view" signal
// (z = zoom level, tx/ty = map centre on screen), defined in s6_dotmap_clustered_library_locations.vg.json.
document.querySelectorAll(".zoom-buttons button").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var view = views.s6_dotmap_clustered_library_locations;
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
