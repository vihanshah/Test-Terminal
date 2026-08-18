const fs = require('fs');
const path = require('path');

const screens = [
  'dashboard', 'markets', 'trade', 'watchlist', 'portfolio',
  'orders', 'transactions', 'news', 'leaderboard', 'simulation',
  'settings', 'support'
];

function extractViewContent(screenName) {
  const filePath = path.join(__dirname, 'raw_screens', `${screenName}.html`);
  const html = fs.readFileSync(filePath, 'utf8');

  if (screenName === 'dashboard') {
    // Extract everything between <!-- Main Grid Area (2 Columns) --> and <!-- Status Bar -->
    const gridMatch = html.match(/<!-- Main Grid Area \(2 Columns\) -->([\s\S]*?)<!-- Status Bar -->/i);
    if (gridMatch) {
      return `<div class="p-2 flex gap-2 h-full flex-col lg:flex-row bg-background overflow-auto">${gridMatch[1]}</div>`;
    }
  }

  // Look for <main> tag
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (mainMatch) {
    let content = mainMatch[1];
    return `<div class="h-full flex flex-col overflow-auto p-2 bg-background">${content}</div>`;
  }

  // Look for canvas or grid
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return bodyMatch ? bodyMatch[1] : html;
}

const views = {};
screens.forEach(s => {
  views[s] = extractViewContent(s);
  console.log(`Extracted view for ${s}: length ${views[s].length}`);
});

fs.writeFileSync(path.join(__dirname, 'extracted_views.json'), JSON.stringify(views, null, 2));
console.log('Successfully extracted all views to extracted_views.json');
