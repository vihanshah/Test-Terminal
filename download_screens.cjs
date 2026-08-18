const fs = require('fs');
const path = require('path');
const https = require('https');

const screens = [
  {
    id: "dashboard",
    title: "Black Swan - Multi-Asset Dashboard Overview",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1OTI1MjlhMzE0NDYwMWE2MzEzODQyMDhiODJmEgsSBxDvrZ-djwcYAZIBIwoKcHJvamVjdF9pZBIVQhMyMDgwODQ3MjUzODA0MjE0ODY2&filename=&opi=89354086"
  },
  {
    id: "markets",
    title: "Black Swan Markets - Detailed Sync",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1OTI1NzdhNjRiMzcwMzM4NDlhOWMyMjVlNjdmEgsSBxDvrZ-djwcYAZIBIwoKcHJvamVjdF9pZBIVQhMyMDgwODQ3MjUzODA0MjE0ODY2&filename=&opi=89354086"
  },
  {
    id: "trade",
    title: "Black Swan Trade Terminal - Professional Sync",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1OTI1ODBhZWNhZmEwN2M0YzU4NzU0MGY1ZTM5EgsSBxDvrZ-djwcYAZIBIwoKcHJvamVjdF9pZBIVQhMyMDgwODQ3MjUzODA0MjE0ODY2&filename=&opi=89354086"
  },
  {
    id: "watchlist",
    title: "Black Swan Watchlist - Professional Sync",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1OTI1ODZjNDM5ZDgwMzMyY2Y0MjFlMGQ5N2FiEgsSBxDvrZ-djwcYAZIBIwoKcHJvamVjdF9pZBIVQhMyMDgwODQ3MjUzODA0MjE0ODY2&filename=&opi=89354086"
  },
  {
    id: "portfolio",
    title: "Black Swan Portfolio - Detailed Analytics",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1OTI1OGNlNWU1NjkwODlhZjcyMTI0MjUzNWY1EgsSBxDvrZ-djwcYAZIBIwoKcHJvamVjdF9pZBIVQhMyMDgwODQ3MjUzODA0MjE0ODY2&filename=&opi=89354086"
  },
  {
    id: "orders",
    title: "Black Swan - Detailed Orders & Transactions",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1OTI1OWI4NGYyNTYwNzc5ODUxNGJiMDI2MTI1EgsSBxDvrZ-djwcYAZIBIwoKcHJvamVjdF9pZBIVQhMyMDgwODQ3MjUzODA0MjE0ODY2&filename=&opi=89354086"
  },
  {
    id: "transactions",
    title: "Black Swan Transactions - Detailed History",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1OTI1YTI2YzE5NzkwNDMxMTdlYzI3MDFkNDc4EgsSBxDvrZ-djwcYAZIBIwoKcHJvamVjdF9pZBIVQhMyMDgwODQ3MjUzODA0MjE0ODY2&filename=&opi=89354086"
  },
  {
    id: "news",
    title: "Black Swan - News & Institutional Wire",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1OTI1YWFlYjQ2Y2YwMWI0ZTM2M2UyMjk2NjUwEgsSBxDvrZ-djwcYAZIBIwoKcHJvamVjdF9pZBIVQhMyMDgwODQ3MjUzODA0MjE0ODY2&filename=&opi=89354086"
  },
  {
    id: "leaderboard",
    title: "Black Swan - Institutional Leaderboard",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1OTI1YjExODZlNWQwOTI1YzdkYWU5MmQyZGVlEgsSBxDvrZ-djwcYAZIBIwoKcHJvamVjdF9pZBIVQhMyMDgwODQ3MjUzODA0MjE0ODY2&filename=&opi=89354086"
  },
  {
    id: "simulation",
    title: "Black Swan - Event & Simulation Rules",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1OTI1YmIxYjczMWIwMWI0ZGYwNmFlMWM0NGNiEgsSBxDvrZ-djwcYAZIBIwoKcHJvamVjdF9pZBIVQhMyMDgwODQ3MjUzODA0MjE0ODY2&filename=&opi=89354086"
  },
  {
    id: "settings",
    title: "Black Swan - Terminal Settings",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1OTI1YzIyNjU1MTgwOTI1ZDNhODU5MzE0MjQxEgsSBxDvrZ-djwcYAZIBIwoKcHJvamVjdF9pZBIVQhMyMDgwODQ3MjUzODA0MjE0ODY2&filename=&opi=89354086"
  },
  {
    id: "support",
    title: "Black Swan - Support & System Status",
    url: "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAwMDY1OTI1YzIzMWRmMTMwMmE5OTc2NjRjMzNkY2YyEgsSBxDvrZ-djwcYAZIBIwoKcHJvamVjdF9pZBIVQhMyMDgwODQ3MjUzODA0MjE0ODY2&filename=&opi=89354086"
  }
];

const outDir = path.join(__dirname, 'raw_screens');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Status ${res.statusCode} for ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  for (const s of screens) {
    const dest = path.join(outDir, `${s.id}.html`);
    console.log(`Downloading ${s.title} -> ${s.id}.html`);
    await download(s.url, dest);
  }
  console.log("All screens downloaded successfully.");
}

run().catch(console.error);
