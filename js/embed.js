// Shared look for every chart, so fonts and colours match the page.
var theme = {
  font: "Source Sans 3",
  background: "transparent",
  title: { font: "Fraunces", fontSize: 17, fontWeight: 700, anchor: "start", color: "#3b3a36", subtitleFont: "Source Sans 3", subtitleFontSize: 13, subtitleFontWeight: 400, subtitleColor: "#6f695f", offset: 12 },
  axis: { labelFontSize: 12, titleFontSize: 12, titleFontWeight: 600, labelColor: "#3b3a36", titleColor: "#3b3a36", gridColor: "#eee8de", domainColor: "#c9c2b6", tickColor: "#c9c2b6" },
  legend: { labelFontSize: 12, titleFontSize: 12, labelLimit: 280 },
  view: { stroke: null }
};

var options = { actions: false, config: theme };

// One line per chart: the div id on the page, and the spec file in specs/.
var charts = [
  "per_person_trend",
  "state_rank_bump",
  "state_loans_slope",
  "visits_area",
  "membership_waffle",
  "loans_by_format",
  "digital_share_dumbbell",
  "digital_share_tilemap",
  "state_choropleth_linked",
  "library_dot_map",
  "visits_symbol_map",
  "programs_heatmap",
  "programs_by_outcome",
  "spending_per_person"
];

charts.forEach(function (id) {
  vegaEmbed("#" + id, "specs/" + id + ".vg.json", options).catch(console.error);
});
