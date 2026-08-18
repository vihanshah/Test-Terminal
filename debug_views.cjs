const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const viewMatches = html.match(/<(section|div)[^>]*id="view-[^"]*"[^>]*>/g) || [];
console.log(`Found ${viewMatches.length} views:`);
viewMatches.forEach(v => console.log('  ', v));

// Also check all <a> tags with onclick="navigateTo..."
const navMatches = html.match(/onclick="navigateTo\([^)]*\)"/g) || [];
console.log(`\nFound ${navMatches.length} navigateTo triggers:`);
navMatches.forEach(n => console.log('  ', n));
