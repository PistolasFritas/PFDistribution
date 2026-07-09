const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const page = await (await browser.newContext({ viewport: { width: 1400, height: 900 } })).newPage();
  await page.goto('http://localhost:8901/index.html', { waitUntil: 'load' });
  const rows = page.locator('.awards .aw');
  await rows.nth(4).scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  const rowText = await rows.nth(4).locator('.what').textContent();
  console.log('Design row subtitle:', rowText);
  // Spirits gallery must now have 3 pictures, no silver
  await rows.nth(1).hover();
  await page.waitForTimeout(600);
  const spirits = await page.evaluate(() => [...document.querySelectorAll('.aw-pop img')].map(i => i.src.split('/').pop()));
  console.log('Spirits popup:', JSON.stringify(spirits));
  // Design gallery unchanged: silver + 2 SIP
  await rows.nth(4).hover();
  await page.waitForTimeout(600);
  const design = await page.evaluate(() => [...document.querySelectorAll('.aw-pop img')].map(i => i.src.split('/').pop()));
  console.log('Design popup:', JSON.stringify(design));
  await page.screenshot({ path: '/home/claude/row5_final.png' });
  await browser.close();
})();
