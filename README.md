# Zecheng Zhou / 周泽橙 - Curriculum Vitae

Personal bilingual CV: https://wszzcdsg.github.io/

`index.html` contains both languages. The language selector also switches the
download link to the matching PDF in `pdf/`. Publication titles, journal names,
and author lists retain their original English in both versions.

## Updating the CV and PDFs

1. Edit `index.html`, including its `data-en` and `data-zh` translations.
2. Install the export dependencies once:

   ```sh
   npm install
   npx playwright install chromium
   ```

3. Regenerate both A4 PDFs from the same page:

   ```sh
   npm run export:pdf
   ```

4. Review both PDFs, then commit `index.html` and the regenerated files in `pdf/`
   together. GitHub Pages serves the website and these static downloads.

The exporter can optionally use an installed browser with the
`CV_BROWSER_CHANNEL` environment variable (for example, `chrome` or `msedge`).
