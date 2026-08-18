const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('raw_screens').filter(f => f.endsWith('.html'));

files.forEach(file => {
  const content = fs.readFileSync(path.join('raw_screens', file), 'utf8');
  console.log(`\n=== FILE: ${file} ===`);
  const links = content.match(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi) || [];
  console.log(`Found ${links.length} <a> tags. Sample:`);
  links.slice(0, 8).forEach(l => console.log('  ', l.replace(/\n/g, ' ').slice(0, 100)));
});
