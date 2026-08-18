const fs = require('fs');

// Test running js/audio.js, js/charts.js, js/app.js in simulated DOM environment
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable",
  url: "http://localhost:3001/"
});

const { window } = dom;

window.addEventListener('error', (e) => {
  console.error('JS ERROR CAUGHT:', e.error || e.message);
});

// Wait for load
setTimeout(() => {
  console.log('--- Checking initial state ---');
  console.log('Active View:', window.APP_STATE ? window.APP_STATE.activeView : 'APP_STATE NOT DEFINED');
  
  const dashboardView = window.document.getElementById('view-dashboard');
  const marketsView = window.document.getElementById('view-markets');
  console.log('view-dashboard classes:', dashboardView ? dashboardView.className : 'NONE');
  console.log('view-markets classes:', marketsView ? marketsView.className : 'NONE');

  console.log('\n--- Testing navigateTo("markets") ---');
  try {
    window.navigateTo('markets');
    console.log('view-dashboard classes after nav:', dashboardView ? dashboardView.className : 'NONE');
    console.log('view-markets classes after nav:', marketsView ? marketsView.className : 'NONE');
  } catch (err) {
    console.error('navigateTo ERROR:', err);
  }

  console.log('\n--- Testing navigateTo("trade") ---');
  try {
    window.navigateTo('trade');
    const tradeView = window.document.getElementById('view-trade');
    console.log('view-trade classes after nav:', tradeView ? tradeView.className : 'NONE');
  } catch (err) {
    console.error('navigateTo trade ERROR:', err);
  }

  console.log('\n--- Testing navigateTo("simulation") ---');
  try {
    window.navigateTo('simulation');
    const simView = window.document.getElementById('view-simulation');
    console.log('view-simulation classes after nav:', simView ? simView.className : 'NONE');
  } catch (err) {
    console.error('navigateTo simulation ERROR:', err);
  }
}, 300);
