const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, 'stitch_multipage_backup');
if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

const pages = [
  'dashboard.html', 'markets.html', 'trade.html', 'watchlist.html',
  'portfolio.html', 'orders.html', 'transactions.html', 'news.html',
  'leaderboard.html', 'simulation.html', 'settings.html', 'support.html'
];

pages.forEach(p => {
  const src = path.join(__dirname, p);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(backupDir, p));
    console.log(`Backed up ${p} -> stitch_multipage_backup/${p}`);
  }
});

// Run assemble_app.cjs to restore SPA index.html
require('./assemble_app.cjs');
console.log('Restored previous interactive SPA UI to index.html successfully!');
