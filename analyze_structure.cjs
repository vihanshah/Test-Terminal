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
  console.log(`\n================== SCREEN: ${s} ==================`);
  
  // Find key sections in body
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (bodyMatch) {
    const body = bodyMatch[1];
    // Find comments or main tags
    const comments = body.match(/<!--.*?-->/g) || [];
    console.log(`Comments in body:`, comments.slice(0, 10));
    
    // Find main or div structures
    const mainMatch = body.match(/<main[\s\S]*?<\/main>/i);
    if (mainMatch) {
      console.log(`Has <main> tag (length: ${mainMatch[0].length})`);
    } else {
      console.log(`No <main> tag. Top level elements count in body.`);
    }
  }
});
