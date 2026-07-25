const puppeteer = require('puppeteer');

const routes = [
  '/',
  '/about',
  '/services',
  '/packages',
  '/projects',
  '/blog',
  '/contact'
];

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  let hasErrors = false;

  for (const route of routes) {
    console.log(`Checking http://localhost:5173${route}...`);
    const page = await browser.newPage();
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error(`[ERROR] [${route}] ${msg.text()} | URL: ${msg.location().url}`);
        hasErrors = true;
      }
    });

    page.on('pageerror', err => {
      console.error(`[PAGE_ERROR] [${route}] ${err.toString()}`);
      hasErrors = true;
    });

    try {
      await page.goto(`http://localhost:5173${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
      // Extra 1 sec just to let any late JS execute
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (e) {
      console.error(`[NAVIGATION_ERROR] [${route}] ${e.message}`);
      hasErrors = true;
    }
    
    await page.close();
  }

  await browser.close();
  if (!hasErrors) {
    console.log("No console errors found on any route!");
  } else {
    console.log("Finished with errors.");
  }
}

run();
