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
  
  // Find all top-level elements inside <body>
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    const bodyContent = bodyMatch[1];
    // List major tag names and classes
    const tagMatches = bodyContent.match(/<(nav|header|main|aside|div|section)[^>]*class="([^"]*)"[^>]*>/gi) || [];
    console.log(`Found ${tagMatches.length} major elements. First 6:`);
    tagMatches.slice(0, 6).forEach(t => console.log('  ', t.slice(0, 100)));
  }
});
