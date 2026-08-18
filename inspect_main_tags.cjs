const fs = require('fs');
const path = require('path');

const screens = [
  'dashboard', 'markets', 'trade', 'watchlist', 'portfolio',
  'orders', 'transactions', 'news', 'leaderboard', 'simulation',
  'settings', 'support'
];

screens.forEach(s => {
  const filePath = path.join(__dirname, 'raw_screens', `${s}.html`);
  const html = fs.readFileSync(filePath, 'utf8');
  console.log(`\n================== ${s.toUpperCase()} ==================`);
  
  // Look for main, or content containers
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    console.log(`[MAIN TAG FOUND] Length: ${mainMatch[1].length}`);
    console.log(`First 300 chars of <main>:\n`, mainMatch[1].slice(0, 300));
  } else {
    // Check for other key containers
    console.log(`[NO MAIN TAG] Let's find content containers...`);
    const divMatches = html.match(/<!-- (Main Grid|Main Content|Content|Global|Dashboard|Left Column)[\s\S]*?-->/gi);
    console.log(`Comment markers:`, divMatches);
  }
});
