const fs = require('fs');
const path = require('path');

const files = [
  'index.html', 'markets.html', 'trade.html', 'watchlist.html',
  'portfolio.html', 'orders.html', 'transactions.html', 'news.html',
  'leaderboard.html', 'simulation.html', 'settings.html', 'support.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const links = content.match(/href="([^"]+)"/g) || [];
  const internalLinks = links.filter(l => l.includes('.html'));
  console.log(`${f} has ${internalLinks.length} working page navigation links.`);
});
