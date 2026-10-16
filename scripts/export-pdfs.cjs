// Run `npm install`, `npx playwright install chromium`, then `npm run export:pdf`.
const { chromium } = require('playwright');
const { mkdir } = require('node:fs/promises');
const { resolve, join } = require('node:path');
const { pathToFileURL } = require('node:url');

async function exportPdfs() {
  const root = resolve(__dirname, '..');
  const output = join(root, 'pdf');
  await mkdir(output, { recursive: true });
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CV_BROWSER_CHANNEL ? { channel: process.env.CV_BROWSER_CHANNEL } : {}),
  });
  try {
    const page = await browser.newPage({ colorScheme: 'light' });
    await page.goto(pathToFileURL(join(root, 'index.html')).href);
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(Array.from(document.images, image => image.decode()));
    });
    for (const language of ['en', 'zh']) {
      await page.evaluate(language => switchLanguage(language), language);
      await page.pdf({
        path: join(output, `Zecheng_Zhou_CV_${language.toUpperCase()}.pdf`),
        format: 'A4',
        preferCSSPageSize: true,
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<span></span>',
        footerTemplate: '<div style="width:100%;text-align:center;font-size:8px;color:#777"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
        tagged: true,
      });
      console.log(`Exported ${language.toUpperCase()} PDF`);
    }
  } finally {
    await browser.close();
  }
}

exportPdfs().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
