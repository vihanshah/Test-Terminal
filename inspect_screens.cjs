const fs = require('fs');
const path = require('path');

const screens = [
  'dashboard', 'markets', 'trade', 'watchlist', 'portfolio',
  'orders', 'transactions', 'news', 'leaderboard', 'simulation',
  'settings', 'support'
];

screens.forEach(s => {
  const filePath = path.join(__dirname, 'raw_screens', `${s}.html`);
  if (fs.existsSync(filePath)) {
    const html = fs.readFileSync(filePath, 'utf8');
    console.log(`=== Screen: ${s} (Length: ${html.length} chars) ===`);
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    console.log(`Title: ${titleMatch ? titleMatch[1] : 'N/A'}`);
    
    // Check main container structure
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
    if (bodyMatch) {
      const body = bodyMatch[1];
      console.log(`Body excerpt (first 200 chars): ${body.trim().slice(0, 200).replace(/\n/g, ' ')}`);
    }
  }
});
