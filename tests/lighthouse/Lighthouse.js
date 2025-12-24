const fs = require('fs');
const chromeLauncher = require('chrome-launcher');

(async () => {
    const { default: lighthouse } = await import('lighthouse');

  // Launch Chrome in headless mode
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });

  // Lighthouse options
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
    port: chrome.port,
  };

  // Configuration for Desktop mode
  const config = {
    extends: 'lighthouse:default',
    settings: {
      formFactor: 'mobile',
      screenEmulation: { mobile: true },
    },
  };

  // Run Lighthouse audit
  const runnerResult = await lighthouse('https://agcgroup.in/', options, config);

  // Save HTML report
  const reportHtml = runnerResult.report;
  fs.writeFileSync('LighthouseReport.html', reportHtml);

  // Print summary in console
  console.log(' Report generated for:', runnerResult.lhr.finalUrl);
  console.log(' Performance score:', runnerResult.lhr.categories.performance.score * 100);
  console.log(' Accessibility score:', runnerResult.lhr.categories.accessibility.score * 100);
  console.log(' SEO score:', runnerResult.lhr.categories.seo.score * 100);
  console.log(' Best Practices score:', runnerResult.lhr.categories['best-practices'].score * 100);

  await chrome.kill();
})();
