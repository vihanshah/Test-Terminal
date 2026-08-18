const fs = require('fs');
const views = JSON.parse(fs.readFileSync('extracted_views.json', 'utf8'));

for (const [name, content] of Object.entries(views)) {
  console.log(`\n=== VIEW: ${name} ===`);
  console.log(content.slice(0, 400).replace(/\n/g, ' '));
}
