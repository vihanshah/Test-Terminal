/**
 * Black Swan Terminal - Core Application State & Logic
 */

const APP_STATE = {
  activeView: 'dashboard',
  portfolio: {
    totalValue: 1084250.00,
    invested: 850000.00,
    cash: 234250.00,
    dayPnL: 18420.00,
    dayPnLPercent: 1.72,
    totalReturn: 84250.00,
    totalReturnPercent: 8.42,
    rank: "07/50",
    dayCounter: "04/10"
  },
  selectedTicker: 'NIFTY 50',
  tickers: [
    { symbol: 'NIFTY 50', name: 'Nifty 50 Index', category: 'Indices', price: 22514.65, change: 0.45, high: 22590.20, low: 22450.10, vol: '14.2M' },
    { symbol: 'SENSEX', name: 'BSE Sensex Index', category: 'Indices', price: 74221.05, change: 0.38, high: 74450.00, low: 73980.50, vol: '8.6M' },
    { symbol: 'BANK NIFTY', name: 'Nifty Bank Index', category: 'Indices', price: 48159.00, change: -0.12, high: 48400.00, low: 48020.00, vol: '5.1M' },
    { symbol: 'GOLD', name: 'Gold 24K 10g', category: 'Commodities', price: 71850.00, change: 1.10, high: 72100.00, low: 71300.00, vol: '42.5K' },
    { symbol: 'BTC/USD', name: 'Bitcoin Spot', category: 'Crypto', price: 64231.00, change: 1.20, high: 65100.00, low: 63400.00, vol: '$18.4B' },
    { symbol: 'ETH/USD', name: 'Ethereum Spot', category: 'Crypto', price: 3485.50, change: 2.15, high: 3540.00, low: 3410.00, vol: '$9.2B' },
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', category: 'Equities', price: 2945.60, change: -0.42, high: 2980.00, low: 2930.10, vol: '3.4M' },
    { symbol: 'TCS', name: 'Tata Consultancy Services', category: 'Equities', price: 4012.25, change: 1.15, high: 4050.00, low: 3980.00, vol: '1.8M' },
    { symbol: 'INFY', name: 'Infosys Limited', category: 'Equities', price: 1560.80, change: 0.85, high: 1580.00, low: 1545.00, vol: '2.9M' },
    { symbol: 'HDFCBANK', name: 'HDFC Bank Ltd', category: 'Equities', price: 1620.40, change: -0.20, high: 1640.00, low: 1610.00, vol: '4.1M' },
    { symbol: 'MUMBAI METRO', name: 'Bandra Comm REIT', category: 'Real Estate', price: 148000.00, change: -1.33, high: 151000.00, low: 147500.00, vol: '320' },
    { symbol: 'BANGALORE TECH', name: 'Whitefield SEZ REIT', category: 'Real Estate', price: 92400.00, change: 0.40, high: 93200.00, low: 91800.00, vol: '450' }
  ],
  openOrders: [
    { id: 'ORD-9842', time: '12:35:10', symbol: 'RELIANCE', type: 'LIMIT', side: 'BUY', price: 2930.00, qty: 50, filled: 0, status: 'OPEN' },
    { id: 'ORD-9841', time: '12:12:44', symbol: 'BTC/USD', type: 'LIMIT', side: 'BUY', price: 63500.00, qty: 0.05, filled: 0, status: 'OPEN' },
    { id: 'ORD-9839', time: '11:45:02', symbol: 'GOLD', type: 'STOP_LIMIT', side: 'SELL', price: 72500.00, qty: 2, filled: 0, status: 'OPEN' }
  ],
  transactions: [
    { id: 'TXN-88291', time: '12:40:15', symbol: 'TCS', side: 'BUY', price: 4005.00, qty: 25, amount: 100125.00, fee: 20.00, status: 'FILLED' },
    { id: 'TXN-88284', time: '11:20:00', symbol: 'BTC/USD', side: 'BUY', price: 64100.00, qty: 0.1, amount: 6410.00, fee: 6.41, status: 'FILLED' },
    { id: 'TXN-88270', time: '10:05:32', symbol: 'HDFCBANK', side: 'SELL', price: 1630.00, qty: 60, amount: 97800.00, fee: 19.56, status: 'FILLED' },
    { id: 'TXN-88255', time: '09:30:10', symbol: 'NIFTY 50', side: 'BUY', price: 22480.00, qty: 50, amount: 1124000.00, fee: 45.00, status: 'FILLED' },
    { id: 'TXN-88240', time: '09:15:00', symbol: 'CASH DEPOSIT', side: 'DEPOSIT', price: 1.00, qty: 250000, amount: 250000.00, fee: 0.00, status: 'COMPLETED' }
  ],
  activeShock: null,
  candlestickChartInstance: null
};

// Router
function navigateTo(viewId, triggerSound = true) {
  if (triggerSound && window.terminalAudio) {
    window.terminalAudio.playClick();
  }

  APP_STATE.activeView = viewId;
  window.location.hash = viewId;

  // Update nav item highlighting
  document.querySelectorAll('.nav-item').forEach(el => {
    if (el.getAttribute('data-view') === viewId) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // Switch SPA views
  document.querySelectorAll('.spa-view').forEach(view => {
    if (view.id === `view-${viewId}`) {
      view.classList.add('active-view');
    } else {
      view.classList.remove('active-view');
    }
  });

  // Initialize or re-render view-specific widgets
  if (viewId === 'trade') {
    setTimeout(() => {
      if (!APP_STATE.candlestickChartInstance) {
        APP_STATE.candlestickChartInstance = new CandlestickChart('trade-candlestick-canvas');
      } else {
        APP_STATE.candlestickChartInstance.resize();
        APP_STATE.candlestickChartInstance.render();
      }
    }, 50);
  }

  window.scrollTo(0, 0);
}

// Tick Simulation Engine
function startSimulationEngine() {
  setInterval(() => {
    // Random price movements
    APP_STATE.tickers.forEach(t => {
      const deltaPercent = (Math.random() - 0.49) * 0.4;
      const oldPrice = t.price;
      t.price = Number((t.price * (1 + deltaPercent / 100)).toFixed(2));
      t.change = Number((t.change + deltaPercent * 0.5).toFixed(2));

      // Flash in ticker or watchlist if visible
      const elements = document.querySelectorAll(`[data-ticker="${t.symbol}"]`);
      elements.forEach(el => {
        el.textContent = t.price.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        if (t.price > oldPrice) {
          el.classList.add('flash-up');
          setTimeout(() => el.classList.remove('flash-up'), 800);
        } else if (t.price < oldPrice) {
          el.classList.add('flash-down');
          setTimeout(() => el.classList.remove('flash-down'), 800);
        }
      });
    });

    // Update active chart tick
    if (APP_STATE.candlestickChartInstance && APP_STATE.activeView === 'trade') {
      const activeTicker = APP_STATE.tickers.find(t => t.symbol === APP_STATE.selectedTicker) || APP_STATE.tickers[0];
      APP_STATE.candlestickChartInstance.addTick(activeTicker.price);
    }

    // Small portfolio fluctuations
    const pnlShift = (Math.random() - 0.48) * 120;
    APP_STATE.portfolio.totalValue += pnlShift;
    APP_STATE.portfolio.dayPnL += pnlShift;
    APP_STATE.portfolio.dayPnLPercent = Number(((APP_STATE.portfolio.dayPnL / APP_STATE.portfolio.invested) * 100).toFixed(2));
    
    updateHeaderStats();
    updateLiveOrderBook();
  }, 1600);
}

function updateHeaderStats() {
  const elVal = document.getElementById('header-portfolio-val');
  const elPnL = document.getElementById('header-portfolio-pnl');
  if (elVal) {
    elVal.textContent = '₹' + APP_STATE.portfolio.totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  if (elPnL) {
    const isPos = APP_STATE.portfolio.dayPnL >= 0;
    elPnL.textContent = `${isPos ? '+' : ''}${APP_STATE.portfolio.dayPnLPercent}%`;
    elPnL.className = isPos ? 'text-profit-green bg-[#006727]/30 px-1.5 py-0.5 rounded text-[12px] font-mono' : 'text-loss-red bg-[#93000a]/30 px-1.5 py-0.5 rounded text-[12px] font-mono';
  }
}

// Live Order Book randomized depths
function updateLiveOrderBook() {
  const activeTicker = APP_STATE.tickers.find(t => t.symbol === APP_STATE.selectedTicker) || APP_STATE.tickers[0];
  const p = activeTicker.price;

  // Update Bids
  const bidRows = document.querySelectorAll('.live-bid-row');
  bidRows.forEach((row, i) => {
    const rowPrice = (p * (1 - (i + 1) * 0.0008)).toFixed(2);
    const rowQty = (Math.floor(Math.random() * 40 + 5) * 10).toFixed(0);
    const pEl = row.querySelector('.bid-price');
    const qEl = row.querySelector('.bid-qty');
    const bEl = row.querySelector('.bid-bar');
    if (pEl) pEl.textContent = rowPrice;
    if (qEl) qEl.textContent = rowQty;
    if (bEl) bEl.style.width = `${Math.min(100, rowQty * 0.25)}%`;
  });

  // Update Asks
  const askRows = document.querySelectorAll('.live-ask-row');
  askRows.forEach((row, i) => {
    const rowPrice = (p * (1 + (i + 1) * 0.0008)).toFixed(2);
    const rowQty = (Math.floor(Math.random() * 40 + 5) * 10).toFixed(0);
    const pEl = row.querySelector('.ask-price');
    const qEl = row.querySelector('.ask-qty');
    const bEl = row.querySelector('.ask-bar');
    if (pEl) pEl.textContent = rowPrice;
    if (qEl) qEl.textContent = rowQty;
    if (bEl) bEl.style.width = `${Math.min(100, rowQty * 0.25)}%`;
  });
}

// Toast Notifications
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const borderCol = type === 'error' ? 'border-[#ff3d57]' : type === 'warning' ? 'border-[#ff9800]' : 'border-[#00e5ff]';
  const icon = type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'check_circle';
  const iconCol = type === 'error' ? 'text-[#ff3d57]' : type === 'warning' ? 'text-[#ff9800]' : 'text-[#00e5ff]';

  toast.className = `flex items-center gap-3 bg-[#0e1013] border-l-4 ${borderCol} border border-[#21262d] px-4 py-3 rounded shadow-2xl text-[13px] font-mono animate-fadeIn transition-all duration-300 pointer-events-auto`;
  toast.innerHTML = `
    <span class="material-symbols-outlined ${iconCol} text-[18px]">${icon}</span>
    <span class="text-on-surface flex-1">${message}</span>
    <button class="text-text-secondary hover:text-white" onclick="this.parentElement.remove()"><span class="material-symbols-outlined text-[16px]">close</span></button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Execute Order
function executeOrder(side, symbol, qty, price, type = 'MARKET') {
  qty = Number(qty);
  price = Number(price);
  if (!qty || qty <= 0) {
    showToast('Invalid quantity specified.', 'error');
    return;
  }

  const totalCost = qty * price;
  if (side === 'BUY' && totalCost > APP_STATE.portfolio.cash) {
    showToast(`Insufficient cash: required ₹${totalCost.toLocaleString('en-IN')}, available ₹${APP_STATE.portfolio.cash.toLocaleString('en-IN')}`, 'error');
    return;
  }

  if (side === 'BUY') {
    APP_STATE.portfolio.cash -= totalCost;
    APP_STATE.portfolio.invested += totalCost;
  } else {
    APP_STATE.portfolio.cash += totalCost;
    APP_STATE.portfolio.invested = Math.max(0, APP_STATE.portfolio.invested - totalCost);
  }

  const now = new Date();
  const timeStr = now.toTimeString().split(' ')[0];
  const orderId = `ORD-${Math.floor(Math.random() * 9000 + 1000)}`;
  const txnId = `TXN-${Math.floor(Math.random() * 90000 + 10000)}`;

  // Record Transaction
  const newTxn = {
    id: txnId,
    time: timeStr,
    symbol: symbol,
    side: side,
    price: price,
    qty: qty,
    amount: totalCost,
    fee: Number((totalCost * 0.0002).toFixed(2)),
    status: 'FILLED'
  };
  APP_STATE.transactions.unshift(newTxn);

  if (window.terminalAudio) {
    window.terminalAudio.playOrderSuccess();
  }

  showToast(`${side} order filled for ${qty} ${symbol} @ ₹${price.toLocaleString('en-IN')}`, 'success');
  updateHeaderStats();
  renderOrdersTable();
  renderTransactionsTable();
}

// Cancel Order
function cancelOrder(orderId) {
  const idx = APP_STATE.openOrders.findIndex(o => o.id === orderId);
  if (idx !== -1) {
    const ord = APP_STATE.openOrders.splice(idx, 1)[0];
    showToast(`Order ${ord.id} (${ord.side} ${ord.symbol}) cancelled.`, 'warning');
    if (window.terminalAudio) window.terminalAudio.playClick();
    renderOrdersTable();
  }
}

// Render Orders Table
function renderOrdersTable() {
  const tbody = document.getElementById('orders-table-body');
  if (!tbody) return;

  if (APP_STATE.openOrders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-6 text-text-secondary font-mono text-[12px]">NO ACTIVE OPEN ORDERS IN QUEUE</td></tr>`;
    return;
  }

  tbody.innerHTML = APP_STATE.openOrders.map(o => `
    <tr class="border-b border-[#21262d] hover:bg-[#15181e] font-mono text-[12px]">
      <td class="py-2.5 px-4 text-[#00e5ff] font-bold">${o.id}</td>
      <td class="py-2.5 px-4 text-text-secondary">${o.time}</td>
      <td class="py-2.5 px-4 font-bold text-white">${o.symbol}</td>
      <td class="py-2.5 px-4"><span class="px-1.5 py-0.5 text-[10px] font-bold rounded ${o.side === 'BUY' ? 'bg-[#00c853]/20 text-[#00e676]' : 'bg-[#ff1744]/20 text-[#ff3d57]'}">${o.side}</span></td>
      <td class="py-2.5 px-4 text-text-secondary">${o.type}</td>
      <td class="py-2.5 px-4 text-right">₹${o.price.toLocaleString('en-IN')}</td>
      <td class="py-2.5 px-4 text-right">${o.qty}</td>
      <td class="py-2.5 px-4 text-center">
        <button onclick="cancelOrder('${o.id}')" class="px-2 py-1 bg-[#ff3d57]/20 hover:bg-[#ff3d57]/40 text-[#ff3d57] rounded text-[11px] font-bold transition-colors">CANCEL</button>
      </td>
    </tr>
  `).join('');
}

// Render Transactions Table
function renderTransactionsTable() {
  const tbody = document.getElementById('transactions-table-body');
  if (!tbody) return;

  tbody.innerHTML = APP_STATE.transactions.map(t => `
    <tr class="border-b border-[#21262d] hover:bg-[#15181e] font-mono text-[12px]">
      <td class="py-2.5 px-4 text-[#00e5ff] font-bold">${t.id}</td>
      <td class="py-2.5 px-4 text-text-secondary">${t.time}</td>
      <td class="py-2.5 px-4 font-bold text-white">${t.symbol}</td>
      <td class="py-2.5 px-4"><span class="px-1.5 py-0.5 text-[10px] font-bold rounded ${t.side === 'BUY' || t.side === 'DEPOSIT' ? 'bg-[#00c853]/20 text-[#00e676]' : 'bg-[#ff1744]/20 text-[#ff3d57]'}">${t.side}</span></td>
      <td class="py-2.5 px-4 text-right">₹${t.price.toLocaleString('en-IN')}</td>
      <td class="py-2.5 px-4 text-right">${t.qty}</td>
      <td class="py-2.5 px-4 text-right text-white font-bold">₹${t.amount.toLocaleString('en-IN')}</td>
      <td class="py-2.5 px-4 text-right text-text-secondary">₹${t.fee.toFixed(2)}</td>
      <td class="py-2.5 px-4 text-center"><span class="text-[#00e676] text-[11px] font-bold">● ${t.status}</span></td>
    </tr>
  `).join('');
}

// Export Transactions as CSV
function exportTransactionsCSV() {
  let csv = "Transaction ID,Time,Symbol,Side,Price,Quantity,Total Amount,Fee,Status\n";
  APP_STATE.transactions.forEach(t => {
    csv += `"${t.id}","${t.time}","${t.symbol}","${t.side}",${t.price},${t.qty},${t.amount},${t.fee},"${t.status}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `BlackSwan_Transactions_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast('Transactions exported successfully to CSV.', 'success');
  if (window.terminalAudio) window.terminalAudio.playOrderSuccess();
}

// Black Swan Scenario Injections
function triggerBlackSwanShock(shockType) {
  if (window.terminalAudio) window.terminalAudio.playAlarm();

  const banner = document.getElementById('black-swan-alert-banner');
  const alertText = document.getElementById('black-swan-alert-text');

  if (shockType === 'flash_crash') {
    APP_STATE.activeShock = 'FLASH_CRASH';
    APP_STATE.tickers.forEach(t => {
      if (t.category === 'Crypto' || t.category === 'Equities' || t.category === 'Indices') {
        t.price = Number((t.price * 0.82).toFixed(2));
        t.change = Number((t.change - 18.2).toFixed(2));
      } else if (t.symbol === 'GOLD') {
        t.price = Number((t.price * 1.08).toFixed(2));
        t.change = Number((t.change + 8.0).toFixed(2));
      }
    });
    APP_STATE.portfolio.totalValue *= 0.86;
    APP_STATE.portfolio.dayPnL -= 150000;
    APP_STATE.portfolio.dayPnLPercent = -14.2;

    if (banner && alertText) {
      alertText.innerHTML = `<strong>CRISIS LEVEL 5 ALERT:</strong> FLASH CRASH DETECTED. Multi-asset liquidity drop across global markets. Equities & Crypto plummeted -18.2%.`;
      banner.classList.remove('hidden');
    }
    showToast('🚨 BLACK SWAN EVENT: Severe Flash Crash in progress!', 'error');

  } else if (shockType === 'oil_shock') {
    APP_STATE.activeShock = 'OIL_SHOCK';
    APP_STATE.tickers.forEach(t => {
      if (t.category === 'Commodities') {
        t.price = Number((t.price * 1.25).toFixed(2));
        t.change = Number((t.change + 25.0).toFixed(2));
      } else {
        t.price = Number((t.price * 0.94).toFixed(2));
        t.change = Number((t.change - 6.0).toFixed(2));
      }
    });
    if (banner && alertText) {
      alertText.innerHTML = `<strong>GEOPOLITICAL SHOCK:</strong> Middle East Energy Squeeze. Crude & Commodity index surges +25%, broad markets compress.`;
      banner.classList.remove('hidden');
    }
    showToast('⚡ Geopolitical Commodity Spike Triggered.', 'warning');

  } else if (shockType === 'tech_boom') {
    APP_STATE.activeShock = 'TECH_BOOM';
    APP_STATE.tickers.forEach(t => {
      if (t.category === 'Equities' || t.category === 'Crypto') {
        t.price = Number((t.price * 1.15).toFixed(2));
        t.change = Number((t.change + 15.0).toFixed(2));
      }
    });
    APP_STATE.portfolio.totalValue *= 1.12;
    APP_STATE.portfolio.dayPnL += 125000;
    APP_STATE.portfolio.dayPnLPercent = +12.4;

    if (banner && alertText) {
      alertText.innerHTML = `<strong>MARKET SURGE:</strong> Break-through AI supercluster deployment triggers institutional short squeeze.`;
      banner.classList.remove('hidden');
    }
    showToast('🚀 Bullish Tech Short Squeeze in effect!', 'success');

  } else if (shockType === 'reset') {
    APP_STATE.activeShock = null;
    APP_STATE.portfolio.totalValue = 1084250.00;
    APP_STATE.portfolio.invested = 850000.00;
    APP_STATE.portfolio.cash = 234250.00;
    APP_STATE.portfolio.dayPnL = 18420.00;
    APP_STATE.portfolio.dayPnLPercent = 1.72;

    if (banner) banner.classList.add('hidden');
    showToast('Simulation parameters restored to baseline.', 'success');
  }

  updateHeaderStats();
}

// Command Palette & Search
function openCommandPalette() {
  const modal = document.getElementById('command-palette-modal');
  const input = document.getElementById('command-palette-input');
  if (modal && input) {
    modal.classList.remove('hidden');
    input.value = '';
    input.focus();
    filterCommandResults('');
  }
}

function closeCommandPalette() {
  const modal = document.getElementById('command-palette-modal');
  if (modal) modal.classList.add('hidden');
}

function filterCommandResults(query) {
  const list = document.getElementById('command-palette-results');
  if (!list) return;

  const q = query.toLowerCase().trim();
  const pages = [
    { name: 'Dashboard', icon: 'dashboard', id: 'dashboard', desc: 'Portfolio summary & market feed' },
    { name: 'Markets', icon: 'show_chart', id: 'markets', desc: 'Equities, Crypto, Commodities, Real Estate' },
    { name: 'Trade Terminal', icon: 'swap_horiz', id: 'trade', desc: 'Candlestick charts & order book' },
    { name: 'Watchlist', icon: 'visibility', id: 'watchlist', desc: 'Multi-asset price trackers' },
    { name: 'Portfolio', icon: 'account_balance_wallet', id: 'portfolio', desc: 'Holdings & performance analytics' },
    { name: 'Orders', icon: 'receipt_long', id: 'orders', desc: 'Open order queue & order history' },
    { name: 'Transactions', icon: 'list_alt', id: 'transactions', desc: 'Ledger & cash flow records' },
    { name: 'News & Wire', icon: 'newspaper', id: 'news', desc: 'Real-time institutional news' },
    { name: 'Leaderboard', icon: 'leaderboard', id: 'leaderboard', desc: 'Rankings & trader competition' },
    { name: 'Event & Simulation', icon: 'gavel', id: 'simulation', desc: 'Macro crisis simulator & rulebook' },
    { name: 'Settings', icon: 'settings', id: 'settings', desc: 'Terminal preferences & audio' },
    { name: 'Support & Status', icon: 'contact_support', id: 'support', desc: 'System ping & incident logs' }
  ];

  const matched = pages.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.id.includes(q));

  if (matched.length === 0) {
    list.innerHTML = `<div class="p-4 text-center text-text-secondary font-mono text-[13px]">No matching command or ticker found.</div>`;
    return;
  }

  list.innerHTML = matched.map(p => `
    <div onclick="navigateTo('${p.id}'); closeCommandPalette();" class="flex items-center justify-between px-4 py-3 hover:bg-[#1b2028] cursor-pointer rounded transition-colors group">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-[20px] text-text-secondary group-hover:text-[#00e5ff]">${p.icon}</span>
        <div>
          <div class="text-[13px] font-bold text-white group-hover:text-[#00e5ff]">${p.name}</div>
          <div class="text-[11px] text-text-secondary">${p.desc}</div>
        </div>
      </div>
      <span class="text-[11px] font-mono text-text-secondary bg-[#15181e] px-2 py-0.5 rounded border border-[#21262d]">Jump to view</span>
    </div>
  `).join('');
}

// Initial Boot
document.addEventListener('DOMContentLoaded', () => {
  // Read hash or default to dashboard
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  navigateTo(hash, false);

  // Setup Hotkeys (Ctrl+K or /)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openCommandPalette();
    } else if (e.key === 'Escape') {
      closeCommandPalette();
    }
  });

  // Start Background Simulation
  startSimulationEngine();
  renderOrdersTable();
  renderTransactionsTable();

  // Audio Toggle in Header
  const audioBtn = document.getElementById('header-audio-toggle');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (window.terminalAudio) {
        const isMuted = window.terminalAudio.toggleMute();
        audioBtn.innerHTML = `<span class="material-symbols-outlined text-[20px]">${isMuted ? 'volume_off' : 'volume_up'}</span>`;
        showToast(isMuted ? 'Terminal audio muted' : 'Terminal audio enabled', 'info');
      }
    });
  }

  // Fullscreen Toggle
  const fsBtn = document.getElementById('header-fullscreen-toggle');
  if (fsBtn) {
    fsBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }
});
