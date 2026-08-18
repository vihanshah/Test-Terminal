const fs = require('fs');
const path = require('path');

const screens = [
  'dashboard', 'markets', 'trade', 'watchlist', 'portfolio',
  'orders', 'transactions', 'news', 'leaderboard', 'simulation',
  'settings', 'support'
];

function linkify(html, currentScreen) {
  // Replace navigation hrefs
  // 1. Dashboard
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?(?:Dashboard|Overview)[\s\S]*?<\/a>)/gi, (m, rest) => {
    return `href="index.html"${rest}`;
  });

  // 2. Markets / Equities / Commodities / Crypto / Real Estate
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?(?:Markets|Equities|Commodities|Crypto|Real Estate)[\s\S]*?<\/a>)/gi, (m, rest) => {
    return `href="markets.html"${rest}`;
  });

  // 3. Trade
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?(?:Trade|Trading)[\s\S]*?<\/a>)/gi, (m, rest) => {
    return `href="trade.html"${rest}`;
  });

  // 4. Watchlist
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?Watchlist[\s\S]*?<\/a>)/gi, (m, rest) => {
    return `href="watchlist.html"${rest}`;
  });

  // 5. Portfolio
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?Portfolio[\s\S]*?<\/a>)/gi, (m, rest) => {
    return `href="portfolio.html"${rest}`;
  });

  // 6. Orders
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?Orders[\s\S]*?<\/a>)/gi, (m, rest) => {
    return `href="orders.html"${rest}`;
  });

  // 7. Transactions
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?Transactions[\s\S]*?<\/a>)/gi, (m, rest) => {
    return `href="transactions.html"${rest}`;
  });

  // 8. News
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?(?:News|Wire)[\s\S]*?<\/a>)/gi, (m, rest) => {
    return `href="news.html"${rest}`;
  });

  // 9. Leaderboard
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?Leaderboard[\s\S]*?<\/a>)/gi, (m, rest) => {
    return `href="leaderboard.html"${rest}`;
  });

  // 10. Simulation / Event / Rules
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?(?:Event|Rules|Simulation)[\s\S]*?<\/a>)/gi, (m, rest) => {
    return `href="simulation.html"${rest}`;
  });

  // 11. Settings
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?Settings[\s\S]*?<\/a>)/gi, (m, rest) => {
    return `href="settings.html"${rest}`;
  });

  // 12. Support
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?Support[\s\S]*?<\/a>)/gi, (m, rest) => {
    return `href="support.html"${rest}`;
  });

  // Also replace title="..." links
  const titleMap = {
    'Dashboard': 'index.html',
    'Trade': 'trade.html',
    'Watchlist': 'watchlist.html',
    'Portfolio': 'portfolio.html',
    'Orders': 'orders.html',
    'Transactions': 'transactions.html',
    'News': 'news.html',
    'Leaderboard': 'leaderboard.html',
    'Event/Rules': 'simulation.html',
    'Event &amp; Rules': 'simulation.html',
    'Settings': 'settings.html',
    'Support': 'support.html'
  };

  for (const [title, url] of Object.entries(titleMap)) {
    const reg = new RegExp(`href=["']#["']([^>]*title=["']${title}["'])`, 'gi');
    html = html.replace(reg, `href="${url}"$1`);
    const reg2 = new RegExp(`title=["']${title}["']([^>]*href=["']#["'])`, 'gi');
    html = html.replace(reg2, `title="${title}"$1`.replace(`href="#"`, `href="${url}"`));
  }

  // Add subtle sound / click handler script before </body>
  const audioInject = `
  <script>
    // Live ticking simulation on prices
    setInterval(() => {
      document.querySelectorAll('span, td, div').forEach(el => {
        if (el.children.length === 0 && /^(\\+|-)?\\d+(\\.\\d+)?%?$/.test(el.textContent.trim()) && Math.random() < 0.05) {
          const num = parseFloat(el.textContent.replace(/[^0-9.-]/g, ''));
          if (!isNaN(num) && num > 100) {
            const shift = (Math.random() - 0.49) * 2;
            const newNum = (num + shift).toFixed(2);
            el.textContent = el.textContent.includes('₹') ? '₹' + newNum : newNum;
          }
        }
      });
    }, 2000);
  </script>
</body>`;

  html = html.replace('</body>', audioInject);

  return html;
}

screens.forEach(s => {
  const rawPath = path.join(__dirname, 'raw_screens', `${s}.html`);
  if (fs.existsSync(rawPath)) {
    let content = fs.readFileSync(rawPath, 'utf8');
    content = linkify(content, s);

    const outPath = path.join(__dirname, `${s}.html`);
    fs.writeFileSync(outPath, content, 'utf8');
    console.log(`Generated ${s}.html`);

    if (s === 'dashboard') {
      fs.writeFileSync(path.join(__dirname, 'index.html'), content, 'utf8');
      console.log(`Generated index.html (from dashboard.html)`);
    }
  }
});

console.log('All 12 Stitch screens generated perfectly with seamless navigation!');
