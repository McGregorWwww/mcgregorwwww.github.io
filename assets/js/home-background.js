/* ============================================================================
   BLUEPRINT BACKGROUND
   - grid is aligned to the content column, so lines meet the page edges cleanly
   - a scan band sweeps through; grid nodes it passes light up, then fade
   - banner: cursor crosshair snaps to the grid with a live coordinate readout
   - gutters: grid scrolls with the page, plus a ruler along the column edge
   ============================================================================ */
(function(){
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* 16px minor, 6 to a major. The grid used to be 24/96 (4 to a major), which
     at the opacities this layer can afford read as a few stray lines rather
     than as a field. A denser minor gives it texture; the major stays at 96 so
     it still lands on the content column's edges and the footer scale bar. */
  const MINOR = 16, MAJOR = 96, SUB = MAJOR / MINOR;
  /* How fast the gutter grid tracks the scroll. Below 1 it lags the content,
     which reads as depth. Kept at 1 when the user asked for less motion:
     parallax is exactly the kind of movement that setting is about. */
  const PARALLAX = REDUCED ? 1 : .55;
  let INK = '42,74,128';                        // --accent-rgb, refreshed on palette change
  const readInk = () => (getComputedStyle(root).getPropertyValue('--accent-rgb').trim() || '42,74,128');
  const root = document.documentElement;
  const colW = () => parseFloat(getComputedStyle(root).getPropertyValue('--col')) || 1080;

  function layer(host){
    const cv = document.createElement('canvas');
    cv.className = 'bp';
    host.appendChild(cv);
    const ctx = cv.getContext('2d');
    const grid = document.createElement('canvas');   // static grid, redrawn on resize only
    const gctx = grid.getContext('2d');
    return { host, cv, ctx, grid, gctx, W:0, H:0, dpr:1, ox:0 };
  }

  function size(L, w, h){
    L.dpr = Math.min(devicePixelRatio || 1, 2);
    L.W = w; L.H = h;
    [L.cv, L.grid].forEach(c => { c.width = w * L.dpr; c.height = h * L.dpr; });
    L.ctx.setTransform(L.dpr, 0, 0, L.dpr, 0, 0);
    L.gctx.setTransform(L.dpr, 0, 0, L.dpr, 0, 0);
    // x origin = left edge of the content column, so majors land on the column edges
    L.ox = ((w - Math.min(colW(), w)) / 2) % MAJOR;
  }

  // static grid tile, tall enough to scroll by one MAJOR period
  function paintGrid(L, extraH){
    const g = L.gctx, W = L.W, H = L.H + (extraH || 0);
    g.clearRect(0, 0, W, H);
    for (let x = L.ox - MAJOR; x <= W; x += MINOR) {
      const major = Math.round((x - L.ox) / MINOR) % SUB === 0;
      g.fillStyle = `rgba(${INK},${major ? .2 : .085})`;
      g.fillRect(Math.round(x), 0, 1, H);
    }
    for (let y = 0; y <= H; y += MINOR) {
      const major = Math.round(y / MINOR) % SUB === 0;
      g.fillStyle = `rgba(${INK},${major ? .2 : .085})`;
      g.fillRect(0, Math.round(y), W, 1);
    }
    // registration crosses on every major intersection
    g.fillStyle = `rgba(${INK},.34)`;
    for (let x = L.ox; x <= W; x += MAJOR)
      for (let y = 0; y <= H; y += MAJOR) {
        g.fillRect(Math.round(x) - 4, Math.round(y), 9, 1);
        g.fillRect(Math.round(x), Math.round(y) - 4, 1, 9);
      }
    // a dot at every minor intersection: it gives the field a texture at
    // reading distance that lines alone do not, without adding more lines
    g.fillStyle = `rgba(${INK},.17)`;
    for (let x = L.ox; x <= W; x += MINOR)
      for (let y = 0; y <= H; y += MINOR)
        if (Math.round((x - L.ox) / MINOR) % SUB || Math.round(y / MINOR) % SUB)
          g.fillRect(Math.round(x), Math.round(y), 1, 1);
  }

  // lit nodes: { x, y, t0 } — set when the scan band crosses a major node
  function glowNodes(ctx, nodes, now){
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i], age = (now - n.t0) / 1600;
      if (age >= 1) { nodes.splice(i, 1); continue; }
      const a = (1 - age) * (1 - age);
      ctx.fillStyle = `rgba(${INK},${.55 * a})`;
      ctx.fillRect(n.x - 1, n.y - 1, 3, 3);
      ctx.strokeStyle = `rgba(${INK},${.3 * a})`;
      ctx.lineWidth = 1;
      ctx.strokeRect(n.x - 3.5 - age * 5, n.y - 3.5 - age * 5, 7 + age * 10, 7 + age * 10);
    }
  }

  /* ---------------- banner ---------------- */
  const bannerHost = document.getElementById('bgb');
  const banner = bannerHost.parentElement;
  const B = layer(bannerHost);
  const read = document.createElement('div'); read.className = 'bp-read'; bannerHost.appendChild(read);
  const title = document.createElement('div'); title.className = 'bp-title';
  title.innerHTML = '<span>sheet <b>01</b></span><span>scale 1:24</span><span id="bp-xy">— , —</span>';
  bannerHost.appendChild(title);
  const xy = title.querySelector('#bp-xy');
  const bNodes = [];
  let lastBX = -1;
  const cur = { x:-1, y:-1, on:false, sx:-1, sy:-1 };

  /* ---------------- page gutters ---------------- */
  const P = layer(document.getElementById('bgp'));
  const pNodes = [];
  let lastPY = -1;

  function resize(){
    size(B, banner.clientWidth, banner.clientHeight); paintGrid(B, 0);
    size(P, innerWidth, innerHeight);                 paintGrid(P, MAJOR);
    lastBX = lastPY = -1;
  }

  const SWEEP_B = 11000, SWEEP_P = 16000;
  let bannerVisible = true, last = 0;

  function frame(now){
    requestAnimationFrame(frame);
    if (now - last < 30) return;                    // ~33fps is plenty
    last = now;

    /* banner */
    if (bannerVisible) {
      const c = B.ctx, W = B.W, H = B.H;
      c.clearRect(0, 0, W, H);
      c.drawImage(B.grid, 0, 0, W, H);

      if (!REDUCED) {
        // vertical scan band, travelling left → right
        const u = (now % SWEEP_B) / SWEEP_B, bx = -160 + u * (W + 320);
        const gr = c.createLinearGradient(bx - 150, 0, bx + 2, 0);
        gr.addColorStop(0, `rgba(${INK},0)`); gr.addColorStop(.85, `rgba(${INK},.045)`); gr.addColorStop(1, `rgba(${INK},.13)`);
        c.fillStyle = gr; c.fillRect(bx - 150, 0, 152, H);
        c.fillStyle = `rgba(${INK},.22)`; c.fillRect(Math.round(bx), 0, 1, H);
        // light the major nodes the band just crossed
        if (lastBX >= 0 && bx > lastBX) {
          for (let x = B.ox; x <= W; x += MAJOR) if (x > lastBX && x <= bx)
            for (let y = 0; y <= H; y += MAJOR) bNodes.push({ x:Math.round(x), y:Math.round(y), t0:now });
        }
        lastBX = bx;
        glowNodes(c, bNodes, now);
      }

      // cursor crosshair, snapped to the minor grid and eased
      if (cur.on) {
        const tx = B.ox + Math.round((cur.x - B.ox) / MINOR) * MINOR;
        const ty = Math.round(cur.y / MINOR) * MINOR;
        if (cur.sx < 0) { cur.sx = tx; cur.sy = ty; }
        cur.sx += (tx - cur.sx) * .35; cur.sy += (ty - cur.sy) * .35;
        const x = Math.round(cur.sx), y = Math.round(cur.sy);
        c.save();
        c.strokeStyle = `rgba(${INK},.28)`; c.lineWidth = 1; c.setLineDash([2, 4]);
        c.beginPath(); c.moveTo(x + .5, 0); c.lineTo(x + .5, H); c.moveTo(0, y + .5); c.lineTo(W, y + .5); c.stroke();
        c.restore();
        c.fillStyle = `rgba(${INK},.07)`;
        c.fillRect(x - MINOR, y - MINOR, MINOR * 2, MINOR * 2);
        c.strokeStyle = `rgba(${INK},.5)`; c.strokeRect(x - 4.5, y - 4.5, 9, 9);
        const gx = Math.round((x - B.ox) / MINOR), gy = Math.round(y / MINOR);
        read.textContent = (gx >= 0 ? '+' : '') + gx + ' , ' + gy;
        read.style.left = x + 'px'; read.style.top = y + 'px';
        xy.textContent = gx + ' , ' + gy;
      }
    }

    /* Page gutters. The grid tracks the document at PARALLAX rather than 1:1,
       so the board appears to lie behind the sheet instead of being glued to
       it. The ruler below stays at 1:1 on purpose: it is a measuring scale
       against the content, and a scale that drifts is a broken scale. */
    const c = P.ctx, W = P.W, H = P.H;
    const oy = (scrollY * PARALLAX) % MAJOR;
    c.clearRect(0, 0, W, H);
    c.drawImage(P.grid, 0, -oy, W, H + MAJOR);

    /* Ruler ticks just outside each column edge, numbered every MAJOR in
       document space. The ruler has its own 1:1 origin: it measures the
       content, so a tick labelled 07 has to sit where 07 actually is. Stepping
       it from the grid's parallax origin would have drifted the labels away
       from their own ticks as the page scrolled. */
    const g = Math.max(0, (W - colW()) / 2);
    if (g > 40) {
      c.font = '8.5px "IBM Plex Mono", monospace';
      c.textBaseline = 'middle';
      const tick0 = -(scrollY % MAJOR);
      for (let y = tick0; y < H + MINOR; y += MINOR) {
        const major = Math.round((y + scrollY) / MINOR) % SUB === 0;
        const len = major ? 9 : 4;
        c.fillStyle = `rgba(${INK},${major ? .4 : .22})`;
        c.fillRect(Math.round(g - 14 - len), Math.round(y), len, 1);
        c.fillRect(Math.round(W - g + 14), Math.round(y), len, 1);
        if (major) {
          const label = String(Math.round((y + scrollY) / MAJOR)).padStart(2, '0');
          c.fillStyle = `rgba(${INK},.38)`;
          c.textAlign = 'right'; c.fillText(label, g - 28, y);
          c.textAlign = 'left';  c.fillText(label, W - g + 28, y);
        }
      }
      // marker on the ruler at the reading position
      const ry = H * .35;
      c.fillStyle = `rgba(${INK},.75)`;
      c.beginPath(); c.moveTo(g - 4, ry); c.lineTo(g - 10, ry - 4); c.lineTo(g - 10, ry + 4); c.fill();
      c.beginPath(); c.moveTo(W - g + 4, ry); c.lineTo(W - g + 10, ry - 4); c.lineTo(W - g + 10, ry + 4); c.fill();
    }

    if (!REDUCED) {
      // horizontal scan band travelling down the viewport
      const u = (now % SWEEP_P) / SWEEP_P, by = -120 + u * (H + 240);
      const gr = c.createLinearGradient(0, by - 110, 0, by + 2);
      gr.addColorStop(0, `rgba(${INK},0)`); gr.addColorStop(.85, `rgba(${INK},.035)`); gr.addColorStop(1, `rgba(${INK},.11)`);
      c.fillStyle = gr; c.fillRect(0, by - 110, W, 112);
      c.fillStyle = `rgba(${INK},.18)`; c.fillRect(0, Math.round(by), W, 1);
      if (lastPY >= 0 && by > lastPY) {
        for (let y = -oy; y <= H; y += MAJOR) if (y > lastPY && y <= by)
          for (let x = P.ox; x <= W; x += MAJOR) pNodes.push({ x:Math.round(x), y:Math.round(y), t0:now, sy:scrollY });
      }
      lastPY = by;
      // A lit node belongs to the grid it was struck on, so while it fades it
      // travels with that grid -- at PARALLAX, not at the scroll's own rate.
      c.save();
      pNodes.forEach(n => { n.y += (n.sy - scrollY) * PARALLAX; n.sy = scrollY; });
      glowNodes(c, pNodes, now);
      c.restore();
    }
  }

  banner.addEventListener('pointermove', e => {
    const r = banner.getBoundingClientRect();
    cur.x = e.clientX - r.left; cur.y = e.clientY - r.top; cur.on = true;
    read.classList.add('on');
  });
  banner.addEventListener('pointerleave', () => {
    cur.on = false; cur.sx = cur.sy = -1; read.classList.remove('on'); xy.textContent = '— , —';
  });
  new IntersectionObserver(en => { bannerVisible = en[0].isIntersecting; }).observe(banner);
  addEventListener('resize', resize);
  document.fonts && document.fonts.ready.then(() => { lastPY = -1; });

  INK = readInk();
  addEventListener('palettechange', () => { INK = readInk(); resize(); });
  resize();
  requestAnimationFrame(frame);
  requestAnimationFrame(() => { B.cv.classList.add('on'); P.cv.classList.add('on'); });
})();
