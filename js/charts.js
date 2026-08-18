// Candlestick and Financial Canvas Chart Engine

class CandlestickChart {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.candles = [];
    this.timeframe = '5m';
    this.crosshair = null;
    this.initEvents();
    this.generateInitialData();
    this.render();
  }

  generateInitialData() {
    this.candles = [];
    let price = 22514.65;
    const now = Date.now();
    for (let i = 60; i >= 0; i--) {
      const open = price;
      const change = (Math.random() - 0.48) * 35;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 20;
      const low = Math.min(open, close) - Math.random() * 20;
      const volume = Math.floor(Math.random() * 8000 + 2000);
      const time = new Date(now - i * 5 * 60 * 1000);
      
      this.candles.push({ time, open, high, low, close, volume });
      price = close;
    }
  }

  addTick(newPrice) {
    if (!this.candles.length) return;
    const last = this.candles[this.candles.length - 1];
    last.close = newPrice;
    last.high = Math.max(last.high, newPrice);
    last.low = Math.min(last.low, newPrice);
    last.volume += Math.floor(Math.random() * 50 + 10);
    this.render();
  }

  setTimeframe(tf) {
    this.timeframe = tf;
    this.generateInitialData();
    this.render();
  }

  initEvents() {
    if (!this.canvas) return;
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      this.crosshair = { x, y };
      this.render();
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.crosshair = null;
      this.render();
    });

    window.addEventListener('resize', () => {
      this.resize();
      this.render();
    });
    this.resize();
  }

  resize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height || 340;
  }

  render() {
    if (!this.canvas || !this.ctx) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    
    ctx.clearRect(0, 0, w, h);
    if (!this.candles.length) return;

    const chartH = h - 60; // leave room for volume
    const volH = 50;

    let minPrice = Infinity;
    let maxPrice = -Infinity;
    let maxVol = 0;

    this.candles.forEach(c => {
      if (c.low < minPrice) minPrice = c.low;
      if (c.high > maxPrice) maxPrice = c.high;
      if (c.volume > maxVol) maxVol = c.volume;
    });

    const pad = (maxPrice - minPrice) * 0.08;
    minPrice -= pad;
    maxPrice += pad;
    const priceRange = maxPrice - minPrice || 1;

    // Grid lines
    ctx.strokeStyle = '#1d2229';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    
    // Horizontal price grid
    const steps = 5;
    for (let i = 0; i <= steps; i++) {
      const y = chartH * (i / steps);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w - 60, y);
      ctx.stroke();

      const p = maxPrice - (priceRange * (i / steps));
      ctx.fillStyle = '#8b949e';
      ctx.font = '10px JetBrains Mono';
      ctx.textAlign = 'left';
      ctx.fillText(p.toFixed(2), w - 55, y + 3);
    }
    ctx.setLineDash([]);

    // Candle widths
    const count = this.candles.length;
    const candleWidth = (w - 70) / count;
    const bodyWidth = Math.max(candleWidth * 0.7, 2);

    // Calculate 20 EMA
    const emaPeriod = 20;
    const k = 2 / (emaPeriod + 1);
    let ema = this.candles[0].close;
    const emaPoints = [];

    this.candles.forEach((c, idx) => {
      ema = (c.close * k) + (ema * (1 - k));
      const x = idx * candleWidth + candleWidth / 2;
      const y = chartH - ((ema - minPrice) / priceRange) * chartH;
      emaPoints.push({ x, y });

      const isBull = c.close >= c.open;
      const candleColor = isBull ? '#00e676' : '#ff3d57';
      const candleBorder = isBull ? '#00c853' : '#d50000';

      const highY = chartH - ((c.high - minPrice) / priceRange) * chartH;
      const lowY = chartH - ((c.low - minPrice) / priceRange) * chartH;
      const openY = chartH - ((c.open - minPrice) / priceRange) * chartH;
      const closeY = chartH - ((c.close - minPrice) / priceRange) * chartH;

      // Wick
      ctx.strokeStyle = candleColor;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      // Body
      const topY = Math.min(openY, closeY);
      const bH = Math.max(Math.abs(openY - closeY), 2);
      ctx.fillStyle = candleColor;
      ctx.fillRect(x - bodyWidth / 2, topY, bodyWidth, bH);

      // Volume bar
      const barH = (c.volume / maxVol) * volH;
      ctx.fillStyle = isBull ? 'rgba(0, 230, 118, 0.3)' : 'rgba(255, 61, 87, 0.3)';
      ctx.fillRect(x - bodyWidth / 2, h - barH, bodyWidth, barH);
    });

    // Draw EMA Line
    if (emaPoints.length > 1) {
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(emaPoints[0].x, emaPoints[0].y);
      for (let i = 1; i < emaPoints.length; i++) {
        ctx.lineTo(emaPoints[i].x, emaPoints[i].y);
      }
      ctx.stroke();
    }

    // Crosshair
    if (this.crosshair) {
      const { x, y } = this.crosshair;
      ctx.strokeStyle = '#8b949e';
      ctx.setLineDash([2, 2]);
      ctx.lineWidth = 1;

      // Vertical line
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();

      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w - 60, y);
      ctx.stroke();
      ctx.setLineDash([]);

      // Tooltip price
      const hoveredPrice = maxPrice - (y / chartH) * priceRange;
      ctx.fillStyle = '#00e5ff';
      ctx.fillRect(w - 60, y - 9, 60, 18);
      ctx.fillStyle = '#000';
      ctx.font = 'bold 10px JetBrains Mono';
      ctx.textAlign = 'center';
      ctx.fillText(hoveredPrice.toFixed(2), w - 30, y + 3);
    }
  }
}

window.CandlestickChart = CandlestickChart;
