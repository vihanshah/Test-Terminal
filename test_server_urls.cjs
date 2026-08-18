const http = require('http');

const urls = [
  'http://localhost:3001/index.html',
  'http://localhost:3001/markets.html',
  'http://localhost:3001/trade.html',
  'http://localhost:3001/watchlist.html',
  'http://localhost:3001/portfolio.html',
  'http://localhost:3001/orders.html',
  'http://localhost:3001/transactions.html',
  'http://localhost:3001/news.html',
  'http://localhost:3001/leaderboard.html',
  'http://localhost:3001/simulation.html',
  'http://localhost:3001/settings.html',
  'http://localhost:3001/support.html'
];

urls.forEach(u => {
  http.get(u, (res) => {
    console.log(`[${res.statusCode}] ${u} (Length: ${res.headers['content-length']} bytes)`);
  }).on('error', (err) => {
    console.error(`Error on ${u}:`, err.message);
  });
});
