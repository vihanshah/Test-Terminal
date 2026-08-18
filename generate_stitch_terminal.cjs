const fs = require('fs');
const path = require('path');

const screens = [
  { id: 'dashboard', file: 'index.html', title: 'Dashboard', icon: 'dashboard' },
  { id: 'markets', file: 'markets.html', title: 'Markets', icon: 'show_chart' },
  { id: 'trade', file: 'trade.html', title: 'Trade', icon: 'swap_horiz' },
  { id: 'watchlist', file: 'watchlist.html', title: 'Watchlist', icon: 'visibility' },
  { id: 'portfolio', file: 'portfolio.html', title: 'Portfolio', icon: 'account_balance_wallet' },
  { id: 'orders', file: 'orders.html', title: 'Orders', icon: 'receipt_long' },
  { id: 'transactions', file: 'transactions.html', title: 'Transactions', icon: 'list_alt' },
  { id: 'news', file: 'news.html', title: 'News', icon: 'newspaper' },
  { id: 'leaderboard', file: 'leaderboard.html', title: 'Leaderboard', icon: 'leaderboard' },
  { id: 'simulation', file: 'simulation.html', title: 'Event/Rules', icon: 'gavel' },
  { id: 'settings', file: 'settings.html', title: 'Settings', icon: 'settings' },
  { id: 'support', file: 'support.html', title: 'Support', icon: 'contact_support' }
];

function buildSidebar(activeId) {
  return `<!-- Stitch Master Sidebar -->
<nav class="w-[220px] bg-surface border-r border-outline flex flex-col py-4 z-40 shrink-0 gap-2 overflow-y-auto font-sans h-screen sticky top-0">
  <a href="index.html" class="px-4 mb-4 flex items-center gap-3 group">
    <div class="w-10 h-10 flex items-center justify-center bg-primary text-on-primary font-bold text-[14px] rounded-sm shrink-0">
      BS
    </div>
    <div class="flex flex-col">
      <span class="font-bold text-primary tracking-wider uppercase text-[13px] leading-tight group-hover:text-white transition-colors">Black Swan</span>
      <span class="text-on-surface-variant text-[11px]">Pro Terminal</span>
    </div>
  </a>

  <div class="flex flex-col gap-1 px-2">
    <a class="h-10 px-3 flex items-center gap-3 ${activeId === 'dashboard' ? 'text-primary bg-primary/10 border-l-2 border-primary font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-outline-variant'} transition-colors rounded-r-md" href="index.html" title="Dashboard">
      <span class="material-symbols-outlined text-[20px]">dashboard</span>
      <span class="font-medium text-[13px]">Dashboard</span>
    </a>

    <div class="flex flex-col mt-1">
      <a href="markets.html" class="px-3 py-1.5 text-[11px] font-bold tracking-wider text-on-surface-variant uppercase flex items-center justify-between hover:text-primary">
        <span>Markets</span>
        <span class="material-symbols-outlined text-[14px]">chevron_right</span>
      </a>
      <a class="h-8 px-3 flex items-center gap-3 text-on-surface-variant hover:text-on-surface hover:bg-outline-variant transition-colors rounded-md ml-4 text-[13px]" href="markets.html">
        <span class="material-symbols-outlined text-[16px]">show_chart</span>
        <span>Equities</span>
      </a>
      <a class="h-8 px-3 flex items-center gap-3 text-on-surface-variant hover:text-on-surface hover:bg-outline-variant transition-colors rounded-md ml-4 text-[13px]" href="markets.html">
        <span class="material-symbols-outlined text-[16px]">monetization_on</span>
        <span>Commodities</span>
      </a>
      <a class="h-8 px-3 flex items-center gap-3 text-on-surface-variant hover:text-on-surface hover:bg-outline-variant transition-colors rounded-md ml-4 text-[13px]" href="markets.html">
        <span class="material-symbols-outlined text-[16px]">currency_bitcoin</span>
        <span>Crypto</span>
      </a>
      <a class="h-8 px-3 flex items-center gap-3 text-on-surface-variant hover:text-on-surface hover:bg-outline-variant transition-colors rounded-md ml-4 text-[13px]" href="markets.html">
        <span class="material-symbols-outlined text-[16px]">real_estate_agent</span>
        <span>Real Estate</span>
      </a>
    </div>

    <div class="h-px bg-outline my-2 mx-2"></div>

    <a class="h-10 px-3 flex items-center gap-3 ${activeId === 'trade' ? 'text-primary bg-primary/10 border-l-2 border-primary font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-outline-variant'} transition-colors rounded-r-md" href="trade.html" title="Trade">
      <span class="material-symbols-outlined text-[20px]">swap_horiz</span>
      <span class="font-medium text-[13px]">Trade</span>
    </a>

    <a class="h-10 px-3 flex items-center gap-3 ${activeId === 'watchlist' ? 'text-primary bg-primary/10 border-l-2 border-primary font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-outline-variant'} transition-colors rounded-r-md" href="watchlist.html" title="Watchlist">
      <span class="material-symbols-outlined text-[20px]">visibility</span>
      <span class="font-medium text-[13px]">Watchlist</span>
    </a>

    <a class="h-10 px-3 flex items-center gap-3 ${activeId === 'portfolio' ? 'text-primary bg-primary/10 border-l-2 border-primary font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-outline-variant'} transition-colors rounded-r-md" href="portfolio.html" title="Portfolio">
      <span class="material-symbols-outlined text-[20px]">account_balance_wallet</span>
      <span class="font-medium text-[13px]">Portfolio</span>
    </a>

    <a class="h-10 px-3 flex items-center gap-3 ${activeId === 'orders' ? 'text-primary bg-primary/10 border-l-2 border-primary font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-outline-variant'} transition-colors rounded-r-md" href="orders.html" title="Orders">
      <span class="material-symbols-outlined text-[20px]">receipt_long</span>
      <span class="font-medium text-[13px]">Orders</span>
    </a>

    <a class="h-10 px-3 flex items-center gap-3 ${activeId === 'transactions' ? 'text-primary bg-primary/10 border-l-2 border-primary font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-outline-variant'} transition-colors rounded-r-md" href="transactions.html" title="Transactions">
      <span class="material-symbols-outlined text-[20px]">list_alt</span>
      <span class="font-medium text-[13px]">Transactions</span>
    </a>

    <a class="h-10 px-3 flex items-center gap-3 ${activeId === 'news' ? 'text-primary bg-primary/10 border-l-2 border-primary font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-outline-variant'} transition-colors rounded-r-md" href="news.html" title="News">
      <span class="material-symbols-outlined text-[20px]">newspaper</span>
      <span class="font-medium text-[13px]">News</span>
    </a>

    <div class="h-px bg-outline my-2 mx-2"></div>

    <a class="h-10 px-3 flex items-center gap-3 ${activeId === 'leaderboard' ? 'text-primary bg-primary/10 border-l-2 border-primary font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-outline-variant'} transition-colors rounded-r-md" href="leaderboard.html" title="Leaderboard">
      <span class="material-symbols-outlined text-[20px]">leaderboard</span>
      <span class="font-medium text-[13px]">Leaderboard</span>
    </a>

    <a class="h-10 px-3 flex items-center gap-3 ${activeId === 'simulation' ? 'text-primary bg-primary/10 border-l-2 border-primary font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-outline-variant'} transition-colors rounded-r-md" href="simulation.html" title="Event/Rules">
      <span class="material-symbols-outlined text-[20px]">gavel</span>
      <span class="font-medium text-[13px]">Event/Rules</span>
    </a>
  </div>

  <div class="mt-auto flex flex-col gap-1 px-2 pt-2 border-t border-outline">
    <a class="h-10 px-3 flex items-center gap-3 ${activeId === 'settings' ? 'text-primary bg-primary/10 border-l-2 border-primary font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-outline-variant'} transition-colors rounded-r-md" href="settings.html" title="Settings">
      <span class="material-symbols-outlined text-[20px]">settings</span>
      <span class="font-medium text-[13px]">Settings</span>
    </a>

    <a class="h-10 px-3 flex items-center gap-3 ${activeId === 'support' ? 'text-primary bg-primary/10 border-l-2 border-primary font-bold' : 'text-on-surface-variant hover:text-on-surface hover:bg-outline-variant'} transition-colors rounded-r-md" href="support.html" title="Support">
      <span class="material-symbols-outlined text-[20px]">contact_support</span>
      <span class="font-medium text-[13px]">Support</span>
    </a>
  </div>
</nav>`;
}

screens.forEach(s => {
  const rawPath = path.join(__dirname, 'raw_screens', `${s.id}.html`);
  if (!fs.existsSync(rawPath)) return;

  let html = fs.readFileSync(rawPath, 'utf8');

  // Replace existing sidebar with the unified, 100% faithful Stitch master sidebar
  // Check if there is a <nav ...> or <aside ...> on left
  if (s.id === 'dashboard') {
    html = html.replace(/<!-- Sidebar \(Expanded\) -->[\s\S]*?<\/nav>/i, buildSidebar('dashboard'));
  } else if (s.id === 'markets') {
    html = html.replace(/<nav class="fixed left-0 top-0[\s\S]*?<\/nav>/i, buildSidebar('markets'));
    // Make sure body has flex layout
    html = html.replace(/<body[^>]*>/i, '<body class="bg-background text-on-surface font-body-md h-screen w-screen overflow-hidden flex selection:bg-secondary-container selection:text-on-secondary-container">');
  } else if (s.id === 'trade') {
    html = html.replace(/<!-- SideNavBar -->[\s\S]*?<\/nav>/i, buildSidebar('trade'));
    html = html.replace(/<body[^>]*>/i, '<body class="bg-background text-on-surface font-body-md h-screen w-screen overflow-hidden flex selection:bg-secondary-container selection:text-on-secondary-container">');
  } else if (s.id === 'watchlist') {
    html = html.replace(/<!-- SideNavBar \(Shared Component\) -->[\s\S]*?<\/nav>/i, buildSidebar('watchlist'));
    html = html.replace(/<body[^>]*>/i, '<body class="bg-surface text-on-surface font-body-md h-screen w-screen overflow-hidden flex selection:bg-secondary-container selection:text-on-secondary-container">');
  } else if (s.id === 'portfolio') {
    html = html.replace(/<!-- SideNavBar -->[\s\S]*?<\/nav>/i, buildSidebar('portfolio'));
    html = html.replace(/<body[^>]*>/i, '<body class="bg-surface text-on-surface font-body-md h-screen w-screen overflow-hidden flex selection:bg-secondary selection:text-on-secondary">');
  } else if (s.id === 'orders') {
    html = html.replace(/<!-- SideNavBar -->[\s\S]*?<\/aside>/i, buildSidebar('orders'));
    html = html.replace(/<body[^>]*>/i, '<body class="bg-background text-on-surface font-body-md h-screen w-screen overflow-hidden flex selection:bg-secondary-container selection:text-on-secondary-container">');
  } else if (s.id === 'transactions') {
    html = html.replace(/<!-- SideNavBar -->[\s\S]*?<\/aside>/i, buildSidebar('transactions'));
    html = html.replace(/<body[^>]*>/i, '<body class="bg-background text-on-surface font-body-md h-screen w-screen overflow-hidden flex selection:bg-secondary-container selection:text-on-secondary-container">');
  } else if (s.id === 'news') {
    html = html.replace(/<!-- SideNavBar -->[\s\S]*?<\/nav>/i, buildSidebar('news'));
    html = html.replace(/<body[^>]*>/i, '<body class="bg-surface text-on-surface font-body-md h-screen w-screen overflow-hidden flex selection:bg-primary selection:text-on-primary">');
  } else if (s.id === 'leaderboard') {
    html = html.replace(/<!-- SideNavBar \(from JSON\) -->[\s\S]*?<\/nav>/i, buildSidebar('leaderboard'));
    html = html.replace(/<body[^>]*>/i, '<body class="bg-background text-on-surface font-body-md h-screen w-screen overflow-hidden flex selection:bg-secondary-container selection:text-on-secondary-container">');
  } else if (s.id === 'simulation') {
    html = html.replace(/<!-- SideNavBar -->[\s\S]*?<\/aside>/i, buildSidebar('simulation'));
    html = html.replace(/<body[^>]*>/i, '<body class="bg-background text-on-surface font-body-md h-screen w-screen overflow-hidden flex selection:bg-secondary-container selection:text-on-secondary-container">');
  } else if (s.id === 'settings') {
    // Add sidebar to settings layout
    html = html.replace(/<body[^>]*>[\s\S]*?<div class="app-layout pt-12">/i, `<body class="bg-background text-on-surface font-body-md h-screen w-screen overflow-hidden flex selection:bg-secondary-container selection:text-on-secondary-container">\n${buildSidebar('settings')}\n<div class="flex-1 flex flex-col h-full overflow-hidden">`);
  } else if (s.id === 'support') {
    html = html.replace(/<!-- SideNavBar -->[\s\S]*?<\/aside>/i, buildSidebar('support'));
    html = html.replace(/<body[^>]*>/i, '<body class="bg-background text-on-surface font-body-md h-screen w-screen overflow-hidden flex selection:bg-secondary-container selection:text-on-secondary-container">');
  }

  // Update top bar links if any
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?Dashboard[\s\S]*?<\/a>)/gi, 'href="index.html"$1');
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?Trade[\s\S]*?<\/a>)/gi, 'href="trade.html"$1');
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?Portfolio[\s\S]*?<\/a>)/gi, 'href="portfolio.html"$1');
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?Orders[\s\S]*?<\/a>)/gi, 'href="orders.html"$1');
  html = html.replace(/href=["']#["']([^>]*>[\s\S]*?Transactions[\s\S]*?<\/a>)/gi, 'href="transactions.html"$1');

  // Write file
  const targetFile = path.join(__dirname, s.file);
  fs.writeFileSync(targetFile, html, 'utf8');
  console.log(`Updated ${s.file} (100% Stitch UI)`);

  if (s.id === 'dashboard') {
    fs.writeFileSync(path.join(__dirname, 'dashboard.html'), html, 'utf8');
  }
});

console.log('All screens now perfectly reflect Stitch UI with unified sidebar and navigation!');
