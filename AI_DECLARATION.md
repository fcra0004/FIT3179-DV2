# Use of AI Acknowledgement

**The Subscription You Forgot You Had**: FIT3179 Data Visualisation 2, Finn Cracknell, Monash University, October 2026

## Part B: Concise summary of AI use in the assessment

### Summary

- **Tool:** Claude (Anthropic), <https://claude.ai>, my main AI tool, used in one long conversation over about three weeks.
- **What it was used for:** developing the story, writing and revising the code, preparing the datasets, and drafting and editing text.
- **Iterations:** about 25 versions of the page, each made after I reviewed the previous one and gave feedback.
- **My role:**
  - I chose the topic focus, audience and message, and made the final design decisions.
  - I edited the final page text and chart files myself.
  - I drew the sketch by hand.

### (i) Ideas, structure and understanding concepts

- Claude suggested possible audiences and story angles. I adapted these ideas into my own which became the final narrative, framed as "the subscription you forgot you had" and about encouraging Australian's to use the free resources that public libraries offer.
- It proposed section structures and chart types for that story.
- The structure was revised about 6 times as I gave feedback and applied studio feedback. Changes included:
  - merging two sections;
  - opening with a cost comparison and ending with the library map;
  - replacing two borderline charts with advanced idioms.
- I used Claude to explain how my HTML, CSS, JavaScript and Vega-Lite code works.
- I used it to make a study guide and practice questions for the Week 12 interview.

### (ii) Generating, rewriting or rephrasing text

- Claude drafted the first versions of the page text: headings, intro paragraphs, statistic call-outs, chart titles, annotations, hints and the closing call to action.
- I asked for the narrative to be reframed and the text cut down over about 10 iterations.
- I rewrote parts myself:
  - the page subtitle;
  - the Section 1 and Section 2 text and headings;
  - the closing line;
  - several chart titles and axis labels.
- Claude suggested alternative wordings for some headings and the call to action, which I chose between and adapted.

### (iii) Other aspects of the assessment

- **Code:**
  - Claude wrote the Vega-Lite and Vega chart specifications, the HTML structure, the CSS styling, and the JavaScript that loads the charts (`js/embed.js`), over about 25 versions.
  - In each round I tested the page and requested specific changes: alignment, colours, labels, axis limits and interaction behaviour.
  - I edited all final chart files myself, such as titles, axis labels, and annotation text.
  - At my request, Claude added comments to the code and made commented copies of each chart file (`specs/commented/`) so I could understand and explain them.
- **Data preparation:**
  - Claude extracted tables from the ALIA/NSLA *Australian Public Libraries Statistical Report* PDFs into CSV files.
  - It compiled the library locations from state library directories and lists I supplied, placing libraries at suburb centres using a postcode dataset.
  - It read the ABS age-group attendance figures from the ABS release page.
  - It looked up current Australian app prices and ABS state population figures.
  - I checked the main figures against the source reports and confirmed that the figures and data Claude was using was real and not fabricated.
- **Graphics:** Claude wrote a Python script that generated the animated bookshelf header image (`img/header.gif`).
- **Testing:** Claude tested the page in a headless browser at different screen widths after each change, checking layout, chart sizes and interactions.

### How I altered, adopted or built on the AI output

- I set the direction for each version and decided what to keep, reject or change.
- I asked for the per-person line chart to be restored after it was replaced.
- I removed a connected scatterplot I did not want.
- I changed the heatmap selection to work by age group.
- I asked for the symbol map to use outlines instead of transparency, so it would not mislead.
- I had the state bar chart normalised to items per person, so small states could be compared.
- I applied the feedback from the studio critique.
- I edited the page text and all chart files directly.
- I made the final decisions on wording, colours and layout.
