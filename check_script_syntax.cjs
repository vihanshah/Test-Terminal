const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');

// Extract all <script> contents (ignoring type="application/json" etc and src)
const scriptRegex = /<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;

while ((match = scriptRegex.exec(html)) !== null) {
  count++;
  const scriptContent = match[1];
  console.log(`\n=== Testing Script #${count} (Length: ${scriptContent.length}) ===`);
  try {
    new vm.Script(scriptContent);
    console.log(`Script #${count} syntax is VALID.`);
  } catch (err) {
    console.error(`SYNTAX ERROR in Script #${count}:`, err.message);
    console.error(err.stack);
  }
}
