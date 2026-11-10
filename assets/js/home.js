/* ============================================================================
   DATA — the single source of truth for publications, news and the research map.

   `scholar` is the Google Scholar citation_for_view id. home-theme.js looks each
   one up in /citations.json (written monthly by google_scholar_crawler) and
   renders the count next to the paper.
   ============================================================================ */
const CATS = {
  brain:            'Brain Decoding',
  foundation:       'Foundation Models',
  'label-efficient':'Label-efficient',
  seg:              'Segmentation',
  interpret:        'Interpretability'
};

// The three chapters of the research thread. r = ring radius on the map.
const DOMAINS = {
  med: { rn:'I',   name:'Medical Images', short:'Medical', color:'var(--d-med)', r:184, years:'2022 —',
         sub:'scarce labels' },
  nat: { rn:'II',  name:'Natural Images', short:'Natural', color:'var(--d-nat)', r:276, years:'2024 —',
         sub:'open world' },
  hum: { rn:'III', name:'Human Vision',   short:'Human',   color:'var(--d-hum)', r:368, years:'2025 —',
         sub:'cortical code' }
};

// t = fractional year that places the paper on the time axis.
// me: 1 = first / co-first author, 0 = co-author.
const PUBS = [
  { id:'neuronspp', venue:'arXiv', year:2026, t:2026.77, dom:'hum', me:1, cats:['brain','interpret'], short:'Neurons++',
    // Journal extension of Neurons (ICCV 2025): adds image reconstruction.
    title:'Neurons++: A Unified Visual-Stream Framework for Image and Video Reconstruction from fMRI with Neural-to-Visual Interpretability',
    authors:[['Haonan Wang',1],['Yuchen Wang',0],['Jingyu Lu',0],['Qixiang Zhang',0],['Lehan Wang',0],['Xuanqi Huang',0],['Xiaomeng Li',0]],
    img:'NeuronsPP.jpg', links:[['Paper','https://arxiv.org/abs/2610.13763'],['Code','https://github.com/xmed-lab/NeuronsPlusPlus']] },
  { id:'semkey', venue:'arXiv', year:2026, t:2026.22, dom:'hum', me:0, cats:['brain'], short:'SemKey',
    title:'Escaping the BLEU Trap: A Signal-Grounded Framework with Decoupled Semantic Guidance for EEG-to-Text Decoding',
    authors:[['Yuchen Wang',0],['Haonan Wang',1],['Yu Guo',0],['Honglong Yang',0],['Xiaomeng Li',0]],
    img:'semkey.png', scholar:'KDNRnW0AAAAJ:YOwf2qJgpHMC', links:[['Paper','https://arxiv.org/abs/2603.03312'],['Code','https://github.com/xmed-lab/SemKey']] },
  { id:'vcflow', venue:'ICLR', year:2026, t:2026.05, dom:'hum', me:0, cats:['brain'], short:'VCFLOW',
    title:'A Cognitive Process-Inspired Architecture for Subject-Agnostic Brain Visual Decoding',
    authors:[['Jingyu Lu',0],['Haonan Wang',1],['Qixiang Zhang',0],['Xiaomeng Li',0]],
    img:'vcflow.png', scholar:'KDNRnW0AAAAJ:Zph67rFs4hoC', links:[['Paper','https://arxiv.org/abs/2511.02565'],['Code','https://github.com/xmed-lab/VCFLOW']] },
  { id:'zebra', venue:'NeurIPS', year:2025, t:2025.80, dom:'hum', me:1, cats:['brain'], short:'ZEBRA',
    title:'ZEBRA: Towards Zero-Shot Cross-Subject Generalization for Universal Brain Visual Decoding',
    authors:[['Haonan Wang',1],['Jingyu Lu',0],['Hongrui Li',0],['Xiaomeng Li',0]],
    img:'ZEBRA.png', doi:'10.52202/085713-0038', pages:'1165--1186', scholar:'KDNRnW0AAAAJ:KlAtU1dfN6UC', links:[['Paper','https://arxiv.org/abs/2510.27128'],['Code','https://github.com/xmed-lab/ZEBRA']] },
  { id:'unieval', venue:'arXiv', year:2025, t:2025.42, dom:'nat', me:0, cats:['foundation'], short:'UniEval',
    title:'UniEval: Unified Holistic Evaluation for Unified Multimodal Understanding and Generation',
    authors:[['Yi Li',0],['Haonan Wang',1],['Qixiang Zhang',0],['Boyu Xiao',0],['Chenchang Hu',0],['Hualiang Wang',0],['Xiaomeng Li',0]],
    img:'UniEval.png', scholar:'KDNRnW0AAAAJ:8k81kl-MbHgC', links:[['Paper','https://arxiv.org/abs/2505.10483'],['Code','https://github.com/xmed-lab/UniEval']] },
  { id:'xmedgpt', venue:'arXiv', year:2025, t:2025.62, dom:'med', me:0, cats:['foundation','interpret'], short:'XMedGPT',
    title:'Multi-Modal Explainable Medical AI Assistant for Trustworthy Human-AI Collaboration',
    authors:[['Honglong Yang',0],['Shanshan Song',0],['Yi Qin',0],['Lehan Wang',0],['Haonan Wang',1],['Xinpeng Ding',0],['Qixiang Zhang',0],['Bodong Du',0],['Xiaomeng Li',0]],
    // No Code link: the paper states "The code used in this study will be
    // publicly released after the manuscript is published."
    img:'xmedgpt.png', scholar:'KDNRnW0AAAAJ:5nxA0vEk-isC', links:[['Paper','https://arxiv.org/abs/2505.06898']] },
  { id:'rcmed', venue:'Nature Cancer', year:2026, t:2025.45, dom:'med', me:1, tag:'Accepted in Principle', note:'Accepted in principle', cats:['foundation','seg'], short:'SyRe',
    // Renamed on arXiv; the old title was "Reinforced Correlation Between
    // Vision and Language for Precise Medical AI Assistant". Accepted in
    // principle by Nature Cancer on 2026-11-05 (NATCANCER-A21239C); no DOI or
    // volume until it is published. t stays at the arXiv date.
    title:'Synergistic Vision-Language Reinforcement Enables Scalable On-Demand Analysis across Diverse Clinical Imaging Tasks',
    authors:[['Haonan Wang',1],['Jiaji Mao',0],['Lehan Wang',0],['Qixiang Zhang',0],['Marawan Elbatel',0],['Yi Qin',0],['Huijun Hu',0],['Baoxun Li',0],['Wenhui Deng',0],['Weifeng Qin',0],['Hongrui Li',0],['Jialin Liang',0],['Jun Shen',0],['Xiaomeng Li',0]],
    img:'SyRe.png', scholar:'KDNRnW0AAAAJ:UebtZRa9Y70C', links:[['Paper','https://arxiv.org/abs/2505.03380'],['Code','https://github.com/xmed-lab/SyRe']] },
  { id:'neurons', venue:'ICCV', year:2025, t:2025.50, dom:'hum', me:1, cats:['brain'], short:'Neurons',
    title:'Neurons: Emulating the Human Visual Cortex Improves Fidelity and Interpretability in fMRI-to-Video Reconstruction',
    authors:[['Haonan Wang',1,'†'],['Qixiang Zhang',0,'†'],['Lehan Wang',0],['Xuanqi Huang',0],['Xiaomeng Li',0]],
    img:'Neurons.png', doi:'10.1109/ICCV51701.2025.01707', pages:'18367--18376', scholar:'KDNRnW0AAAAJ:Se3iqnhoufwC', links:[['Paper','https://arxiv.org/abs/2503.11167'],['Code','https://github.com/xmed-lab/NEURONS']] },
  { id:'tam', venue:'ICCV', year:2025, t:2025.58, dom:'nat', me:0, award:1, tag:'Oral 0.57%', cats:['foundation','interpret'], short:'TAM',
    title:'Token Activation Map to Visually Explain Multimodal LLMs',
    authors:[['Yi Li',0],['Hualiang Wang',0],['Xinpeng Ding',0],['Haonan Wang',1],['Xiaomeng Li',0]],
    img:'TAM.png', doi:'10.1109/ICCV51701.2025.00012', pages:'48--58', scholar:'KDNRnW0AAAAJ:3fE2CSJIrl8C', links:[['Paper','https://arxiv.org/abs/2506.23270'],['Code','https://github.com/xmed-lab/TAM']] },
  { id:'medrega', venue:'ICLR', year:2025, t:2025.08, dom:'med', me:0, cats:['foundation','interpret'], short:'MedRegA',
    title:'Interpretable Bilingual Multimodal Large Language Model for Diverse Biomedical Tasks',
    authors:[['Lehan Wang',0],['Haonan Wang',1],['Honglong Yang',0],['Jiaji Mao',0],['Zehong Yang',0],['Jun Shen',0],['Xiaomeng Li',0]],
    img:'MedRegA.png', scholar:'KDNRnW0AAAAJ:_FxGoFyzp5QC', links:[['Paper','https://arxiv.org/abs/2410.18387'],['Code','https://github.com/xmed-lab/MedRegA']] },
  { id:'snd', venue:'TMI', year:2025, t:2025.30, dom:'med', me:1, cats:['seg','label-efficient'], short:'S&D',
    title:'S&amp;D Messenger: Exchanging Semantic and Domain Knowledge for Generic Semi-Supervised Medical Image Segmentation',
    authors:[['Qixiang Zhang',0,'†'],['Haonan Wang',1,'†'],['Xiaomeng Li',0]],
    img:'SND.png', doi:'10.1109/TMI.2025.3576163', vol:'44', num:'11', pages:'4487--4498', scholar:'KDNRnW0AAAAJ:MXK_kJrjxJIC', links:[['Paper','https://arxiv.org/abs/2407.07763'],['Code','https://github.com/xmed-lab/SD-Messenger']] },
  { id:'allspark', venue:'CVPR', year:2024, t:2024.15, dom:'nat', me:1, cats:['seg','label-efficient'], short:'AllSpark',
    title:'AllSpark: Reborn Labeled Features from Unlabeled in Transformer for Semi-Supervised Semantic Segmentation',
    authors:[['Haonan Wang',1,'†'],['Qixiang Zhang',0,'†'],['Yi Li',0],['Xiaomeng Li',0]],
    img:'allspark.jpg', doi:'10.1109/CVPR52733.2024.00348', pages:'3627--3636', scholar:'KDNRnW0AAAAJ:YsMSGLbcyi4C', links:[['Paper','https://arxiv.org/abs/2403.01818'],['Code','https://github.com/xmed-lab/AllSpark']] },
  { id:'and', venue:'NeurIPS', year:2023, t:2023.72, dom:'med', me:1, cats:['seg','label-efficient'], short:'GenericSSL',
    title:'Towards Generic Semi-Supervised Framework for Volumetric Medical Image Segmentation',
    authors:[['Haonan Wang',1],['Xiaomeng Li',0]],
    img:'AND.png', doi:'10.52202/075280-0088', pages:'1833--1848', scholar:'KDNRnW0AAAAJ:Y0pCki6q_DkC', links:[['Paper','https://proceedings.neurips.cc/paper_files/paper/2023/hash/05dc08730e32441edff52b0fa6caab5f-Abstract-Conference.html'],['Code','https://github.com/xmed-lab/GenericSSL']] },
  { id:'dhc', venue:'MICCAI', year:2023, t:2023.45, dom:'med', me:1, cats:['seg','label-efficient'], short:'DHC',
    title:'DHC: Dual-debiased Heterogeneous Co-training Framework for Class-imbalanced Semi-supervised Medical Image Segmentation',
    authors:[['Haonan Wang',1],['Xiaomeng Li',0]],
    img:'DHC.png', doi:'10.1007/978-3-031-43898-1_56', pages:'582--591', scholar:'KDNRnW0AAAAJ:Tyk-4Ss8FVUC', links:[['Paper','https://arxiv.org/abs/2307.11960'],['Code','https://github.com/xmed-lab/DHC']] },
  { id:'uctransnet', venue:'AAAI', year:2022, t:2022.12, dom:'med', me:1, award:1, tag:'Top-1 Influential', cats:['seg'], short:'UCTransNet',
    title:'UCTransNet: Rethinking the Skip Connections in U-Net from a Channel-wise Perspective with Transformer',
    authors:[['Haonan Wang',1],['Peng Cao',0],['Jiaqi Wang',0],['Osmar R. Zaiane',0]],
    img:'UCTransNet.png', doi:'10.1609/aaai.v36i3.20144', vol:'36', num:'3', pages:'2441--2449', scholar:'KDNRnW0AAAAJ:2osOgNQ5qMEC', links:[['Paper','https://ojs.aaai.org/index.php/AAAI/article/view/20144'],['Code','https://github.com/McGregorWwww/UCTransNet']] }
];

// Ideas that cross between domains — drawn as dashed chords on the map.
const LINKS = [
  ['dhc','allspark',   'semi-supervised segmentation'],
  ['snd','allspark',   'labelled ↔ unlabelled features'],
  ['medrega','tam',    'interpretability'],
  ['rcmed','unieval',  'vision–language alignment'],
  ['tam','neurons',    'interpretable representation'],
  ['zebra','vcflow',   'subject-agnostic decoding'],
  ['neurons','neuronspp', 'image + video'],
];

const IMG_BASE = (window.HOME_CONFIG && window.HOME_CONFIG.imgBase) || '/images/';

// owner/name of the paper's Code link. home-theme.js looks the star count up
// in citations.json, which the monthly crawler fills from the GitHub API.
function repoOf(p){
  const link = (p.links || []).find(l => /github\.com/i.test(l[1]));
  if (!link) return null;
  const m = link[1].match(/github\.com\/([^\/]+)\/([^\/#?]+)/i);
  return m ? m[1] + '/' + m[2].replace(/\.git$/, '') : null;
}

const PUB = Object.fromEntries(PUBS.map(p => [p.id, p]));
const byDom = d => PUBS.filter(p => p.dom === d);
/* ============================================================================
   MAP GEOMETRY — polar: angle = time (left → right), radius = domain ring
   ============================================================================ */
const CX = 470, CY = 470, CORE = 92;
const T0 = 2022.0, T1 = 2026.9;

// Piecewise time → angle. 2025 gets the widest slice because it is the densest year.
const T_KNOTS = [[2022.0,178],[2023.0,150],[2024.0,124],[2025.0,99],[2026.0,28],[2026.9,8]];
function angleOf(t){
  for (let i = 1; i < T_KNOTS.length; i++) {
    const [t0,a0] = T_KNOTS[i-1], [t1,a1] = T_KNOTS[i];
    if (t <= t1) return a0 + (a1 - a0) * (t - t0) / (t1 - t0);
  }
  return T_KNOTS[T_KNOTS.length-1][1];
}
const rad = d => d * Math.PI / 180;
const polar = (r, deg) => [CX + r * Math.cos(rad(deg)), CY - r * Math.sin(rad(deg))];
const f1 = n => Math.round(n * 10) / 10;

// The main thread: radius over time. Holds on a ring, then swoops to the next.
const R_KNOTS = [[2022.0,184],[2023.75,184],[2024.15,276],[2025.12,282],[2025.5,368],[2026.9,368]];
const smooth = x => x * x * (3 - 2 * x);
function threadR(t){
  for (let i = 1; i < R_KNOTS.length; i++) {
    const [t0,r0] = R_KNOTS[i-1], [t1,r1] = R_KNOTS[i];
    if (t <= t1) return r0 + (r1 - r0) * smooth((t - t0) / (t1 - t0));
  }
  return R_KNOTS[R_KNOTS.length-1][1];
}

// Which side of the dot each label sits on (radially), chosen to avoid collisions.
const LBL_SIDE = { uctransnet:'out', dhc:'out', and:'out', allspark:'out',
                   medrega:'in', snd:'in', rcmed:'in', xmedgpt:'in',
                   unieval:'in', tam:'in',
                   neurons:'out', zebra:'out', vcflow:'out', semkey:'out', neuronspp:'out' };

const NS = 'http://www.w3.org/2000/svg';
function el(tag, attrs, parent){
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) {
    const v = attrs[k];
    // var() is reliable in style, not in presentation attributes (Safari)
    if (typeof v === 'string' && v.includes('var(') && (k === 'fill' || k === 'stroke' || k === 'stop-color'))
      e.style.setProperty(k, v);
    else e.setAttribute(k, v);
  }
  if (parent) parent.appendChild(e);
  return e;
}
const arcPath = r => {
  const [x0,y0] = polar(r, 180), [x1,y1] = polar(r, 0);
  return `M${f1(x0)} ${f1(y0)} A${r} ${r} 0 0 1 ${f1(x1)} ${f1(y1)}`;
};

/* ============================================================================
   MAP BUILD
   ============================================================================ */
const svg = document.getElementById('map');
const nodeEls = {}, rayEls = {}, linkEls = [], bandEls = {}, laneEls = {};
let threadPath, threadLen = 0, samples = [], spark, sweep;

function buildMap(){
  const defs = el('defs', {}, svg);
  const g = el('linearGradient', { id:'thread-grad', gradientUnits:'userSpaceOnUse',
    x1: CX - 360, y1: 0, x2: CX + 360, y2: 0 }, defs);
  el('stop', { offset:'0',   'stop-color': DOMAINS.med.color }, g);
  el('stop', { offset:'.45', 'stop-color': DOMAINS.nat.color }, g);
  el('stop', { offset:'1',   'stop-color': DOMAINS.hum.color }, g);
  const cg = el('radialGradient', { id:'core-grad', cx:'50%', cy:'100%', r:'100%' }, defs);
  el('stop', { offset:'0', 'stop-color':'var(--core-a)' }, cg);
  el('stop', { offset:'1', 'stop-color':'var(--core-b)' }, cg);
  const glow = el('filter', { id:'glow', x:'-100%', y:'-100%', width:'300%', height:'300%' }, defs);
  el('feGaussianBlur', { stdDeviation:'2.4', result:'b' }, glow);
  const m = el('feMerge', {}, glow);
  el('feMergeNode', { in:'b' }, m); el('feMergeNode', { in:'SourceGraphic' }, m);

  // year ticks
  for (let y = 2022; y <= 2026; y++) {
    const a = angleOf(y === 2022 ? 2022.02 : y);
    const tk = el('g', { class:'tick' }, svg);
    const [x0,y0] = polar(CORE + 8, a), [x1,y1] = polar(428, a);
    el('line', { x1:f1(x0), y1:f1(y0), x2:f1(x1), y2:f1(y1), 'stroke-dasharray':'1 6' }, tk);
    const [tx,ty] = polar(452, a);
    el('text', { x:f1(tx), y:f1(ty + 4), 'text-anchor':'middle' }, tk).textContent = y;
  }
  el('line', { x1: CX - 418, y1: CY, x2: CX + 418, y2: CY, stroke:'var(--rule)' }, svg);

  // domain rings
  Object.entries(DOMAINS).forEach(([k, d]) => {
    const grp = el('g', { 'data-dom':k }, svg);
    el('path', { d:arcPath(d.r), class:'arc-band', stroke:d.color, 'stroke-width':30, opacity:.07 }, grp);
    el('path', { d:arcPath(d.r), class:'arc-line', stroke:d.color, opacity:.5 }, grp);
    bandEls[k] = grp;

    // lane label at the left foot of each ring
    const lg = el('g', { class:'lane-lbl', 'data-dom':k, style:'cursor:pointer' }, svg);
    const x = CX - d.r;
    el('text', { x, y: CY + 16, class:'rn', 'text-anchor':'middle', fill:d.color }, lg).textContent = d.rn;
    el('text', { x, y: CY + 38, class:'nm', 'text-anchor':'middle' }, lg).textContent = d.short;
    el('text', { x, y: CY + 54, class:'ds', 'text-anchor':'middle' }, lg).textContent = d.sub;
    lg.addEventListener('click', () => setFocus(k));
    laneEls[k] = lg;
  });
  // rays from the core to each paper (shown on hover / focus)
  const rays = el('g', {}, svg);
  PUBS.forEach(p => {
    const a = angleOf(p.t), r = DOMAINS[p.dom].r;
    const [x0,y0] = polar(CORE + 4, a), [x1,y1] = polar(r - 7, a);
    rayEls[p.id] = el('line', { x1:f1(x0), y1:f1(y0), x2:f1(x1), y2:f1(y1), class:'ray',
                                stroke:DOMAINS[p.dom].color }, rays);
  });

  // cross-domain idea links: quadratic chords bowed toward the core
  const lg = el('g', { id:'links' }, svg);
  LINKS.forEach(([a, b, label]) => {
    const pa = PUB[a], pb = PUB[b];
    const [ax,ay] = polar(DOMAINS[pa.dom].r, angleOf(pa.t));
    const [bx,by] = polar(DOMAINS[pb.dom].r, angleOf(pb.t));
    const mx = (ax + bx) / 2, my = (ay + by) / 2;
    const qx = CX + (mx - CX) * .78, qy = CY + (my - CY) * .78;
    const path = el('path', { d:`M${f1(ax)} ${f1(ay)} Q${f1(qx)} ${f1(qy)} ${f1(bx)} ${f1(by)}`,
                              class:'link', stroke:'var(--accent)' }, lg);
    const lx = .25 * ax + .5 * qx + .25 * bx, ly = .25 * ay + .5 * qy + .25 * by;
    const txt = el('text', { x:f1(lx), y:f1(ly - 5), class:'link-lbl', 'text-anchor':'middle',
                             fill:'var(--accent)' }, lg);
    txt.textContent = label;
    linkEls.push({ a, b, path, txt });
  });

  // main thread — sampled so we can map time ↔ arc length
  let d = '', len = 0, prev = null;
  for (let t = T0; t <= T1 + 1e-9; t += 0.01) {
    const [x,y] = polar(threadR(t), angleOf(t));
    if (prev) len += Math.hypot(x - prev[0], y - prev[1]);
    samples.push({ t, x, y, len });
    d += (prev ? 'L' : 'M') + f1(x) + ' ' + f1(y);
    prev = [x, y];
  }
  threadLen = len;
  el('path', { d, id:'thread-ghost' }, svg);
  threadPath = el('path', { d, id:'thread-path' }, svg);
  threadPath.style.strokeDasharray = threadLen;

  // "next?" — the thread keeps going
  const [ex,ey] = polar(368, angleOf(T1));
  const [nx,ny] = polar(414, -2);
  el('path', { d:`M${f1(ex)} ${f1(ey)} Q${f1(CX + 400)} ${f1(CY - 70)} ${f1(nx)} ${f1(ny)}`, id:'thread-next' }, svg);
  el('text', { x:f1(nx - 6), y:f1(ny - 10), class:'next-lbl', 'text-anchor':'end' }, svg).textContent = 'next?';

  // nodes
  const ng = el('g', { id:'nodes' }, svg);
  PUBS.forEach(p => {
    const D = DOMAINS[p.dom], a = angleOf(p.t), [x,y] = polar(D.r, a);
    const g = el('g', { class:'node', 'data-id':p.id, 'data-dom':p.dom, tabindex:0, role:'button',
                        'aria-label':p.short + ', ' + p.venue + ' ' + p.year }, ng);
    const pin = el('g', { class:'pin' }, g);
    el('circle', { cx:f1(x), cy:f1(y), r:13, class:'halo', fill:D.color }, pin);
    if (p.award) el('circle', { cx:f1(x), cy:f1(y), r:9.5, fill:'none', stroke:D.color, 'stroke-width':.9 }, pin);
    el('circle', { cx:f1(x), cy:f1(y), r:p.me ? 6 : 5, class:'dot',
                   fill:p.me ? D.color : 'var(--surface)', stroke:D.color, 'stroke-width':p.me ? 0 : 1.8 }, pin);

    // radial label, flipped on the left half so it always reads left → right
    const out = LBL_SIDE[p.id] !== 'in';
    const [lx,ly] = polar(D.r + (out ? 13 : -13), a);
    const left = a > 90;
    const rot = left ? 180 - a : -a;
    const anchor = (out !== left) ? 'start' : 'end';
    el('text', { x:f1(lx), y:f1(ly), class:'lbl', 'text-anchor':anchor, 'dominant-baseline':'middle',
                 transform:`rotate(${f1(rot)} ${f1(lx)} ${f1(ly)})` }, g).textContent = p.short;

    g.addEventListener('mouseenter', () => hoverPaper(p.id));
    g.addEventListener('mouseleave', () => hoverPaper(null));
    g.addEventListener('focus', () => hoverPaper(p.id));
    g.addEventListener('blur', () => hoverPaper(null));
    g.addEventListener('click', () => jumpToPub(p.id));
    g.addEventListener('keydown', e => { if (e.key === 'Enter') jumpToPub(p.id); });
    nodeEls[p.id] = g;
  });

  // core — a half iris on the baseline. Under it, a light neck runs off the
  // bottom of the map into the shared .vsr box (same light fill), so disc,
  // neck and box read as one shape while only the disc is dark.
  const core = el('g', { id:'map-core' }, svg);
  const half = r => `M${CX - r} ${CY} A${r} ${r} 0 0 1 ${CX + r} ${CY}`;
  const BOT = +svg.getAttribute('viewBox').split(' ')[3] + 2, FIL = 14;   // 2 past the edge: no seam
  const L = CX - CORE, R = CX + CORE;
  el('path', { d:`M${L} ${CY}L${R} ${CY}L${R} ${BOT - FIL}Q${R} ${BOT} ${R + FIL} ${BOT}`
               + `L${L - FIL} ${BOT}Q${L} ${BOT} ${L} ${BOT - FIL}Z`, class:'core-neck' }, core);
  el('path', { d:half(CORE + 40) + 'Z', class:'core-glow' }, core);
  el('path', { d:half(CORE + 26), class:'core-pulse' }, core);
  el('path', { d:half(CORE + 26), class:'core-pulse b' }, core);
  el('path', { d:half(CORE + 11), class:'core-ring', 'stroke-dasharray':'2 3', opacity:.7 }, core);
  el('path', { d:half(CORE) + 'Z', fill:'url(#core-grad)', class:'core-disc' }, core);
  el('path', { d:half(CORE - 7), class:'core-inner' }, core);
  // flashes when all nine features have reached the box below (home-dive.js)
  el('path', { d:half(CORE + 4), class:'core-flash' }, core);
  // one face for all three lines: same serif, size, weight and colour
  [['Visual', -60], ['Semantic', -36], ['Representation', -12]].forEach(([s, dy]) => {
    el('text', { x:CX, y:CY + dy, class:'core-big' }, core).textContent = s;
  });

  // sweep hand + travelling spark
  sweep = el('line', { x1:CX, y1:CY, x2:CX, y2:CY, id:'sweep' }, svg);
  spark = el('circle', { r:4, cx:-20, cy:-20, id:'spark' }, svg);
}
/* ============================================================================
   MAP STATE — focus (a domain or 'all'), hover (a paper), links toggle
   ============================================================================ */
let focus = 'all', showAllLinks = false, playing = false;
const hcard = document.getElementById('hcard');
const HINT = '<p class="hk">How to read this</p>'
  + '<p class="hint"><b>Angle is time</b>, 2022 on the left to today on the right. '
  + '<b>Rings are domains</b>: medical images inside, natural images in the middle, human vision outside.</p>'
  + '<p class="hint" style="margin-top:8px">The coloured line is my own thread through them. Hover a dot for the paper; click to jump to it.</p>'
  // the card is now as tall as the map's upper half, so the idle state gets a
  // per-ring count and a tally along its bottom edge
  + '<ul class="hdoms">'
  + Object.entries(DOMAINS).map(([k, D]) => '<li><i style="background:' + D.color + '"></i>'
      + D.rn + ' · ' + D.name + '<b>' + byDom(k).length + '</b></li>').join('')
  + '</ul>'
  + '<div class="htally"></div>';

// The tally is the whole record, not the map: the page only lists selected
// papers, so the counts come from the full Scholar profile (citations.json,
// classified by the crawler). Until that arrives -- or if it never does --
// fall back to the selected list, and say so.
function tallyHTML(){
  const S = window.HOME && HOME.metrics && HOME.metrics.summary;
  const cell = (n, k) => '<span><b>' + n + '</b>' + k + '</span>';
  if (!S) return cell(PUBS.length, 'selected')
    + cell(PUBS.filter(p => p.me).length, 'first / co-first');
  return cell(S.papers, 'papers') + cell(S.lead, 'first / co-first')
    + '<p class="hkinds">' + [[S.conference, 'conference'], [S.journal, 'journal'], [S.preprint, 'preprint']]
        .map(([n, k]) => '<i><b>' + n + '</b>' + k + '</i>').join('') + '</p>';
}

function showHint(){
  hcard.classList.remove('live');
  hcard.innerHTML = HINT;
  hcard.querySelector('.htally').innerHTML = tallyHTML();
  fitHint();
}

// The card is only as tall as the map's upper half, which shrinks with the
// viewport (down to ~270px at 900px wide) while the idle text does not. Shed
// blocks until it fits, least useful first: the ring counts (the lane labels
// under the map already say which ring is which), then the second paragraph.
// The tally stays: it is the one thing on the card the page shows nowhere else.
function fitHint(){
  if (hcard.classList.contains('live')) return;
  const drop = [hcard.querySelector('.hdoms'), hcard.querySelector('.hint + .hint')];
  // inline display, not the `hidden` attribute: .hdoms is display:flex, which
  // outranks the UA's [hidden] rule, so `hidden` would silently do nothing
  drop.forEach(el => el && (el.style.display = ''));
  for (const el of drop) {
    if (hcard.scrollHeight <= hcard.clientHeight) return;
    if (el) el.style.display = 'none';
  }
}
// citations.json lands after the first paint; redraw the idle card if it is up
addEventListener('metricsready', () => { if (!hcard.classList.contains('live')) showHint(); });

function roleOf(p){
  const me = p.authors.find(a => a[0] === 'Haonan Wang');
  if (me && me[2]) return 'co-first author';
  return p.authors[0][0] === 'Haonan Wang' ? 'first author' : 'co-author';
}

// `mapOnly`: the story's sweep moves the focus ring to ring, but that is about
// the map. The windows and the shared box below run all three domains in step,
// so they stay at full strength instead of fading in one domain at a time.
function setFocus(k, mapOnly){
  focus = k;
  document.querySelectorAll('#thread-ctrl .tbtn[data-focus]').forEach(b =>
    b.classList.toggle('on', b.dataset.focus === k));
  Object.entries(nodeEls).forEach(([id, n]) =>
    n.classList.toggle('dim', k !== 'all' && PUB[id].dom !== k));
  Object.entries(bandEls).forEach(([d, b]) => {
    b.classList.toggle('dimmed', k !== 'all' && d !== k);
    b.querySelector('.arc-band').setAttribute('stroke-width', d === k ? 44 : 30);
    b.querySelector('.arc-band').setAttribute('opacity', d === k ? .13 : .07);
  });
  Object.entries(laneEls).forEach(([d, l]) => l.classList.toggle('dimmed', k !== 'all' && d !== k));
  Object.entries(rayEls).forEach(([id, r]) => r.classList.toggle('on', k !== 'all' && PUB[id].dom === k));
  const below = mapOnly ? 'all' : k;
  document.querySelectorAll('.chap').forEach(c => {
    c.classList.toggle('on', c.dataset.dom === below);
    c.classList.toggle('dim', below !== 'all' && c.dataset.dom !== below);
  });
  document.querySelectorAll('.vsr-cell, .vsr-col').forEach(m => {
    m.classList.toggle('on', m.dataset.dom === below);
    m.classList.toggle('dim', below !== 'all' && m.dataset.dom !== below);
  });
}

function hoverPaper(id){
  Object.values(nodeEls).forEach(n => n.classList.remove('hot'));
  Object.entries(rayEls).forEach(([rid, r]) =>
    r.classList.toggle('on', rid === id || (!id && focus !== 'all' && PUB[rid].dom === focus)));
  linkEls.forEach(L => {
    const on = id && (L.a === id || L.b === id);
    L.path.classList.toggle('on', !!on);
    L.txt.classList.toggle('on', !!on);
  });

  if (!id) { showHint(); return; }
  const p = PUB[id], D = DOMAINS[p.dom];
  nodeEls[id].classList.add('hot');
  const related = linkEls.filter(L => L.a === id || L.b === id)
    .map(L => PUB[L.a === id ? L.b : L.a].short);
  // citation / star counts arrive later from citations.json (home-theme.js)
  const M = (window.HOME && window.HOME.metrics) || {}, repo = repoOf(p);
  const rec = p.scholar && M.publications && M.publications[p.scholar];
  const stars = repo && M.stars && M.stars[repo];
  const nums = [rec && rec.cites > 0 ? 'cited by <b>' + rec.cites + '</b>' : '',
                typeof stars === 'number' ? '★ <b>' + stars + '</b>' : ''].filter(Boolean);
  hcard.classList.add('live');
  hcard.innerHTML =
    '<img class="himg" src="' + IMG_BASE + p.img + '" alt="" />'
    + '<p class="hk" style="color:' + D.color + '">' + D.rn + ' · ' + D.short + ' · ' + p.venue + ' ' + p.year + '</p>'
    + '<p class="ht">' + p.title + '</p>'
    + '<p class="ha">' + p.authors.map(authorHTML).join(', ') + '</p>'
    + '<p class="hm">' + roleOf(p) + (p.tag ? ' · <span class="htag">' + p.tag + '</span>' : '')
    + (related.length ? '<br>links to ' + related.join(', ') : '') + '</p>'
    + '<div class="hcats">' + p.cats.map(c => '<span>' + CATS[c] + '</span>').join('') + '</div>'
    + '<p class="hf"><span>' + nums.join(' · ') + '</span><span>click to read ↓</span></p>';
  fitCard();
}

/* ============================================================================
   CARD FIT — the card's height is fixed (it is a grid row in .stage), so the
   two blocks that exist to be read -- the title and the author list -- have to
   be told how many lines are left over for them. Measuring the laid-out card
   does not work: once the content overflows, the flex column squeezes the rows
   and the geometry stops meaning anything. So weigh the content in an offscreen
   copy where nothing is clamped, then spend the room top down: title first, the
   author list with what is left.
   ============================================================================ */
const TITLE_LH = 1.4, AUTH_LH = 1.42;      // keep in step with _home.scss

function fitCard(){
  const probe = hcard.cloneNode(true);
  const ht = probe.querySelector('.ht'), ha = probe.querySelector('.ha');
  if (!ht || !ha) return;
  probe.setAttribute('aria-hidden', 'true');
  probe.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;height:auto;'
    + 'width:' + hcard.getBoundingClientRect().width + 'px';
  ht.style.webkitLineClamp = 'none';
  ha.style.webkitLineClamp = 'none';
  document.body.appendChild(probe);

  const cs = getComputedStyle(hcard);
  const inner = hcard.getBoundingClientRect().height - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
  const titleSize = parseFloat(getComputedStyle(ht).fontSize);
  const authSize = parseFloat(getComputedStyle(ha).fontSize);
  const titleFull = ht.getBoundingClientRect().height;
  const authFull = ha.getBoundingClientRect().height;
  let fixed = 0;
  for (const c of probe.children) {
    if (c === ht || c === ha) continue;
    const s = getComputedStyle(c);
    fixed += c.getBoundingClientRect().height + parseFloat(s.marginTop) + parseFloat(s.marginBottom);
  }
  const titleLH = titleSize * TITLE_LH, authLH = authSize * AUTH_LH;
  const titleLines = Math.max(1, Math.round(titleFull / titleLH));
  const authLines = Math.max(1, Math.round(authFull / authLH));
  // read the margins while the probe is still in the document: getComputedStyle
  // on a detached node returns nothing, and NaN would sink the whole fit
  const gap = parseFloat(getComputedStyle(ht).marginBottom) + parseFloat(getComputedStyle(ha).marginBottom);
  probe.remove();
  // four title lines are worth showing when the paper's title needs them; the
  // author list is the elastic one, down to a single ellipsised line
  const want = Math.min(titleLines, titleFull > 3 * titleLH ? 4 : 3);
  for (let t = want; t >= 1; t--) {
    const forAuth = inner - fixed - gap - t * titleLH;
    const a = Math.min(authLines, Math.floor((forAuth + 1) / authLH));
    if (a >= 1 || t === 1) {
      // the card's own blocks, not the probe's
      hcard.querySelector('.ht').style.webkitLineClamp = t;
      hcard.querySelector('.ha').style.webkitLineClamp = Math.max(1, a);
      return;
    }
  }
}

// The cards under the map (one diving window per domain) live in home-dive.js.

/* ============================================================================
   PLAY THE STORY — a sweep hand walks 2022 → now, drawing the thread
   ============================================================================ */
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const PLAY_MS = 7600;
let playStart = 0, rafId = 0, played = false;

function sampleAt(t){
  const i = Math.max(0, Math.min(samples.length - 1, Math.round((t - T0) / 0.01)));
  return samples[i];
}
function domAtRadius(r){ return r < 230 ? 'med' : r < 322 ? 'nat' : 'hum'; }

function startPlay(){
  cancelAnimationFrame(rafId);
  playing = true; played = true;
  document.getElementById('play').classList.add('running');
  document.getElementById('play').textContent = '■ Stop';
  Object.values(nodeEls).forEach(n => { n.classList.add('pend'); n.classList.remove('pop'); });
  threadPath.style.strokeDashoffset = threadLen;
  sweep.classList.add('on');
  playStart = performance.now();
  rafId = requestAnimationFrame(playFrame);
}

function playFrame(now){
  const u = Math.min(1, (now - playStart) / PLAY_MS);
  const e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;   // ease in-out
  const t = T0 + e * (T1 - T0);
  const s = sampleAt(t);

  threadPath.style.strokeDashoffset = threadLen - s.len;
  const [sx, sy] = polar(425, angleOf(t));
  sweep.setAttribute('x2', f1(sx)); sweep.setAttribute('y2', f1(sy));
  spark.setAttribute('cx', f1(s.x)); spark.setAttribute('cy', f1(s.y));

  // narrow screens: the map scrolls sideways, so keep the spark in view
  const mw = document.querySelector('.map-wrap');
  if (mw.scrollWidth > mw.clientWidth + 4) {
    mw.scrollLeft = (s.x / 940) * mw.scrollWidth - mw.clientWidth / 2;
  }

  PUBS.forEach(p => {
    const n = nodeEls[p.id];
    if (p.t <= t && n.classList.contains('pend')) { n.classList.remove('pend'); n.classList.add('pop'); }
  });
  const d = domAtRadius(threadR(t));
  if (focus !== d) setFocus(d, true);

  if (u < 1 && playing) rafId = requestAnimationFrame(playFrame);
  else finishPlay();
}

function finishPlay(){
  playing = false;
  cancelAnimationFrame(rafId);
  const b = document.getElementById('play');
  b.classList.remove('running'); b.textContent = '▶ Play the story';
  Object.values(nodeEls).forEach(n => n.classList.remove('pend'));
  threadPath.style.strokeDashoffset = 0;
  sweep.classList.remove('on');
  setFocus('all');
  played = true;
  idleStart = performance.now();
  rafId = requestAnimationFrame(idleFrame);
}

// After the story, a spark keeps travelling the thread — only while it is on screen.
let idleStart = 0, threadVisible = false;
const IDLE_MS = 9000;
function idleFrame(now){
  if (playing) return;
  if (threadVisible && !REDUCED) {
    const u = ((now - idleStart) % IDLE_MS) / IDLE_MS;
    const target = u * threadLen;
    let lo = 0, hi = samples.length - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (samples[mid].len < target) lo = mid + 1; else hi = mid; }
    spark.setAttribute('cx', f1(samples[lo].x)); spark.setAttribute('cy', f1(samples[lo].y));
    spark.style.opacity = u > .94 ? (1 - u) / .06 : u < .04 ? u / .04 : 1;
  }
  rafId = requestAnimationFrame(idleFrame);
}

/* ============================================================================
   THREAD CONTROLS + INIT
   ============================================================================ */
function initThread(){
  buildMap();
  hoverPaper(null);
  setFocus('all');

  document.querySelectorAll('#thread-ctrl .tbtn[data-focus]').forEach(b =>
    b.addEventListener('click', () => { if (playing) finishPlay(); setFocus(b.dataset.focus); }));
  document.getElementById('play').addEventListener('click', () => playing ? finishPlay() : startPlay());
  document.getElementById('links-toggle').addEventListener('click', e => {
    showAllLinks = !showAllLinks;
    document.getElementById('links').classList.toggle('links-all', showAllLinks);
    e.target.classList.toggle('on', showAllLinks);
    e.target.textContent = showAllLinks ? 'hide shared ideas' : 'show shared ideas';
  });

  const thread = document.getElementById('thread');
  if (REDUCED) { finishPlay(); }
  else {
    // hide the dots until the story plays the first time the map is seen
    Object.values(nodeEls).forEach(n => n.classList.add('pend'));
    threadPath.style.strokeDashoffset = threadLen;
  }
  new IntersectionObserver(entries => entries.forEach(en => {
    threadVisible = en.isIntersecting;
    if (en.isIntersecting && !played && !REDUCED) startPlay();
  }), { threshold:.35 }).observe(thread);
}
/* ============================================================================
   PUBLICATIONS — list + filter (domain or topic)
   ============================================================================ */
const publist = document.getElementById('publist');
const authorHTML = a => (a[1] ? '<b>' + a[0] + '</b>' : a[0]) + (a[2] ? '<sup>' + a[2] + '</sup>' : '');

/* The title and short-name fields above are authored as HTML fragments, not as
   plain text -- "S&D Messenger" is stored as "S&amp;D Messenger" because it
   goes into innerHTML. Anywhere the same string reaches a plain-text sink
   (textContent, an alt or aria-label attribute) that has to be undone, or the
   reader sees the entity spelled out.

   attrEsc goes the other way, for raw text being spliced into an attribute:
   p.short holds "S&D" with a bare ampersand. */
const txtEsc = document.createElement('textarea');
function plain(html){
  txtEsc.innerHTML = html;                    // decodes entities, runs nothing:
  return txtEsc.value;                        // <textarea> content is plain text
}
const attrEsc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                              .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------------------------------------------------------------------------
   ORDER — two orders over the same rows: standing (the default) and time.
   Sorting is done on PUBS and then replayed onto the DOM, so the filter keeps
   working on .hide alone and never has to know about the order.

   VENUE_TIER is a hand-kept ranking, lower = stronger. It is a judgement call
   about standing in this field, not a metric: the journal with a clinical
   readership leads, then the vision conferences, then the specialist venues,
   and a preprint is not a venue at all, so arXiv sits last by construction.
   A venue missing from the table lands just above arXiv rather than at the
   top, so forgetting to add one can never silently promote a paper.
   --------------------------------------------------------------------------- */
const VENUE_TIER = {
  'Nature Cancer':1, CVPR:2, NeurIPS:3, ICCV:4, AAAI:5, ICLR:6, TMI:7, MICCAI:8, arXiv:99
};
const tierOf = p => VENUE_TIER[p.venue] || 90;

/* 'default' ranks by venue standing, then my own role, then recency. Role is
   the second key, not the first: it lifts a paper over its equals at the same
   venue rather than over a stronger venue, so a first-author preprint cannot
   outrank a co-authored ICCV paper. p.me is already 1 for first / co-first.

   'new' / 'old' sort on p.year, not p.t. The two part company on purpose:
   p.t is the arXiv date, which is where the paper belongs on the research map,
   while p.year is the year printed on the card. Sorting by t would have shown
   "Nature Cancer, 2026" sitting between two 2025 papers. Within a year t is
   the tie-break, so the finer ordering survives. */
let order = 'default';

function sortedPubs(){
  const by = {
    default: (a, b) => tierOf(a) - tierOf(b) || b.me - a.me || b.t - a.t,
    new:     (a, b) => b.year - a.year || b.t - a.t,
    old:     (a, b) => a.year - b.year || a.t - b.t
  }[order];
  return [...PUBS].sort(by);
}

/* Reorder in place. The rows are kept (so the citation counts, stars and
   reveal state that other scripts wrote into them survive) and only moved,
   then the plate numbers are rewritten to match the new reading order. */
function applyOrder(o){
  if (o === order) return;
  order = o;
  sortedPubs().forEach((p, i) => {
    const row = document.getElementById('pub-' + p.id);
    if (!row) return;
    publist.appendChild(row);                       // appending moves it
    const idx = row.querySelector('.fig-idx');
    if (idx) idx.textContent = String(i + 1).padStart(2, '0');
  });
  // Two buttons, three orders: 'new' and 'old' are both the Year button lit,
  // and the arrow is what tells them apart.
  document.querySelectorAll('.obtn').forEach(b => {
    const on = b.dataset.o === 'default' ? order === 'default' : order !== 'default';
    b.classList.toggle('on', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  const yr = document.querySelector('.obtn[data-o="time"]');
  if (yr) {
    yr.querySelector('.arrow').textContent = order === 'old' ? '↑' : '↓';
    // The arrow is aria-hidden, so the direction has to reach a screen reader
    // through the label instead.
    yr.setAttribute('aria-label', order === 'old' ? 'Year, oldest first' : 'Year, newest first');
  }

  // Replay the stagger so the new order reads as a deliberate reshuffle.
  // '.in' goes on with it, as in setFilter: reordering can carry a row that
  // the reveal observer has not reached yet up into view, and .rv holds those
  // at opacity 0, so without it the row would land blank.
  if (!REDUCED) {
    const shown = [...publist.children].filter(r => !r.classList.contains('hide'));
    shown.forEach(r => { r.classList.add('out', 'in'); void r.offsetWidth; });
    requestAnimationFrame(() =>
      shown.forEach((r, i) => setTimeout(() => r.classList.remove('out'), i * 35)));
  }
}

function initOrder(){
  const bar = document.getElementById('orderbar');
  if (!bar) return;
  bar.addEventListener('click', e => {
    const b = e.target.closest('.obtn');
    if (!b) return;
    // The time button is a toggle: press it again to flip the direction.
    applyOrder(b.dataset.o === 'time'
      ? (order === 'new' ? 'old' : 'new')
      : 'default');
  });
}

function buildPubs(){
  // Built in the current order, so the first paint already needs no reshuffle.
  sortedPubs().forEach((p, i) => {
    const D = DOMAINS[p.dom], href = p.links[0][1];
    const el = document.createElement('article');
    el.className = 'pub rv'; el.id = 'pub-' + p.id; el.style.setProperty('--c', D.color);
    // The title link is dropped from .plinks -- the h3 above already links to
    // the same target, so listing "Paper" again there was a duplicate.
    const extra = p.links.slice(1);
    const repo = repoOf(p);
    // The citation line between title and authors. VENUES is keyed by the
    // acronym, so "(ICCV)" comes from the key itself -- no second list to keep
    // in sync. The acronym is what a reader recognises, so it carries the
    // weight on an otherwise italic line. Nature Cancer is its own acronym, so
    // the guard marks the whole name instead of writing it twice. A preprint
    // is not a venue, so arXiv stays plain.
    const vmeta = VENUES[p.venue];
    const vkey = s => '<span class="vkey">' + s + '</span>';
    const venueLong = vmeta
      ? (vmeta.full === p.venue
          ? vkey(vmeta.full)
          : vmeta.full + ' (' + vkey(p.venue) + ')')
      : (p.venue === 'arXiv' ? 'arXiv preprint' : vkey(p.venue));
    el.innerHTML =
      // The taxonomy caps the figure column, above the venue plate and image.
      '<div class="pub-fig">'
      + '<p class="taxo">'
      + '<button class="dom" data-f="' + p.dom + '" style="--c:' + D.color + '">' + D.short + '</button>'
      + '<span class="cats">' + p.cats.map(c => '<span class="cat" data-f="' + c + '">' + CATS[c] + '</span>').join('') + '</span>'
      + '</p>'
      + '<span class="fig-bar"><span class="ven-plate">' + p.venue + ' ' + p.year + '</span>'
      + '<span class="fig-idx">' + String(i + 1).padStart(2, '0') + '</span></span>'
      // The figure opens itself, it does not open the paper. The thumbnail is
      // 164px wide and most of these figures are dense pipeline diagrams, so
      // the one thing a reader wants from it is a closer look; the title and
      // the Paper link above already go to arXiv. alt stays empty: the image
      // is decorative at this size and the button carries the label.
      + '<button class="thumb" type="button" data-zoom="' + p.id + '"'
      + ' aria-label="Enlarge the figure for '
      + attrEsc(p.short || p.venue + ' ' + p.year) + '">'
      + '<img src="' + IMG_BASE + p.img + '" alt="" loading="lazy" />'
      + '<span class="tick tl"></span><span class="tick br"></span>'
      + '<span class="thumb-zoom" aria-hidden="true">+</span></button></div>'
      + '<div class="pub-body">'
      // home-theme.js appends the "Cited by" metric to .venue, so this empty
      // line is the metric's host. Its height is reserved in CSS even when it
      // stays empty, so an uncited paper does not pull its title up and
      // stagger it against the cited paper beside it in the two-up grid.
      + '<p class="venue"></p>'
      + '<h3><a href="' + href + '" target="_blank" rel="noopener">' + p.title + '</a></h3>'
      + '<p class="pubinfo"><span class="pub-venue">' + venueLong + ', ' + p.year + '</span>'
      + (p.tag ? '<span class="ven-tag' + (p.award ? ' award' : '') + '">' + p.tag + '</span>' : '')
      + '</p>'
      + '<p class="auth">' + p.authors.map(authorHTML).join(', ') + '</p>'
      + '<div class="plinks"' + (repo ? ' data-repo="' + repo + '"' : '') + '>'
      + extra.map(l => '<a href="' + l[1] + '" target="_blank" rel="noopener">' + l[0] + ' ↗</a>').join('')
      + '<button data-cite="' + p.id + '">BibTeX</button></div></div>';
    publist.appendChild(el);
  });
  document.querySelectorAll('.fbtn').forEach(b => {
    const f = b.dataset.f;
    b.querySelector('.n').textContent = ' ' + PUBS.filter(p => matches(p, f)).length;
  });
}

let current = 'all';
const matches = (p, f) => f === 'all' || p.dom === f || p.cats.includes(f);

function setFilter(f, opts){
  opts = opts || {};
  const changed = f !== current;
  current = f;
  const rows = [...publist.children];
  const show = rows.filter(r => matches(PUB[r.id.slice(4)], f));

  rows.forEach(r => {
    const on = show.includes(r);
    r.classList.toggle('hide', !on);
    if (on && changed) { r.classList.add('out', 'in'); void r.offsetWidth; }
  });
  if (changed) requestAnimationFrame(() =>
    show.forEach((r, i) => setTimeout(() => r.classList.remove('out'), i * 45)));

  document.querySelectorAll('.fbtn').forEach(b => b.classList.toggle('on', b.dataset.f === f));
  document.querySelectorAll('.cat').forEach(c => c.classList.toggle('on', c.dataset.f === f));
  document.getElementById('empty').style.display = show.length ? 'none' : 'block';

  if (opts.scroll) scrollToEl(document.getElementById('pubs'), 58);
}

/* Sum offsetTop up the offsetParent chain. Deliberately not   getBoundingClientRect(): the .rv reveal class puts a translateY(14px) on
   elements, and getBoundingClientRect folds transforms into its result, so
   measuring with it lands the scroll 14px off (and keeps drifting while the
   reveal transition runs). offsetTop is pure layout, so it's stable. */
function offsetTopOf(el){
  let y = 0;
  for (let n = el; n; n = n.offsetParent) y += n.offsetTop;
  return y;
}

function scrollToEl(el, off){
  window.scrollTo({ top: offsetTopOf(el) - off,
                    behavior: REDUCED ? 'auto' : 'smooth' });
}

function jumpToPub(id){
  const el = document.getElementById('pub-' + id);
  if (!el) return;
  if (el.classList.contains('hide')) setFilter('all');
  el.classList.add('in');
  // Wait for the filter's reflow to settle before measuring, otherwise we
  // measure the pre-filter layout and land on the wrong paper.
  requestAnimationFrame(() => requestAnimationFrame(() => {
    scrollToEl(el, 78);
    el.classList.remove('flash'); void el.offsetWidth; el.classList.add('flash');
  }));
}

document.addEventListener('click', e => {
  const f = e.target.closest('.fbtn, .cat, .dom');
  if (f) { setFilter(f.dataset.f, { scroll: !f.classList.contains('fbtn') }); return; }
  if (e.target.id === 'reset') setFilter('all');
});

/* ============================================================================
   NEWS — scroll panel with position meter
   ============================================================================ */
function initNews(){
  const box = document.getElementById('news-box'), sc = document.getElementById('news-scroll');
  const items = [...sc.querySelectorAll('li')], meter = document.getElementById('news-meter');
  const pos = document.getElementById('news-pos');
  document.getElementById('news-count').textContent = items.length + ' updates · scroll';

  function update(){
    const max = sc.scrollHeight - sc.clientHeight;
    const r = max > 0 ? sc.scrollTop / max : 0;
    const w = Math.max(.15, sc.clientHeight / sc.scrollHeight);
    meter.style.width = (w * 100) + '%';
    meter.style.transform = 'translateX(' + (r * (1 / w - 1) * 100) + '%)';
    box.classList.toggle('at-mid', r > .01 && r < .99);
    box.classList.toggle('at-end', r >= .99);
    const top = sc.getBoundingClientRect().top;
    const first = items.findIndex(li => li.getBoundingClientRect().bottom > top + 8);
    pos.textContent = (first + 1) + ' / ' + items.length;
  }
  sc.addEventListener('scroll', update, { passive:true });
  document.getElementById('news-up').addEventListener('click', () => sc.scrollBy({ top:-130, behavior:'smooth' }));
  document.getElementById('news-down').addEventListener('click', () => sc.scrollBy({ top:130, behavior:'smooth' }));
  update();

  sc.querySelectorAll('a.jump').forEach(a => a.addEventListener('click', e => {
    e.preventDefault();
    jumpToPub(a.getAttribute('href').slice(5));
  }));
}
/* ============================================================================
   BibTeX — built from the same data, copied to the clipboard.

   The entry type has to follow the venue. This used to emit @inproceedings
   for everything, which meant an arXiv preprint was cited as a conference
   paper that does not exist, and the TMI journal article was cited with a
   booktitle instead of a journal. Preprints get @misc + eprint, journals get
   @article + journal, conferences get @inproceedings + booktitle.
   ============================================================================ */
const VENUES = {
  TMI:     { type:'article',   full:'IEEE Transactions on Medical Imaging' },
  'Nature Cancer': { type:'article', full:'Nature Cancer' },
  AAAI:    { type:'inproceedings', full:'AAAI Conference on Artificial Intelligence' },
  CVPR:    { type:'inproceedings', full:'IEEE/CVF Conference on Computer Vision and Pattern Recognition' },
  ICCV:    { type:'inproceedings', full:'IEEE/CVF International Conference on Computer Vision' },
  ICLR:    { type:'inproceedings', full:'International Conference on Learning Representations' },
  NeurIPS: { type:'inproceedings', full:'Advances in Neural Information Processing Systems' },
  MICCAI:  { type:'inproceedings', full:'Medical Image Computing and Computer Assisted Intervention' }
  // arXiv is intentionally absent — it is a preprint, handled separately.
};

// LaTeX special characters. Order matters: decode the HTML entity first, then
// escape, or "&amp;" would come out as "\&amp;".
const tex = s => s.replace(/&amp;/g, '&')
                 .replace(/([&%$#_])/g, '\\$1')
                 .replace(/~/g, '\\textasciitilde{}');

function bibtex(p){
  const meta = VENUES[p.venue];
  const url  = (p.links[0] || [])[1] || '';
  const arx  = (url.match(/arxiv\.org\/abs\/([0-9.]+)/i) || [])[1];
  const last = p.authors[0][0].split(' ').pop().toLowerCase().replace(/[^a-z]/g, '');
  const key  = last + p.year + p.venue.replace(/[^A-Za-z]/g, '').toLowerCase();

  const rows = [
    ['title',  '{' + tex(p.title) + '}'],
    ['author', '{' + p.authors.map(a => a[0]).join(' and ') + '}'],
    ['year',   '{' + p.year + '}']
  ];

  let head;
  if (!meta) {                                  // preprint
    head = '@misc';
    if (arx) {
      rows.push(['eprint',        '{' + arx + '}']);
      rows.push(['archivePrefix', '{arXiv}']);
    }
    if (url) rows.push(['url', '{' + url + '}']);
  } else if (meta.type === 'article') {         // journal
    head = '@article';
    rows.push(['journal', '{' + meta.full + '}']);
    if (p.vol)   rows.push(['volume', '{' + p.vol + '}']);
    if (p.num)   rows.push(['number', '{' + p.num + '}']);
    if (p.pages) rows.push(['pages',  '{' + p.pages + '}']);
    if (p.doi)   rows.push(['doi',    '{' + p.doi + '}']);
    if (url) rows.push(['url', '{' + url + '}']);
  } else {                                      // conference
    head = '@inproceedings';
    rows.push(['booktitle', '{' + meta.full + '}']);
    if (p.pages) rows.push(['pages', '{' + p.pages + '}']);
    if (p.doi)   rows.push(['doi',   '{' + p.doi + '}']);
    if (url) rows.push(['url', '{' + url + '}']);
  }

  // The dagger marks equal contribution on the page; carry it into the entry
  // so a copy-paste keeps that information.
  // p.note carries publication status, e.g. "Accepted in principle".
  const notes = [];
  if (p.note) notes.push(p.note);
  if (p.authors.some(a => a[2])) notes.push('$^\\dagger$ Equal contribution');
  if (notes.length) rows.push(['note', '{' + notes.join('; ') + '}']);

  const pad = Math.max(...rows.map(r => r[0].length));
  return head + '{' + key + ',\n'
    + rows.map(([k, v]) => '  ' + k.padEnd(pad) + ' = ' + v).join(',\n') + '\n}';
}

document.addEventListener('click', async e => {
  const btn = e.target.closest('[data-cite]');
  if (!btn) return;
  const entry = bibtex(PUB[btn.dataset.cite]);
  try { await navigator.clipboard.writeText(entry); toast('BibTeX copied'); }
  catch (err) { window.prompt('Copy this BibTeX:', entry); }
});

let toastTimer;
function toast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 1900);
}

/* ============================================================================
   FIGURE VIEWER — the thumbnail opens the figure, not the paper.

   One viewer is reused for every card: a modal dialog whose image src is
   swapped on open. The caption repeats the venue plate and the short name so
   the figure is still identifiable once the card it came from is covered.
   ============================================================================ */
function initLightbox(){
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  const img   = document.getElementById('lb-img');
  const plate = document.getElementById('lb-plate');
  const title = document.getElementById('lb-title');
  // Where to send focus back on close. Without this, closing the viewer drops
  // focus to the top of the page and a keyboard reader loses its place in the
  // list.
  let opener = null;

  function open(id, btn){
    const p = PUB[id];
    if (!p) return;
    opener = btn || null;
    img.src = IMG_BASE + p.img;
    // The figure is the subject of the dialog now, not decoration, so unlike
    // the thumbnail it gets a real alt. Both sinks here are plain text, so the
    // title has to come back through plain() -- see the note on txtEsc.
    const t = plain(p.title);
    img.alt = 'Figure from "' + t + '"';
    plate.textContent = p.venue + ' ' + p.year;
    title.textContent = t;
    lb.hidden = false;
    // Two frames: the first paints the dialog at its hidden start state, the
    // second adds .on so the transition has something to run from. One frame
    // is not enough -- removing [hidden] and adding the class in the same frame
    // makes the browser skip straight to the end state.
    requestAnimationFrame(() => requestAnimationFrame(() => lb.classList.add('on')));
    document.documentElement.classList.add('lb-open');
    lb.querySelector('.lb-close').focus();
  }

  function close(){
    if (lb.hidden) return;
    lb.classList.remove('on');
    document.documentElement.classList.remove('lb-open');
    const done = () => {
      lb.hidden = true;
      // Drop the image only once it is out of sight, so the fade-out does not
      // flash an empty frame. removeAttribute, not src = '': an empty src
      // resolves against the document URL, so the browser would go and fetch
      // the page's own HTML as an image.
      img.removeAttribute('src');
      img.alt = '';                  // emptied, not removed: alt is required
      if (opener && document.body.contains(opener)) opener.focus();
      opener = null;
    };
    if (REDUCED) { done(); return; }
    setTimeout(done, 260);                       // matches the CSS transition
  }

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-zoom]');
    if (btn) { open(btn.dataset.zoom, btn); return; }
    // Anywhere outside the figure closes it, including the close button -- the
    // button is a sibling of .lb-fig, so one test covers both.
    if (!lb.hidden && lb.contains(e.target) && !e.target.closest('.lb-fig')) close();
  });

  document.addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') { close(); return; }
    // The viewer holds only one control, so trapping Tab means keeping focus
    // on it rather than cycling a list.
    if (e.key === 'Tab') { e.preventDefault(); lb.querySelector('.lb-close').focus(); }
  });
}

/* ============================================================================
   PAGE CHROME — reveal, mini header, progress, scroll spy, anchors
   ============================================================================ */
function initChrome(){
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { rootMargin:'0px 0px -6% 0px', threshold:.04 });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));

  const mini = document.getElementById('mini'), banner = document.querySelector('.banner');
  const bar = document.getElementById('progress');
  function onScroll(){
    const y = window.scrollY;
    mini.classList.toggle('show', y > banner.offsetHeight - 40);
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? Math.min(y / max, 1) * 100 : 0) + '%';
  }
  addEventListener('scroll', onScroll, { passive:true });
  addEventListener('resize', onScroll);
  onScroll();

  const navLinks = [...document.querySelectorAll('.mini-nav a[href^="#"]')];
  const spy = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) navLinks.forEach(a =>
      a.classList.toggle('on', a.getAttribute('href') === '#' + en.target.id));
  }), { rootMargin:'-25% 0px -68% 0px' });
  navLinks.forEach(a => { const s = document.querySelector(a.getAttribute('href')); if (s) spy.observe(s); });

  document.querySelectorAll('a[href^="#"]:not(.jump)').forEach(a =>
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      scrollToEl(t, 58);
    }));
}

/* ============================================================================
   SIDE RAIL — fixed in the left gutter: one tick per section, a live index
   ============================================================================ */
function initRail(){
  const rail = document.getElementById('rail');
  const secs = [['bio','Biography'],['news','News'],['research','Research'],['pubs','Publications'],['awards','Awards'],['service','Service']];
  rail.innerHTML = '<span class="rail-k">§</span>'
    + '<div class="rail-track"><i id="rail-fill"></i></div>'
    + secs.map(([id, nm], i) => '<a href="#' + id + '" data-s="' + id + '"><b>0' + (i + 1) + '</b><span>' + nm + '</span></a>').join('');
  const links = [...rail.querySelectorAll('a')], fill = document.getElementById('rail-fill');
  const els = secs.map(([id]) => document.getElementById(id));

  // A section becomes current when its top crosses 35% of the viewport. Each
  // section gets the scroll position where that happens (clamped to what the
  // page can actually scroll to, so the last one is reachable), and the fill
  // runs dot to dot between those positions, so line and dots always agree.
  // Biography and News share a row, so they share a position and light together.
  const track = rail.querySelector('.rail-track');
  const dotY = a => a.offsetTop + 8.5;        // centre of the a::before dot
  function layoutTrack(){
    const y0 = dotY(links[0]), y1 = dotY(links[links.length - 1]);
    track.style.top = y0 + 'px'; track.style.bottom = 'auto'; track.style.height = (y1 - y0) + 'px';
  }
  function update(){
    const max = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    const tops = els.map(offsetTopOf);
    const at = tops.map(t => Math.min(max, Math.max(0, t - innerHeight * .35)));
    const y = Math.min(scrollY, max);
    let k = 0;
    at.forEach((s, i) => { if (y >= s - 1) k = i; });
    links.forEach((a, i) => {
      const on = tops[i] === tops[k];
      a.classList.toggle('on', on); a.classList.toggle('past', !on && i < k);
    });
    // fill: position between dot k and dot k+1, in px along the track
    const d = links.map(dotY), y0 = d[0], L = d[d.length - 1] - y0;
    let f = d[k] - y0;
    if (k < links.length - 1 && at[k + 1] > at[k]) f += (d[k + 1] - d[k]) * Math.min(1, (y - at[k]) / (at[k + 1] - at[k]));
    fill.style.transform = 'scaleY(' + (L > 0 ? f / L : 0) + ')';
    rail.classList.toggle('show', scrollY > document.querySelector('.banner').offsetHeight * .6);
  }
  links.forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); scrollToEl(document.getElementById(a.dataset.s), 58);
  }));
  addEventListener('scroll', update, { passive:true });
  addEventListener('resize', () => { layoutTrack(); update(); });
  // section heights change after images, filters and reveals settle
  new ResizeObserver(() => update()).observe(document.querySelector('.wrap'));
  layoutTrack(); update();
}

/* ============================================================================
   MAP ORBS — tiny points that circle each domain ring, forever
   ============================================================================ */
function initOrbs(){
  if (REDUCED) return;
  const g = el('g', { class:'orb' }, svg);
  svg.insertBefore(g, document.getElementById('thread-ghost'));
  const orbs = [];
  Object.values(DOMAINS).forEach((d, k) => {
    const n = 3 + k;
    for (let i = 0; i < n; i++) {
      orbs.push({ r:d.r, speed:(5 + Math.random() * 4) * (k % 2 ? -1 : 1) / (1 + k * .35),
                  a0:Math.random() * 180, el:el('circle', { r:1.6 + Math.random(), fill:d.color }, g) });
    }
  });
  function frame(now){
    requestAnimationFrame(frame);
    if (!threadVisible) return;
    const t = now / 1000;
    for (const o of orbs) {
      const a = ((o.a0 + o.speed * t) % 180 + 180) % 180;   // keep on the upper half
      const [x, y] = polar(o.r, a);
      o.el.setAttribute('cx', f1(x)); o.el.setAttribute('cy', f1(y));
      // fade near the baseline so they don't pop at the ends
      o.el.setAttribute('opacity', f1(Math.min(1, Math.sin(rad(a)) * 3) * .45 * 10) / 10);
    }
  }
  requestAnimationFrame(frame);
}

/* ============================================================================
   EXPORTS — consumed by home-theme.js
   ============================================================================ */
window.HOME = { PUBS: PUBS, PUB: PUB, DOMAINS: DOMAINS, jumpToPub: jumpToPub };

/* ============================================================================
   BOOT
   ============================================================================ */
buildPubs();
initOrder();
/* ============================================================================
   ASIDE ALIGNMENT — the hover card runs down to the core's baseline (the flat
   edge of the half disc). The baseline scales with the map's width, so it is
   measured, not hard-coded.
   ============================================================================ */
function alignAside(){
  hcard.style.removeProperty('--hcard-h');
  // must match the breakpoint where _home.scss stacks .stage (880px): between
  // 881 and 1000px the card is still beside the map and needs the baseline
  if (matchMedia('(max-width:880px)').matches) return;   // stacked: no map beside it
  const sb = svg.getBoundingClientRect(), vbH = svg.viewBox.baseVal.height;
  const h = sb.top + CY * sb.height / vbH - hcard.getBoundingClientRect().top;
  if (h > 200) hcard.style.setProperty('--hcard-h', Math.round(h) + 'px');
  fitHint();      // the card's height just changed under the idle text
}

function initAside(){
  alignAside();
  new ResizeObserver(alignAside).observe(document.getElementById('thread'));
  if (document.fonts) document.fonts.ready.then(alignAside);
}

initThread();
initAside();
initOrbs();
initNews();
initChrome();
initRail();
initLightbox();