/* ============================================================================
   UNDER THE MAP — one window per domain, one hierarchy
   ----------------------------------------------------------------------------
   Each window dives into one image and climbs back out, pulling one feature
   out per level and dropping it into the tray underneath:
     I   CT slice     -> pixels: intensity (HU) -> texture tiles -> shape + location
     II  photograph   -> pixels: RGB            -> fur texture   -> part layout
     III retina       -> V1: orientation        -> V2/V4 contours -> IT: parts
   Each feature, once in its tray, draws a line into the shared Visual Semantic
   Representation box under all three windows, which holds one space per level
   (low / mid / high); every domain's low-level feature lands in the low space,
   and so on. One clock drives all three windows so the levels line up.

   images/dive/: ct.png is a synthetic abdominal slice (soft-tissue window,
   L40/W400); retina.png is the cat photo with foveated blur; ret-v4.png is a
   Canny contour map of it. DATA below was computed offline from those same
   pixels: the HU and RGB read-outs, texture tiles that match the probed patch,
   V1 orientation energy (structure tensor), the organ outlines.

   Needs home.js loaded first (DOMAINS, IMG_BASE, REDUCED, focus, setFocus).
   ============================================================================ */
(() => {
const DATA = {
  ctPix:{"x":96,"y":117,"v":[[96,100,104,86,94,111,107,115],[108,104,91,80,85,107,97,97],[107,107,96,91,86,108,100,96],[105,100,99,104,111,125,111,105],[100,93,108,119,107,111,105,111],[89,89,115,119,113,102,94,110]]},
  ctTex:["000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000","000000000000000111111111000000000000000000000000","000000000000011111111111110000000000000000000000","000000000001111111111111111100000000000000000000","000000000011111111011111111100000000000000000000","000000000111111111010111111000000000000000000000","000000001111111100111110000000000000000000000000","000000011111100111011000000000000000000000000000","000000011111110011011000000000000000000000000000","000000011111100001110000000000000000000000000000","000000111111110101010000000000000000000000000000","000000111111111111110000000000000000001100000000","000000111111111111100000000000000000001110000000","000000111111111111000000000000000000001111000000","000000111111111111000000000000000000001111000000","000000111111111111000000000000000000001111000000","000000011111111111000000000000000000001110000000","000000011111111110000000000000000000001110000000","000000001111111100000000000000000000001100000000","000000000011000000000000000000000000001000000000","000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000","000000000000000000000000000000000000000000000000"],
  liver:[[52.0,112.0],[55.9,101.4],[60.6,90.4],[66.5,80.3],[76.0,70.4],[85.2,64.1],[95.6,59.1],[106.9,55.1],[122.9,51.8],[136.5,50.4],[150.0,50.0],[163.7,50.6],[180.9,52.8],[193.3,55.3],[203.6,58.4],[212.4,62.2],[221.2,67.7],[226.4,72.4],[230.3,77.9],[232.3,83.3],[231.5,89.0],[227.3,92.3],[220.9,95.1],[213.7,97.4],[204.3,99.7],[195.7,100.8],[187.5,102.5],[180.8,105.9],[173.6,111.6],[168.9,117.3],[165.2,123.7],[163.1,131.3],[161.7,141.9],[160.0,150.0],[157.8,157.6],[155.3,165.1],[151.1,174.2],[146.2,181.5],[140.1,188.8],[133.3,195.6],[124.3,202.7],[116.5,207.9],[108.3,211.9],[100.0,214.0],[89.0,213.5],[80.1,211.1],[71.8,207.2],[64.8,201.8],[57.1,192.6],[52.0,184.3],[48.3,175.6],[45.7,166.0],[44.1,153.4],[44.1,143.6],[45.4,133.9],[47.8,124.3]],
  spleen:[[306.0,128.0],[310.9,128.2],[318.0,130.9],[324.2,134.7],[330.0,140.0],[333.6,145.7],[336.9,153.8],[338.8,161.4],[340.0,170.0],[339.9,177.7],[338.8,186.9],[336.9,194.6],[334.0,202.0],[330.6,207.4],[325.6,212.8],[321.0,216.2],[316.0,218.0],[311.8,217.5],[306.8,214.9],[302.9,211.2],[300.0,206.0],[299.4,200.2],[300.4,192.0],[301.6,184.3],[302.0,176.0],[300.8,169.2],[298.5,161.4],[296.7,154.8],[296.0,148.0],[296.9,142.1],[299.1,135.5],[301.9,130.8]],
  rgbPix:{"x":137,"y":102,"v":[[[133,119,93],[123,108,87],[123,108,89],[99,85,74],[65,51,48],[46,44,58],[115,130,169],[167,185,231]],[[135,117,95],[130,111,94],[126,111,92],[89,75,66],[54,42,44],[32,29,48],[57,76,109],[76,96,131]],[[131,118,99],[130,117,101],[124,107,99],[75,61,60],[34,30,31],[12,13,17],[11,19,22],[13,18,21]],[[130,119,99],[129,120,105],[116,109,101],[59,54,51],[20,18,19],[8,9,11],[6,10,11],[6,10,11]],[[129,116,99],[126,116,106],[113,103,101],[61,52,53],[23,17,17],[14,10,9],[13,12,10],[10,10,10]],[[130,114,99],[129,114,107],[107,95,95],[60,48,52],[23,14,15],[15,9,9],[8,7,2],[10,11,6]]]},
  catTex:["000000011111111111111100000000000","000000011111111111111010000000000","000001111111111111111111000000000","000011111111111111111111110000000","000011111111111111111111110000000","000011111111111111111111110000000","000111111111111111111111110000000","000101111110011111111111111000000","001111110000000101111111000000000","000100111100000101111111111000000","000001111111000011111110001000000","000000111111110011111110001000000","000000111111111011111110010000000","000000111111110001111111110000000","000000011111111100110110011000000","000000001111111100000111110000000","000010000011111000000111100000000","000111100001111000001111100000000","000000110111111000011101000000000","000011111111111111000011000000000","000000011111100111000001000000000","000001111111111111100000000000000","000000011111111111100000000000000","000000001011100000000000000000000","000000000000000000000000000000000"],
  catParts:{"earL":[40,32],"earR":[338,40],"eyeL":[147,112],"eyeR":[290,124],"nose":[236,238]},
  v1:{"x":139,"y":136,"c":[[18,0.41],[14,0.4],[179,0.47],[168,0.53],[173,0.44],[168,0.48],[153,0.79],[145,1],[12,1],[8,1],[0,0.95],[171,1],[174,1],[169,1],[158,1],[152,1],[14,0.89],[7,1],[1,1],[174,1],[172,1],[168,1],[160,0.83],[158,0.49],[23,1],[19,1],[15,1],[10,0.83],[2,0.75],[179,0.74],[176,0.73],[174,0.74],[22,1],[20,1],[17,1],[11,1],[4,1],[1,1],[180,1],[178,1],[25,0.33],[22,0.52],[15,0.76],[9,0.96],[5,1],[1,1],[3,1],[3,0.97]]},
  v4:[[118,98],[176,104],[147,79],[150,146],[124,132]],
  it:[[147,112,44],[290,124,34],[236,236,34]]
};

// Shared clock, in seconds. Low / mid / high are the three read-outs.
const TL = {
  mark:[.35, 1.1],        // a reticle on the spot we dive into
  zin:[1.1, 1.9],         // sudden zoom down to pixels
  low:[1.9, 4.7],
  z1:[4.7, 5.8],          // back out to the texture scale
  mid:[5.8, 8.6],
  z2:[8.6, 9.7],          // back out to the whole image
  high:[9.7, 12.5],
  agg:12.5,               // the three features combine
  fade:[16.4, 17.2], cycle:17.4
};
const FLY = [TL.low[1] - .95, TL.mid[1] - .95, TL.high[1] - .95], FLY_S = .7;
const STEPS = ['input', 'low-level', 'mid-level', 'high-level', 'visual semantic'];
const stageAt = t => t < TL.zin[0] ? 0 : t < TL.z1[0] ? 1 : t < TL.z2[0] ? 2 : t < TL.agg ? 3 : 4;

const clamp01 = x => x < 0 ? 0 : x > 1 ? 1 : x;
const ramp = (t, [a, b]) => clamp01((t - a) / (b - a));
const lerp = (a, b, u) => a + (b - a) * u;
const cubic = u => u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
const mean = a => a.flat().reduce((s, x) => s + x, 0) / a.flat().length;

// Colours drawn ON the images, which are dark in both palettes, so they do not
// follow the page theme. --dv-hi is read from CSS; the rest are image chrome.
const ON = { text:'rgba(255,255,255,.94)', textDark:'rgba(10,12,16,.86)', pill:'rgba(8,10,14,.74)',
             shade:'rgba(8,10,14,.42)', black:'#000' };
let HI = '141,177,238', MONO = 'monospace';
const hi = a => 'rgba(' + HI + ',' + a + ')';
function readTheme(){
  const cs = getComputedStyle(document.getElementById('chapters'));
  HI = cs.getPropertyValue('--dv-hi-rgb').trim() || HI;
  MONO = getComputedStyle(document.documentElement).getPropertyValue('--mono').trim() || MONO;
}

/* ---------------- what each window shows ---------------------------------- */
const ctMean = Math.round(mean(DATA.ctPix.v));
const px = DATA.rgbPix.v[2][4];
const SPEC = {
  med: {
    img:'ct.png', W:384, H:288,
    views:{ full:[192, 144, 384], deep:[DATA.ctPix.x + 4, DATA.ctPix.y + 3, 8], mid:[192, 140, 320] },
    caps:[['input', 'CT slice', 'abdomen · axial'],
          ['low-level', 'intensity', '≈ ' + ctMean + ' HU'],
          ['mid-level', 'texture', 'liver ≈ spleen'],
          ['high-level', 'shape · location', 'right upper abdomen'],
          ['visual semantic', 'Liver', 'intensity + texture + shape']],
    chips:['intensity', 'texture', 'shape · loc'],
    tiles:{ rows:DATA.ctTex, P:8 }, pill:[118, 132, 'liver'],
    aria:'An abdominal CT slice. The view zooms into single pixels and reads their intensity in Hounsfield units, '
       + 'zooms out to find tiles with the same texture, then outlines the liver by shape and location: the visual semantic "liver".'
  },
  nat: {
    img:'natural.png', W:400, H:300,
    views:{ full:[200, 150, 400], deep:[DATA.rgbPix.x + 4, DATA.rgbPix.y + 3, 8], mid:[200, 140, 300] },
    caps:[['input', 'RGB photograph', '400 × 300 px'],
          ['low-level', 'colour', 'RGB ' + px.join(' · ')],
          ['mid-level', 'texture', 'striped fur'],
          ['high-level', 'parts · layout', 'ears, eyes, nose'],
          ['visual semantic', 'Cat', 'colour + texture + parts']],
    chips:['colour', 'texture', 'parts'],
    tiles:{ rows:DATA.catTex, P:12 }, pill:[218, 182, 'cat'],
    aria:'A photograph of a cat. The view zooms into single pixels and reads their RGB values, zooms out to the striped '
       + 'fur texture, then links ears, eyes and nose into one layout: the visual semantic "cat".'
  },
  hum: {
    img:'retina.png', W:400, H:300,
    views:{ full:[200, 150, 400], deep:[DATA.v1.x + 12, DATA.v1.y + 9, 24], mid:[170, 130, 230] },
    caps:[['input', 'retina', 'foveated sampling'],
          ['low-level', 'V1 · orientation', 'oriented edges'],
          ['mid-level', 'V2 / V4 · contours', 'curvature, shape'],
          ['high-level', 'IT · object parts', 'eyes, nose, face'],
          ['visual semantic', 'Cat', 'orientation + contour + parts']],
    chips:['V1 edges', 'V4 contours', 'IT parts'],
    pill:[218, 182, 'cat'],
    aria:'The same cat as the retina samples it. The view zooms into V1-sized patches and shows their preferred edge '
       + 'orientation, zooms out to V2/V4 contours, then to IT responses on the eyes and nose: the visual semantic "cat".'
  }
};

/* ---------------- camera --------------------------------------------------- */
// Zoom about the one point that sits at the same place on screen in both views,
// with the width interpolated geometrically so the zoom speed feels even.
function zoom(A, B, u){
  const w = A[2] * Math.pow(B[2] / A[2], u);
  if (Math.abs(B[2] - A[2]) < 1e-6) return [lerp(A[0], B[0], u), lerp(A[1], B[1], u), w];
  const d = B[2] - A[2];
  const fx = (A[0] * B[2] - B[0] * A[2]) / d, fy = (A[1] * B[2] - B[1] * A[2]) / d;
  return [fx + (A[0] - fx) * w / A[2], fy + (A[1] - fy) * w / A[2], w];
}
function camera(V, t){
  if (t < TL.zin[0]) return V.full;
  if (t < TL.zin[1]) return zoom(V.full, V.deep, cubic(ramp(t, TL.zin)));
  if (t < TL.z1[0]) return V.deep;
  if (t < TL.z1[1]) return zoom(V.deep, V.mid, cubic(ramp(t, TL.z1)));
  if (t < TL.z2[0]) return V.mid;
  if (t < TL.z2[1]) return zoom(V.mid, V.full, cubic(ramp(t, TL.z2)));
  return V.full;
}

/* ---------------- drawing helpers (P maps image px -> screen px) ----------- */
function inImage(ctx, P, fn){
  ctx.save();
  ctx.setTransform(P.dpr * P.k, 0, 0, P.dpr * P.k, -P.sx * P.k * P.dpr, -P.sy * P.k * P.dpr);
  fn(1 / P.k);                                 // 1 screen px, in image px
  ctx.restore();
}
function smoothPath(ctx, pts){
  const n = pts.length, mid = i => [(pts[i][0] + pts[(i + 1) % n][0]) / 2, (pts[i][1] + pts[(i + 1) % n][1]) / 2];
  ctx.beginPath();
  const m0 = mid(n - 1); ctx.moveTo(m0[0], m0[1]);
  for (let i = 0; i < n; i++) { const m = mid(i); ctx.quadraticCurveTo(pts[i][0], pts[i][1], m[0], m[1]); }
  ctx.closePath();
}
function pathLen(pts){
  let L = 0;
  for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length]; L += Math.hypot(b[0] - a[0], b[1] - a[1]); }
  return L;
}
function font(size, weight){ return (weight || 400) + ' ' + size.toFixed(1) + 'px ' + MONO; }
function pill(ctx, x, y, s, a){
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.font = font(11, 500);
  const w = ctx.measureText(s).width + 16, h = 20;
  ctx.fillStyle = ON.pill; ctx.strokeStyle = hi(.95); ctx.lineWidth = 1;
  ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x - w / 2, y - h / 2, w, h, 3) : ctx.rect(x - w / 2, y - h / 2, w, h);
  ctx.fill(); ctx.stroke();
  ctx.fillStyle = hi(1); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(s, x, y + .5);
  ctx.restore();
}
function tag(ctx, x, y, s, a, align){
  if (a <= 0) return;
  ctx.save(); ctx.globalAlpha *= a;
  ctx.font = font(9.5, 500); ctx.textAlign = align || 'left'; ctx.textBaseline = 'middle';
  ctx.lineWidth = 3; ctx.strokeStyle = ON.pill; ctx.strokeText(s, x, y);
  ctx.fillStyle = hi(1); ctx.fillText(s, x, y);
  ctx.restore();
}
// Brackets around the spot the camera is about to dive into.
function reticle(ctx, P, x, y, w, h, t){
  const a = ramp(t, [TL.mark[0], TL.mark[0] + .25]) * (1 - ramp(t, [TL.zin[0] + .25, TL.zin[0] + .5]));
  if (a <= 0) return;
  const cx = P.X(x + w / 2), cy = P.Y(y + h / 2);
  const hw = Math.max(9, w * P.k / 2 + 3), hh = Math.max(7, h * P.k / 2 + 3), l = 4;
  ctx.save(); ctx.globalAlpha *= a; ctx.strokeStyle = hi(1); ctx.lineWidth = 1.4;
  ctx.beginPath();
  [[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([sx, sy]) => {
    const px_ = cx + sx * hw, py_ = cy + sy * hh;
    ctx.moveTo(px_ - sx * l, py_); ctx.lineTo(px_, py_); ctx.lineTo(px_, py_ - sy * l);
  });
  ctx.stroke(); ctx.restore();
}
// Pixel grid with a value printed in each pixel; only once pixels are big enough.
function pixelGrid(ctx, P, x0, y0, cols, rows, a, text, lum){
  if (a <= 0 || P.k < 9) return;
  const g = clamp01((P.k - 9) / 10) * a;
  ctx.save(); ctx.globalAlpha *= g;
  ctx.strokeStyle = hi(.75); ctx.lineWidth = 1;
  ctx.beginPath();
  for (let j = 0; j <= cols; j++) { const X = Math.round(P.X(x0 + j)) + .5; ctx.moveTo(X, P.Y(y0)); ctx.lineTo(X, P.Y(y0 + rows)); }
  for (let i = 0; i <= rows; i++) { const Y = Math.round(P.Y(y0 + i)) + .5; ctx.moveTo(P.X(x0), Y); ctx.lineTo(P.X(x0 + cols), Y); }
  ctx.stroke();
  const tA = clamp01((P.k - 22) / 8);
  if (tA > 0) {
    ctx.globalAlpha = ctx.globalAlpha * tA;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) {
      const lines = text(i, j), fs = Math.min(11, P.k * (lines.length > 1 ? .22 : .27));
      ctx.font = font(fs, 500);
      ctx.fillStyle = lum(i, j) > .55 ? ON.textDark : ON.text;
      const cx = P.X(x0 + j + .5), cy = P.Y(y0 + i + .5);
      lines.forEach((s, n) => ctx.fillText(s, cx, cy + (n - (lines.length - 1) / 2) * fs * 1.12));
    }
  }
  ctx.restore();
}

/* ---------------- texture tiles: ripple outward from the probed patch ------ */
function prepTiles(spec){
  const T = spec.tiles; if (!T) return;
  const [ox, oy] = spec.views.deep, R = T.rows, P = T.P;
  const on = (r, c) => r >= 0 && r < R.length && c >= 0 && c < R[0].length && R[r][c] === '1';
  T.list = [];
  for (let r = 0; r < R.length; r++) for (let c = 0; c < R[r].length; c++) {
    if (!on(r, c)) continue;
    const x = c * P, y = r * P, e = [];
    if (!on(r - 1, c)) e.push([x, y, x + P, y]);
    if (!on(r + 1, c)) e.push([x, y + P, x + P, y + P]);
    if (!on(r, c - 1)) e.push([x, y, x, y + P]);
    if (!on(r, c + 1)) e.push([x + P, y, x + P, y + P]);
    T.list.push({ x, y, e, d:Math.hypot(x + P / 2 - ox, y + P / 2 - oy) });
  }
}
function drawTiles(ctx, P, T, t, a){
  if (!T || a <= 0) return;
  inImage(ctx, P, px1 => {
    ctx.lineWidth = 1.2 * px1;
    T.list.forEach(q => {
      const u = clamp01((t - TL.mid[0] - .15 - q.d / 300) / .3) * a;
      if (u <= 0) return;
      ctx.fillStyle = hi(.26 * u); ctx.fillRect(q.x, q.y, T.P, T.P);
      if (q.e.length) {
        ctx.strokeStyle = hi(.95 * u); ctx.beginPath();
        q.e.forEach(s => { ctx.moveTo(s[0], s[1]); ctx.lineTo(s[2], s[3]); }); ctx.stroke();
      }
    });
  });
}

/* ---------------- per-domain overlays ------------------------------------- */
const aLow = t => ramp(t, [TL.zin[1] - .15, TL.zin[1] + .25]) * (1 - ramp(t, [TL.z1[0], TL.z1[0] + .35]));
const aMid = t => ramp(t, [TL.mid[0], TL.mid[0] + .2]) * (1 - .6 * ramp(t, [TL.high[0], TL.high[0] + .5]))
                * (1 - ramp(t, [TL.agg, TL.agg + .5]));
const aHigh = t => ramp(t, [TL.high[0], TL.high[0] + .3]);
const aAgg = t => ramp(t, [TL.agg, TL.agg + .6]);
const trace = t => cubic(ramp(t, [TL.high[0] + .1, TL.high[0] + 1.3]));

SPEC.med.draw = (ctx, P, t) => {
  const { x, y, v } = DATA.ctPix;
  reticle(ctx, P, x, y, 8, 6, t);
  pixelGrid(ctx, P, x, y, 8, 6, aLow(t), (i, j) => [String(v[i][j])], (i, j) => (v[i][j] + 160) / 400);
  drawTiles(ctx, P, SPEC.med.tiles, t, aMid(t));

  const h = aHigh(t), u = trace(t), ag = aAgg(t);
  if (h <= 0) return;
  inImage(ctx, P, px1 => {
    // location: the body's midlines, and the spleen ruled out by where it is
    ctx.globalAlpha = h * (1 - .5 * ag);
    ctx.strokeStyle = hi(.55); ctx.lineWidth = px1; ctx.setLineDash([3 * px1, 3 * px1]);
    ctx.beginPath(); ctx.moveTo(192, 22); ctx.lineTo(192, 268); ctx.moveTo(24, 144); ctx.lineTo(360, 144); ctx.stroke();
    smoothPath(ctx, DATA.spleen); ctx.strokeStyle = hi(.7); ctx.stroke();
    ctx.setLineDash([]);
    // shape: the liver outline, traced
    ctx.globalAlpha = 1;
    const L = pathLen(DATA.liver);
    if (ag > 0) { smoothPath(ctx, DATA.liver); ctx.fillStyle = hi(.42 * ag); ctx.fill(); }
    smoothPath(ctx, DATA.liver);
    ctx.setLineDash([L * u, L]); ctx.strokeStyle = hi(h); ctx.lineWidth = 2 * px1; ctx.stroke();
  });
  tag(ctx, P.X(30), P.Y(262), 'R', h * .9);
  tag(ctx, P.X(354), P.Y(262), 'L', h * .9, 'right');
  tag(ctx, P.X(318), P.Y(118), 'spleen', h * (1 - ag) * .9, 'center');
  pill(ctx, P.X(SPEC.med.pill[0]), P.Y(SPEC.med.pill[1]), SPEC.med.pill[2], ag);
};

SPEC.nat.draw = (ctx, P, t) => {
  const { x, y, v } = DATA.rgbPix;
  reticle(ctx, P, x, y, 8, 6, t);
  pixelGrid(ctx, P, x, y, 8, 6, aLow(t), (i, j) => v[i][j].map(String),
            (i, j) => (.299 * v[i][j][0] + .587 * v[i][j][1] + .114 * v[i][j][2]) / 255);
  drawTiles(ctx, P, SPEC.nat.tiles, t, aMid(t));

  const h = aHigh(t), u = trace(t), ag = aAgg(t), C = DATA.catParts;
  if (h <= 0) return;
  const E = [['earL', 'eyeL'], ['earR', 'eyeR'], ['eyeL', 'eyeR'], ['eyeL', 'nose'], ['eyeR', 'nose']];
  ctx.save();
  ctx.lineWidth = 1.6; ctx.strokeStyle = hi(.95);
  E.forEach(([a, b], i) => {
    const w = clamp01(u * E.length - i);
    if (w <= 0) return;
    ctx.beginPath(); ctx.moveTo(P.X(C[a][0]), P.Y(C[a][1]));
    ctx.lineTo(P.X(lerp(C[a][0], C[b][0], w)), P.Y(lerp(C[a][1], C[b][1], w))); ctx.stroke();
  });
  Object.keys(C).forEach(k => {
    ctx.fillStyle = hi(h); ctx.beginPath(); ctx.arc(P.X(C[k][0]), P.Y(C[k][1]), 3.4, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = ON.pill; ctx.lineWidth = 1; ctx.stroke();
  });
  ctx.restore();
  const lab = { earL:['ear', 8, 0], earR:['ear', -8, 0], eyeL:['eye', 0, -14], eyeR:['eye', 0, -14], nose:['nose', 0, 15] };
  Object.keys(lab).forEach(k => {
    const [s, dx, dy] = lab[k];
    tag(ctx, P.X(C[k][0]) + dx, P.Y(C[k][1]) + dy, s, h * (1 - ag), dx > 0 ? 'left' : dx < 0 ? 'right' : 'center');
  });
  pill(ctx, P.X(SPEC.nat.pill[0]), P.Y(SPEC.nat.pill[1]), SPEC.nat.pill[2], ag);
};

let contour = null;                            // ret-v4.png, tinted to --dv-hi
function tintContour(img){
  const c = document.createElement('canvas'); c.width = img.naturalWidth; c.height = img.naturalHeight;
  const g = c.getContext('2d');
  g.fillStyle = hi(1); g.fillRect(0, 0, c.width, c.height);
  g.globalCompositeOperation = 'destination-in'; g.drawImage(img, 0, 0);
  contour = c;
}
SPEC.hum.draw = (ctx, P, t) => {
  const V = DATA.v1, lo = aLow(t);
  reticle(ctx, P, V.x, V.y, 24, 18, t);
  // V1: one receptive field per 3 px, a bar along its preferred orientation
  if (lo > 0 && P.k > 4) {
    const g = lo * clamp01((P.k - 4) / 6);
    ctx.save(); ctx.globalAlpha *= g;
    ctx.fillStyle = ON.shade; ctx.fillRect(P.X(V.x), P.Y(V.y), 24 * P.k, 18 * P.k);
    V.c.forEach(([deg, amp], n) => {
      const r = Math.floor(n / 8), c = n % 8;
      const cx = P.X(V.x + c * 3 + 1.5), cy = P.Y(V.y + r * 3 + 1.5), R = 1.35 * P.k;
      const s = clamp01(amp * 1.7), th = deg * Math.PI / 180;
      ctx.strokeStyle = hi(.32); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.stroke();
      if (s < .08) return;
      const L = R * (.35 + .6 * s);
      ctx.strokeStyle = hi(.35 + .65 * s); ctx.lineWidth = 1.2 + 1.6 * s; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(cx - Math.cos(th) * L, cy - Math.sin(th) * L);
      ctx.lineTo(cx + Math.cos(th) * L, cy + Math.sin(th) * L); ctx.stroke();
    });
    ctx.restore();
  }
  // V2/V4: contours, spreading out from where V1 was probed
  const m = aMid(t);
  if (m > 0 && contour) {
    const [ox, oy] = SPEC.hum.views.deep, rr = 12 + 420 * cubic(ramp(t, [TL.mid[0], TL.mid[0] + 1.6]));
    inImage(ctx, P, () => {
      ctx.globalAlpha = m;
      ctx.beginPath(); ctx.arc(ox, oy, rr, 0, Math.PI * 2); ctx.clip();
      ctx.drawImage(contour, 0, 0);
    });
  }
  // IT: responses on the parts that make a face, then the face itself
  const h = aHigh(t), u = trace(t), ag = aAgg(t);
  if (h <= 0) return;
  inImage(ctx, P, px1 => {
    DATA.it.forEach(([x, y, r], i) => {
      const w = clamp01(u * 3 - i);
      if (w <= 0) return;
      ctx.beginPath(); ctx.arc(x, y, r, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * w);
      ctx.strokeStyle = hi(h); ctx.lineWidth = 2 * px1; ctx.stroke();
      ctx.fillStyle = hi(.14 * w * (1 + ag)); ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = h * clamp01(u * 3 - 2);
    ctx.setLineDash([4 * px1, 3 * px1]); ctx.strokeStyle = hi(.8); ctx.lineWidth = 1.2 * px1;
    ctx.beginPath(); ctx.ellipse(220, 165, 150, 128, 0, 0, Math.PI * 2); ctx.stroke();
  });
  [['eye', 0], ['eye', 1], ['nose', 2]].forEach(([s, i]) => {
    const [x, y, r] = DATA.it[i];
    tag(ctx, P.X(x), P.Y(y - r) - 8, s, h * clamp01(u * 3 - i) * (1 - ag), 'center');
  });
  tag(ctx, P.X(220), P.Y(40), 'face', h * clamp01(u * 3 - 2) * (1 - ag), 'center');
  pill(ctx, P.X(SPEC.hum.pill[0]), P.Y(SPEC.hum.pill[1]), SPEC.hum.pill[2], ag);
};
/* ---------------- DOM ----------------------------------------------------- */
const wrap = document.getElementById('chapters');
const cards = {};
Object.keys(SPEC).forEach(k => {
  const S = SPEC[k], D = DOMAINS[k];
  prepTiles(S);
  const c = document.createElement('div');
  c.className = 'chap'; c.dataset.dom = k; c.style.setProperty('--c', D.color);
  c.innerHTML =
      '<p class="ck"><span>' + D.rn + ' · <i class="nm">' + D.name + '</i><i class="abbr">' + D.short + '</i></span>'
    + '<span>' + D.years + '</span></p>'
    + '<div class="dv-win"><canvas role="img" aria-label="' + S.aria + '"></canvas>'
    +   '<p class="dv-step"><span class="dv-n"></span><span class="dv-d"></span></p></div>'
    + '<p class="dv-cap"><b></b><span></span></p>'
    + '<div class="dv-tray" aria-hidden="true">'
    +   S.chips.map(s => '<span class="dv-chip">' + s + '</span>').join('<i class="dv-plus">+</i>') + '</div>';
  c.addEventListener('click', () => setFocus(focus === k ? 'all' : k));
  wrap.appendChild(c);
  const img = new Image();
  img.onload = () => { cards[k].ready = true; draw(clock()); };
  img.src = IMG_BASE + 'dive/' + S.img;
  const cont = k === 'hum' ? new Image() : null;
  if (cont) { cont.onload = () => { tintContour(cont); draw(clock()); }; cont.src = IMG_BASE + 'dive/ret-v4.png'; }
  cards[k] = { el:c, S, img, cont, cv:c.querySelector('canvas'), ready:false,
               n:c.querySelector('.dv-n'), d:c.querySelector('.dv-d'),
               capB:c.querySelector('.dv-cap b'), capS:c.querySelector('.dv-cap span'),
               chips:[...c.querySelectorAll('.dv-chip')],
               plus:[...c.querySelectorAll('.dv-plus')], stage:-1, flown:[] };
});

/* ---------------- the shared space: every feature links into it ----------- */
// The common Visual Semantic Representation box holds three spaces, one per
// level. Each chip, as it lands in its tray, draws one line down into the space
// for its level, so low/mid/high features from all three domains meet there.
// Inside each space a domain has its own port (I, II, III left to right).
const SVGNS = 'http://www.w3.org/2000/svg', LINK_S = .55;
const thread = document.getElementById('thread'), hub = document.getElementById('vsr-hub');
const nEl = document.getElementById('vsr-n');
const lvls = [...document.querySelectorAll('#vsr-lvls .vsr-lvl')];
const lsvg = document.createElementNS(SVGNS, 'svg');
lsvg.setAttribute('class', 'vsr-links'); lsvg.setAttribute('aria-hidden', 'true');
thread.appendChild(lsvg);
const KEYS = Object.keys(cards);
const NFEAT = KEYS.reduce((n, k) => n + cards[k].chips.length, 0);
let nShown = -1;
// one mark per domain in each level space; it fills once that domain's link lands
const marks = lvls.map(lv => {
  const row = document.createElement('span');
  row.className = 'vsr-marks';
  lv.appendChild(row);
  return KEYS.map(k => {
    const m = document.createElement('i');
    m.className = 'vsr-mark'; m.textContent = DOMAINS[k].rn;
    row.appendChild(m);
    return m;
  });
});
KEYS.forEach((k, d) => {
  const C = cards[k], D = DOMAINS[k];
  C.links = C.chips.map((_, i) => {
    const path = document.createElementNS(SVGNS, 'path'), dot = document.createElementNS(SVGNS, 'circle');
    path.setAttribute('class', 'vsr-line'); dot.setAttribute('class', 'vsr-port'); dot.setAttribute('r', 2.6);
    path.style.stroke = D.color; dot.style.fill = D.color;
    lsvg.append(path, dot);
    return { path, dot, len:0, done:false, lvl:i, d, mark:marks[i] && marks[i][d] };
  });
});
function layoutLinks(){
  const T = thread.getBoundingClientRect();
  // stacked (one window per row): the lines would cross the other windows
  const stacked = getComputedStyle(wrap).gridTemplateColumns.trim().split(/\s+/).length < 2;
  lsvg.style.display = stacked ? 'none' : '';
  if (stacked || !T.width) return;
  lsvg.setAttribute('width', T.width); lsvg.setAttribute('height', T.height);
  lsvg.setAttribute('viewBox', '0 0 ' + T.width + ' ' + T.height);
  const all = [];
  KEYS.forEach(k => cards[k].chips.forEach((ch, i) => all.push([cards[k].links[i], ch.getBoundingClientRect()])));
  all.forEach(([L, r]) => {
    const B = lvls[L.lvl].getBoundingClientRect(), M = L.mark.getBoundingClientRect(), y1 = B.top - T.top;
    const x0 = r.left + r.width / 2 - T.left, y0 = r.bottom - T.top + 1;
    const x1 = M.left + M.width / 2 - T.left;          // right above that domain's mark
    const dy = Math.max(10, (y1 - y0) * .6);
    L.path.setAttribute('d', 'M' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' C' + x0.toFixed(1) + ' ' + (y0 + dy).toFixed(1)
                        + ' ' + x1.toFixed(1) + ' ' + (y1 - dy).toFixed(1) + ' ' + x1.toFixed(1) + ' ' + y1.toFixed(1));
    L.len = L.path.getTotalLength();
    L.path.style.strokeDasharray = L.len;
    L.dot.setAttribute('cx', x1.toFixed(1)); L.dot.setAttribute('cy', y1.toFixed(1));
  });
}
function hubChrome(){
  const n = Object.values(cards).reduce((s, C) => s + C.links.filter(L => L.done).length, 0);
  if (n === nShown) return;
  nShown = n;
  nEl.textContent = n + ' / ' + NFEAT;
  hub.classList.toggle('all-in', n === NFEAT);
  // a level space lights up once every domain has linked into it
  lvls.forEach((lv, i) => lv.classList.toggle('all-in', marks[i].every(m => m.classList.contains('in'))));
  hub.classList.remove('hit'); void hub.offsetWidth; if (n) hub.classList.add('hit');
}

/* ---------------- render ------------------------------------------------- */
let W = 0, H = 0, DPR = 1;
function size(){
  DPR = Math.min(2, window.devicePixelRatio || 1);
  Object.values(cards).forEach(C => {
    const r = C.cv.getBoundingClientRect();
    W = r.width; H = r.height;
    C.cv.width = Math.round(W * DPR); C.cv.height = Math.round(H * DPR);
  });
  layoutLinks();
}

function frame(C, t){
  const S = C.S, ctx = C.cv.getContext('2d');
  const [cx, cy, vw] = camera(S.views, t);
  // fit the view width to the window, keep image aspect
  const k = W / vw, sx = cx - W / k / 2, sy = cy - H / k / 2;
  const P = { k, sx, sy, dpr:DPR, X:x => (x - sx) * k, Y:y => (y - sy) * k };
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.fillStyle = ON.black; ctx.fillRect(0, 0, W, H);
  if (!C.ready) return;
  ctx.save();
  ctx.setTransform(DPR * k, 0, 0, DPR * k, -sx * k * DPR, -sy * k * DPR);
  ctx.imageSmoothingEnabled = k < 3;           // real pixels once we are in close
  ctx.drawImage(C.img, 0, 0, S.W, S.H);
  ctx.restore();
  ctx.imageSmoothingEnabled = true;
  S.draw(ctx, P, t);
  // the closing fade loops the story back to the plain image
  const f = ramp(t, TL.fade) * (1 - ramp(t, [TL.cycle - .15, TL.cycle]));
  if (f > 0) { ctx.fillStyle = 'rgba(0,0,0,' + (.85 * f) + ')'; ctx.fillRect(0, 0, W, H); }
}

function chrome(C, t){
  const st = stageAt(t);
  if (st !== C.stage) {
    C.stage = st;
    const [n, b, s] = C.S.caps[st];
    C.n.textContent = String(st).padStart(2, '0') + ' / 04';
    C.d.textContent = n;
    C.capB.textContent = b; C.capS.textContent = s;
    C.el.classList.toggle('sem', st === 4);
  }
  // chips: each feature lands in the tray once its level has been read
  C.chips.forEach((ch, i) => ch.classList.toggle('in', t >= FLY[i] + FLY_S && t < TL.fade[0]));
  C.plus.forEach((p, i) => p.classList.toggle('in', t >= FLY[i + 1] + FLY_S && t < TL.fade[0]));
  // and each one, once in the tray, draws its link down into its level's space
  C.links.forEach((L, i) => {
    const t1 = FLY[i] + FLY_S, u = t >= t1 ? cubic(clamp01((t - t1) / LINK_S)) : 0;
    const a = (1 - ramp(t, [TL.fade[0], TL.fade[0] + .4])) * (C.el.classList.contains('dim') ? .3 : 1);
    L.path.style.strokeDashoffset = L.len * (1 - u);
    L.path.style.opacity = u > 0 ? a : 0;
    L.dot.style.opacity = u >= 1 ? a : 0;
    L.done = u >= 1 && t < TL.fade[0];
    if (L.mark) L.mark.classList.toggle('in', L.done);
  });
  // and fly there from the window, as a ghost
  FLY.forEach((f0, i) => {
    const u = (t - f0) / FLY_S;
    if (u >= 0 && u < 1 && !C.flown[i]) { C.flown[i] = true; fly(C, i); }
    if (t < f0) C.flown[i] = false;
  });
}

function fly(C, i){
  if (REDUCED) return;
  const ch = C.chips[i], win = C.cv.getBoundingClientRect(), to = ch.getBoundingClientRect(), box = C.el.getBoundingClientRect();
  const g = document.createElement('span');
  g.className = 'dv-chip dv-ghost'; g.textContent = ch.textContent;
  C.el.appendChild(g);
  const x0 = win.left + win.width / 2 - box.left, y0 = win.top + win.height * .5 - box.top;
  const x1 = to.left + to.width / 2 - box.left, y1 = to.top + to.height / 2 - box.top;
  g.style.left = x0 + 'px'; g.style.top = y0 + 'px';
  g.animate([{ transform:'translate(-50%,-50%) scale(1.25)', opacity:0 },
             { transform:'translate(-50%,-50%) scale(1.25)', opacity:1, offset:.18 },
             { transform:'translate(calc(-50% + ' + (x1 - x0) + 'px),calc(-50% + ' + (y1 - y0) + 'px)) scale(1)', opacity:1 }],
            { duration:FLY_S * 1000, easing:'cubic-bezier(.5,0,.3,1)' }).onfinish = () => g.remove();
}

function draw(t){
  if (!W) size();
  Object.values(cards).forEach(C => { frame(C, t); chrome(C, t); });
  hubChrome();
}

/* ---------------- clock: runs only while on screen ------------------------ */
const REST = TL.agg + 1.6;                     // the still frame: everything combined
let t0 = 0, raf = 0, on = false;
const clock = () => REDUCED || !on ? REST : ((performance.now() - t0) / 1000) % TL.cycle;
function loop(){ draw(clock()); raf = requestAnimationFrame(loop); }
function start(){
  if (on || REDUCED) return;
  on = true; t0 = performance.now();
  Object.values(cards).forEach(C => { C.flown = []; });
  raf = requestAnimationFrame(loop);
}
function stop(){ on = false; cancelAnimationFrame(raf); draw(REST); }

readTheme(); size(); draw(REST);
if (window.ResizeObserver) new ResizeObserver(() => { layoutLinks(); draw(clock()); }).observe(thread);
if (document.fonts) document.fonts.ready.then(() => { layoutLinks(); draw(clock()); });
new IntersectionObserver(en => en.forEach(e => e.isIntersecting ? start() : stop()), { threshold:.3 }).observe(wrap);
document.addEventListener('visibilitychange', () => document.hidden ? stop() : wrap.getBoundingClientRect().top < innerHeight && start());
let rz = 0;
addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { size(); draw(clock()); }, 80); });
addEventListener('palettechange', () => {
  readTheme();
  const h = cards.hum; if (h.cont && h.cont.complete) tintContour(h.cont);
  draw(clock());
});
})();
