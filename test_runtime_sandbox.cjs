const fs = require('fs');
const vm = require('vm');

const html = fs.readFileSync('index.html', 'utf8');

// Mock browser environment
const sandbox = {
  window: {},
  document: {
    addEventListener: (type, fn) => {
      console.log(`Registered document listener: ${type}`);
      if (type === 'DOMContentLoaded') {
        setTimeout(fn, 10);
      }
    },
    querySelectorAll: (sel) => {
      console.log(`document.querySelectorAll("${sel}")`);
      return [];
    },
    getElementById: (id) => {
      console.log(`document.getElementById("${id}")`);
      return {
        classList: { add: () => {}, remove: () => {}, toggle: () => {} },
        style: {},
        addEventListener: () => {}
      };
    }
  },
  console: console,
  setInterval: setInterval,
  setTimeout: setTimeout,
  location: { hash: '#news' },
  AudioContext: class {},
  webkitAudioContext: class {}
};
sandbox.window = sandbox;

const scriptRegex = /<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;

while ((match = scriptRegex.exec(html)) !== null) {
  count++;
  if (count === 1) continue; // skip tailwind config
  const scriptContent = match[1];
  console.log(`\n--- Running Script #${count} ---`);
  try {
    vm.runInNewContext(scriptContent, sandbox);
    console.log(`Script #${count} executed without throwing error.`);
  } catch (err) {
    console.error(`RUNTIME ERROR in Script #${count}:`, err.message);
    console.error(err.stack);
  }
}
