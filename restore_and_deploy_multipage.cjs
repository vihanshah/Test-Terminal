const fs = require('fs');
const path = require('path');

const backupDir = path.join(__dirname, 'stitch_multipage_backup');
const pages = [
  'dashboard.html', 'markets.html', 'trade.html', 'watchlist.html',
  'portfolio.html', 'orders.html', 'transactions.html', 'news.html',
  'leaderboard.html', 'simulation.html', 'settings.html', 'support.html'
];

// Copy all backup pages to root
pages.forEach(p => {
  const src = path.join(backupDir, p);
  const dest = path.join(__dirname, p);
  fs.copyFileSync(src, dest);
  console.log(`Copied ${p} to root.`);
});

// Also copy dashboard.html to index.html
fs.copyFileSync(path.join(backupDir, 'dashboard.html'), path.join(__dirname, 'index.html'));
console.log('Copied dashboard.html -> index.html (Default landing page)');

// Update vercel.json for clean multi-page hosting
const vercelConfig = {
  version: 2,
  cleanUrls: true,
  trailingSlash: false,
  headers: [
    {
      source: "/(.*)",
      headers: [
        { key: "Cache-Control", value: "public, max-age=0, must-revalidate" }
      ]
    }
  ]
};

fs.writeFileSync(path.join(__dirname, 'vercel.json'), JSON.stringify(vercelConfig, null, 2), 'utf8');
console.log('Updated vercel.json for multi-page static deployment.');
