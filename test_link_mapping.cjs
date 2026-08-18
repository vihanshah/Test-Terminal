const fs = require('fs');
const path = require('path');

const pageMapping = {
  'dashboard': 'index.html',
  'markets': 'markets.html',
  'trade': 'trade.html',
  'watchlist': 'watchlist.html',
  'portfolio': 'portfolio.html',
  'orders': 'orders.html',
  'transactions': 'transactions.html',
  'news': 'news.html',
  'leaderboard': 'leaderboard.html',
  'simulation': 'simulation.html',
  'settings': 'settings.html',
  'support': 'support.html'
};

const screens = [
  'dashboard', 'markets', 'trade', 'watchlist', 'portfolio',
  'orders', 'transactions', 'news', 'leaderboard', 'simulation',
  'settings', 'support'
];

screens.forEach(screen => {
  const filePath = path.join(__dirname, 'raw_screens', `${screen}.html`);
  let content = fs.readFileSync(filePath, 'utf8');

  // Let's inspect all <a ...> tags in this screen
  const aTags = content.match(/<a[^>]*>[\s\S]*?<\/a>/gi) || [];
  console.log(`\nScreen: ${screen} has ${aTags.length} links.`);
  aTags.forEach(tag => {
    // Check if it matches any navigation item
    for (const [key, targetFile] of Object.entries(pageMapping)) {
      const reg = new RegExp(`(>|title=["'])${key}|${key}(<|["'])`, 'i');
      if (reg.test(tag)) {
        console.log(`  Mapped "${key}" -> ${targetFile} in: ${tag.slice(0, 80).replace(/\n/g, '')}`);
      }
    }
  });
});
