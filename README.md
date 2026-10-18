# The subscription you forgot you had

A data visualisation about Australian public libraries for 18 to 34 year olds, built with Vega-Lite and Vega and published with GitHub Pages. FIT3179 Data Visualisation 2, Finn Cracknell, Monash University, 2026.

- `index.html`: page structure and story text
- `style.css`: layout, typography and colours
- `js/embed.js`: loads each chart into its box on the page with vega-embed
- `specs/`: one human-readable Vega-Lite (or Vega) spec per chart (`*.vg.json`)
- `data/`: CSV and TopoJSON files used by the specs
- `img/`: header animation

Data: ALIA/NSLA Australian Public Libraries Statistical Reports (2014–15, 2015–16, 2021–22 to 2024–25); ABS Cultural and creative activities 2021–22; state public library location lists; state boundaries from rowanhogan/australian-states.

## Where to find each part of the page

| On the page | Text and layout (`index.html`) | Chart code (`specs/`) |
|---|---|---|
| Header | `HEADER` comment | none (background image is in `style.css` section 3) |
| 1 – There's one near you | `SECTION 1` | `library_cluster_map.vg.json` (Vega) |
| 2 – Least likely to walk in | `SECTION 2` | `abs_attendance.vg.json`, `visits_membership.vg.json` |
| 3 – It's not just you | `SECTION 3` | `per_person_trend.vg.json`, `states_bump_slope.vg.json` |
| 4 – The library is in your pocket | `SECTION 4` | `loans_by_format.vg.json`, `digital_pictogram.vg.json` |
| Find your state (two maps + slider) | `"FIND YOUR STATE" EXPLORER` | `state_explorer.vg.json` |
| 5 – A free place to study, work and meet | `SECTION 5` | `programs_linked.vg.json` |
| Closing line and footer | `CLOSING LINE`, `FOOTER` | none |

Inside each spec, every chart, layer, signal and mark starts with a `"description"` that says which part of the chart it draws (for example `"LAYER 1 - THE BARS"`). JSON doesn't allow comments, so these descriptions do that job; they don't change how the charts look.
