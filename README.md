# The subscription you forgot you had

A data visualisation about Australian public libraries for 18 to 34 year olds, built with Vega-Lite and Vega and published with GitHub Pages. FIT3179 Data Visualisation 2, Finn Cracknell, Monash University, 2026.

- `index.html`: page structure and story text
- `style.css`: layout, typography and colours
- `js/embed.js`: loads each chart into its box on the page with vega-embed
- `specs/`: one human-readable Vega-Lite (or Vega) spec per chart (`*.vg.json`)
- `data/`: CSV and TopoJSON files used by the specs
- `img/`: header animation

Data: app prices from Amazon, Audible, Apple and MUBI (via the sources in the footer); ALIA/NSLA Australian Public Libraries Statistical Reports (2014–15, 2015–16, 2021–22 to 2024–25); ABS Cultural and creative activities 2021–22; state public library location lists; state boundaries from rowanhogan/australian-states.

## Where to find each part of the page

| On the page | Text and layout (`index.html`) | Chart code (`specs/`) |
|---|---|---|
| Header | `HEADER` comment | none (background image is in `style.css` section 3) |
| 1 – What are you paying for? | `SECTION 1` | `s1_waterfall_subscription_costs.vg.json` |
| 2 – Why Don't We Use It? | `SECTION 2` | `s2_bar_library_visits_by_age.vg.json`, `s2_line_waffle_visits_and_card_holders.vg.json` |
| 3 – It's not just you | `SECTION 3` | `s3_line_borrowing_visits_per_person.vg.json`, `s3_bump_slope_state_borrowing_ranks.vg.json` |
| 4 – The library is in your pocket | `SECTION 4` | `s4_stacked_area_physical_vs_digital_loans.vg.json`, `s4_marimekko_state_loans_by_format.vg.json` |
| Find your state (two maps + slider) | `"FIND YOUR STATE" EXPLORER` | `s4_choropleth_symbolmap_bars_state_explorer.vg.json` |
| 5 – A free place to study, work and meet | `SECTION 5` | `s5_heatmap_bars_programs_by_age.vg.json` |
| 6 – Find yours | `SECTION 6` | `s6_dotmap_clustered_library_locations.vg.json` (Vega) |
| Closing line and footer | `CLOSING LINE`, `FOOTER` | none |

Inside each spec, every chart, layer, signal and mark starts with a `"description"` that says which part of the chart it draws (for example `"LAYER 1 - THE BARS"`). JSON doesn't allow comments, so these descriptions do that job; they don't change how the charts look.

### Commented copies of the chart files

`specs/commented/` holds a copy of every spec with a plain-English comment on every line (`*.vg.jsonc`). These are for reading only: JSON files can't contain comments, so the page loads the clean files in `specs/`. If you change a spec in `specs/`, its commented copy won't update by itself.
