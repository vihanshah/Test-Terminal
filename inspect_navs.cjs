const fs = require('fs');

['markets.html', 'trade.html', 'news.html', 'settings.html'].forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n================= ${f} =================`);
  const nav = content.match(/<(nav|aside)[\s\S]*?<\/(nav|aside)>/i);
  if (nav) {
    console.log(nav[0].slice(0, 500));
  } else {
    console.log('No nav or aside tag found!');
  }
});
