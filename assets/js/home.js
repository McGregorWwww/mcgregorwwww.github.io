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
         sub:'scarce labels',
         title:'Semantics from <em>scarce labels</em>',
         text:'Started where pixel labels are most expensive: CT, MRI and pathology. Learned semantics that survive with few annotations, then grounded them in language for medical MLLMs.' },
  nat: { rn:'II',  name:'Natural Images', short:'Natural', color:'var(--d-nat)', r:276, years:'2024 —',
         sub:'open world',
         title:'Semantics in the <em>open world</em>',
         text:'Carried the same question to natural scenes: regenerating labelled features from unlabelled ones, and asking which visual tokens a multimodal LLM actually relies on.' },
  hum: { rn:'III', name:'Human Vision',   short:'Human',   color:'var(--d-hum)', r:368, years:'2025 —',
         sub:'cortical code',
         title:'Semantics in the <em>visual cortex</em>',
         text:'Turned to the original visual system. Decoding what people see from fMRI and EEG — and doing it across subjects without per-person training.' }
};

// t = fractional year that places the paper on the time axis.
// me: 1 = first / co-first author, 0 = co-author.
const PUBS = [
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
    img:'ZEBRA.png', scholar:'KDNRnW0AAAAJ:KlAtU1dfN6UC', links:[['Paper','https://arxiv.org/abs/2510.27128'],['Code','https://github.com/xmed-lab/ZEBRA']] },
  { id:'unieval', venue:'arXiv', year:2025, t:2025.42, dom:'nat', me:0, cats:['foundation'], short:'UniEval',
    title:'UniEval: Unified Holistic Evaluation for Unified Multimodal Understanding and Generation',
    authors:[['Yi Li',0],['Haonan Wang',1],['Qixiang Zhang',0],['Boyu Xiao',0],['Chenchang Hu',0],['Hualiang Wang',0],['Xiaomeng Li',0]],
    img:'UniEval.png', scholar:'KDNRnW0AAAAJ:8k81kl-MbHgC', links:[['Paper','https://www.arxiv.org/abs/2505.10483'],['Code','https://github.com/xmed-lab/UniEval']] },
  { id:'xmedgpt', venue:'arXiv', year:2025, t:2025.62, dom:'med', me:0, cats:['foundation','interpret'], short:'XMedGPT',
    title:'Multi-Modal Explainable Medical AI Assistant for Trustworthy Human-AI Collaboration',
    authors:[['Honglong Yang',0],['Shanshan Song',0],['Yi Qin',0],['Lehan Wang',0],['Haonan Wang',1],['Xinpeng Ding',0],['Qixiang Zhang',0],['Bodong Du',0],['Xiaomeng Li',0]],
    img:'xmedgpt.png', scholar:'KDNRnW0AAAAJ:5nxA0vEk-isC', links:[['Paper','https://arxiv.org/abs/2505.06898'],['Code','https://github.com/xmed-lab/RCMed']] },
  { id:'rcmed', venue:'arXiv', year:2025, t:2025.45, dom:'med', me:1, cats:['foundation','seg'], short:'RCMed',
    title:'Reinforced Correlation Between Vision and Language for Precise Medical AI Assistant',
    authors:[['Haonan Wang',1],['Jiaji Mao',0],['Lehan Wang',0],['Qixiang Zhang',0],['Marawan Elbatel',0],['Yi Qin',0],['Huijun Hu',0],['Baoxun Li',0],['Wenhui Deng',0],['Weifeng Qin',0],['Hongrui Li',0],['Jialin Liang',0],['Jun Shen',0],['Xiaomeng Li',0]],
    img:'RCMed.png', scholar:'KDNRnW0AAAAJ:UebtZRa9Y70C', links:[['Paper','https://arxiv.org/abs/2505.03380'],['Code','https://github.com/xmed-lab/RCMed']] },
  { id:'neurons', venue:'ICCV', year:2025, t:2025.50, dom:'hum', me:1, cats:['brain'], short:'Neurons',
    title:'Neurons: Emulating the Human Visual Cortex Improves Fidelity and Interpretability in fMRI-to-Video Reconstruction',
    authors:[['Haonan Wang',1,'†'],['Qixiang Zhang',0,'†'],['Lehan Wang',0],['Xuanqi Huang',0],['Xiaomeng Li',0]],
    img:'Neurons.png', scholar:'KDNRnW0AAAAJ:Se3iqnhoufwC', links:[['Paper','https://arxiv.org/abs/2503.11167'],['Code','https://github.com/xmed-lab/NEURONS']] },
  { id:'tam', venue:'ICCV', year:2025, t:2025.58, dom:'nat', me:0, award:1, tag:'Oral 0.57%', cats:['foundation','interpret'], short:'TAM',
    title:'Token Activation Map to Visually Explain Multimodal LLMs',
    authors:[['Yi Li',0],['Hualiang Wang',0],['Xinpeng Ding',0],['Haonan Wang',1],['Xiaomeng Li',0]],
    img:'TAM.png', scholar:'KDNRnW0AAAAJ:3fE2CSJIrl8C', links:[['Paper','https://arxiv.org/abs/2506.23270'],['Code','https://github.com/xmed-lab/TAM']] },
  { id:'medrega', venue:'ICLR', year:2025, t:2025.08, dom:'med', me:0, cats:['foundation','interpret'], short:'MedRegA',
    title:'Interpretable Bilingual Multimodal Large Language Model for Diverse Biomedical Tasks',
    authors:[['Lehan Wang',0],['Haonan Wang',1],['Honglong Yang',0],['Jiaji Mao',0],['Zehong Yang',0],['Jun Shen',0],['Xiaomeng Li',0]],
    img:'MedRegA.png', scholar:'KDNRnW0AAAAJ:_FxGoFyzp5QC', links:[['Paper','https://arxiv.org/abs/2410.18387'],['Code','https://github.com/xmed-lab/MedRegA']] },
  { id:'snd', venue:'TMI', year:2025, t:2025.30, dom:'med', me:1, cats:['seg','label-efficient'], short:'S&D',
    title:'S&amp;D Messenger: Exchanging Semantic and Domain Knowledge for Generic Semi-Supervised Medical Image Segmentation',
    authors:[['Qixiang Zhang',0,'†'],['Haonan Wang',1,'†'],['Xiaomeng Li',0]],
    img:'SND.png', scholar:'KDNRnW0AAAAJ:MXK_kJrjxJIC', links:[['Paper','https://arxiv.org/abs/2407.07763'],['Code','https://github.com/xmed-lab/SD-Messenger']] },
  { id:'allspark', venue:'CVPR', year:2024, t:2024.15, dom:'nat', me:1, cats:['seg','label-efficient'], short:'AllSpark',
    title:'AllSpark: Reborn Labeled Features from Unlabeled in Transformer for Semi-Supervised Semantic Segmentation',
    authors:[['Haonan Wang',1,'†'],['Qixiang Zhang',0,'†'],['Yi Li',0],['Xiaomeng Li',0]],
    img:'allspark.jpg', scholar:'KDNRnW0AAAAJ:YsMSGLbcyi4C', links:[['Paper','https://arxiv.org/abs/2403.01818'],['Code','https://github.com/xmed-lab/AllSpark']] },
  { id:'and', venue:'NeurIPS', year:2023, t:2023.72, dom:'med', me:1, cats:['seg','label-efficient'], short:'GenericSSL',
    title:'Towards Generic Semi-Supervised Framework for Volumetric Medical Image Segmentation',
    authors:[['Haonan Wang',1],['Xiaomeng Li',0]],
    img:'AND.png', scholar:'KDNRnW0AAAAJ:Y0pCki6q_DkC', links:[['Paper','https://proceedings.neurips.cc/paper_files/paper/2023/hash/05dc08730e32441edff52b0fa6caab5f-Abstract-Conference.html'],['Code','https://github.com/xmed-lab/GenericSSL']] },
  { id:'dhc', venue:'MICCAI', year:2023, t:2023.45, dom:'med', me:1, cats:['seg','label-efficient'], short:'DHC',
    title:'DHC: Dual-debiased Heterogeneous Co-training Framework for Class-imbalanced Semi-supervised Medical Image Segmentation',
    authors:[['Haonan Wang',1],['Xiaomeng Li',0]],
    img:'DHC.png', scholar:'KDNRnW0AAAAJ:Tyk-4Ss8FVUC', links:[['Paper','https://arxiv.org/abs/2307.11960'],['Code','https://github.com/xmed-lab/DHC']] },
  { id:'uctransnet', venue:'AAAI', year:2022, t:2022.12, dom:'med', me:1, award:1, tag:'Top-1 Influential', cats:['seg'], short:'UCTransNet',
    title:'UCTransNet: Rethinking the Skip Connections in U-Net from a Channel-wise Perspective with Transformer',
    authors:[['Haonan Wang',1],['Peng Cao',0],['Jiaqi Wang',0],['Osmar R. Zaiane',0]],
    img:'UCTransNet.png', scholar:'KDNRnW0AAAAJ:2osOgNQ5qMEC', links:[['Paper','https://ojs.aaai.org/index.php/AAAI/article/view/20144'],['Code','https://github.com/McGregorWwww/UCTransNet']] }
];

// Ideas that cross between domains — drawn as dashed chords on the map.
const LINKS = [
  ['dhc','allspark',   'semi-supervised segmentation'],
  ['snd','allspark',   'labelled ↔ unlabelled features'],
  ['medrega','tam',    'interpretability'],
  ['rcmed','unieval',  'vision–language alignment'],
  ['tam','neurons',    'interpretable representation'],
  ['zebra','vcflow',   'subject-agnostic decoding']
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
const T0 = 2022.0, T1 = 2026.4;

// Piecewise time → angle. 2025 gets the widest slice because it is the densest year.
const T_KNOTS = [[2022.0,178],[2023.0,150],[2024.0,124],[2025.0,99],[2026.0,28],[2026.4,8]];
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
const R_KNOTS = [[2022.0,184],[2023.75,184],[2024.15,276],[2025.12,282],[2025.5,368],[2026.4,368]];
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
                   neurons:'out', zebra:'out', vcflow:'out', semkey:'out' };

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

  // core — a half iris on the baseline
  const core = el('g', {}, svg);
  const half = r => `M${CX - r} ${CY} A${r} ${r} 0 0 1 ${CX + r} ${CY}`;
  el('path', { d:half(CORE + 40) + 'Z', class:'core-glow' }, core);
  el('path', { d:half(CORE + 26), class:'core-pulse' }, core);
  el('path', { d:half(CORE + 26), class:'core-pulse b' }, core);
  el('path', { d:half(CORE + 11), class:'core-ring', 'stroke-dasharray':'2 3', opacity:.7 }, core);
  el('path', { d:half(CORE) + 'Z', fill:'url(#core-grad)', class:'core-disc' }, core);
  el('path', { d:half(CORE - 7), class:'core-inner' }, core);
  [['Visual', -58, 'core-big it'], ['Semantic', -31, 'core-big'], ['REPRESENTATION', -11, 'core-txt']].forEach(([s, dy, cls]) => {
    el('text', { x:CX, y:CY + dy, class:cls }, core).textContent = s;
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
  + '<p class="hint" style="margin-top:8px">The coloured line is my own thread through them. Hover a dot for the paper; click to jump to it.</p>';

function roleOf(p){
  const me = p.authors.find(a => a[0] === 'Haonan Wang');
  if (me && me[2]) return 'co-first author';
  return p.authors[0][0] === 'Haonan Wang' ? 'first author' : 'co-author';
}

function setFocus(k){
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
  document.querySelectorAll('.chap').forEach(c => {
    c.classList.toggle('on', c.dataset.dom === k);
    c.classList.toggle('dim', k !== 'all' && c.dataset.dom !== k);
  });
  updateFoot(k);
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
  document.querySelectorAll('.chip').forEach(c => c.classList.toggle('hot', c.dataset.id === id));

  if (!id) { hcard.classList.remove('live'); hcard.innerHTML = HINT; return; }
  const p = PUB[id], D = DOMAINS[p.dom];
  nodeEls[id].classList.add('hot');
  const related = linkEls.filter(L => L.a === id || L.b === id)
    .map(L => PUB[L.a === id ? L.b : L.a].short);
  hcard.classList.add('live');
  hcard.innerHTML =
    '<img class="himg" src="' + IMG_BASE + p.img + '" alt="" />'
    + '<p class="hk" style="color:' + D.color + '">' + D.rn + ' · ' + D.short + ' · ' + p.venue + ' ' + p.year + '</p>'
    + '<p class="ht">' + p.title + '</p>'
    + '<p class="hm">' + roleOf(p) + (p.tag ? ' · ' + p.tag : '')
    + (related.length ? '<br>links to ' + related.join(', ') : '') + '</p>';
}

/* ============================================================================
   CHAPTER CARDS
   ============================================================================ */
function buildChapters(){
  const wrap = document.getElementById('chapters');
  Object.entries(DOMAINS).forEach(([k, d]) => {
    const c = document.createElement('div');
    c.className = 'chap'; c.dataset.dom = k; c.style.setProperty('--c', d.color);
    const chips = byDom(k).slice().sort((a, b) => a.t - b.t)
      .map(p => '<button class="chip" data-id="' + p.id + '" style="--c:' + d.color + '">' + p.short + '</button>').join('');
    c.innerHTML =
      '<p class="ck"><span>' + d.rn + ' · ' + d.name + '</span><span>' + d.years + '</span></p>'
      + '<h3>' + d.title + '</h3><p>' + d.text + '</p><div class="chips">' + chips + '</div>';
    c.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (chip) { e.stopPropagation(); jumpToPub(chip.dataset.id); return; }
      setFocus(focus === k ? 'all' : k);
    });
    c.addEventListener('mouseover', e => {
      const chip = e.target.closest('.chip');
      if (chip) hoverPaper(chip.dataset.id);
    });
    c.addEventListener('mouseout', e => { if (e.target.closest('.chip')) hoverPaper(null); });
    wrap.appendChild(c);
  });
}
function updateFoot(k){
  const a = document.getElementById('foot-link');
  a.textContent = k === 'all' ? 'all ' + PUBS.length + ' papers ↓'
                              : byDom(k).length + ' ' + DOMAINS[k].short.toLowerCase() + ' papers ↓';
}

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
  if (focus !== d) setFocus(d);

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
  buildChapters();
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
  document.getElementById('foot-link').addEventListener('click', e => {
    e.preventDefault();
    setFilter(focus, { scroll:true });
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

function buildPubs(){
  PUBS.forEach(p => {
    const D = DOMAINS[p.dom], href = p.links[0][1];
    const el = document.createElement('article');
    el.className = 'pub rv'; el.id = 'pub-' + p.id; el.style.setProperty('--c', D.color);
    // The title link is dropped from .plinks -- the h3 above already links to
    // the same target, so listing "Paper" again there was a duplicate.
    const extra = p.links.slice(1);
    const repo = repoOf(p);
    el.innerHTML =
      '<a class="thumb" href="' + href + '" target="_blank" rel="noopener">'
      + '<img src="' + IMG_BASE + p.img + '" alt="" loading="lazy" /></a>'
      + '<div class="pub-body">'
      + '<p class="venue"><span class="ven">' + p.venue + ' ' + p.year + '</span>'
      + (p.tag ? '<span class="ven-tag">' + p.tag + '</span>' : '')
      + '<button class="dom" data-f="' + p.dom + '" style="--c:' + D.color + '">' + D.short + '</button></p>'
      + '<h3><a href="' + href + '" target="_blank" rel="noopener">' + p.title + '</a></h3>'
      + '<p class="auth">' + p.authors.map(authorHTML).join(', ') + '</p>'
      + '<div class="cats">' + p.cats.map(c => '<span class="cat" data-f="' + c + '">' + CATS[c] + '</span>').join('') + '</div>'
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
   BibTeX — built from the same data, copied to the clipboard
   ============================================================================ */
document.addEventListener('click', async e => {
  const btn = e.target.closest('[data-cite]');
  if (!btn) return;
  const p = PUB[btn.dataset.cite];
  const key = (p.authors[0][0].split(' ').pop() + p.venue.replace(/[^A-Za-z]/g, '') + p.year).toLowerCase();
  const entry = '@inproceedings{' + key + ',\n'
    + '  title     = {' + p.title.replace(/&amp;/g, '&') + '},\n'
    + '  author    = {' + p.authors.map(a => a[0]).join(' and ') + '},\n'
    + '  booktitle = {' + p.venue + '},\n'
    + '  year      = {' + p.year + '}\n}';
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

  document.querySelectorAll('a[href^="#"]:not(.jump):not(#foot-link)').forEach(a =>
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
  const secs = [['bio','Biography'],['news','News'],['research','Research'],['pubs','Publications'],['service','Service']];
  rail.innerHTML = '<span class="rail-k">§</span>'
    + '<div class="rail-track"><i id="rail-fill"></i></div>'
    + secs.map(([id, nm], i) => '<a href="#' + id + '" data-s="' + id + '"><b>0' + (i + 1) + '</b><span>' + nm + '</span></a>').join('');
  const links = [...rail.querySelectorAll('a')], fill = document.getElementById('rail-fill');
  const els = secs.map(([id]) => document.getElementById(id));

  function update(){
    const y = scrollY + innerHeight * .35;
    let k = 0;
    els.forEach((e, i) => { if (e.offsetTop <= y) k = i; });
    links.forEach((a, i) => { a.classList.toggle('on', i === k); a.classList.toggle('past', i < k); });
    const max = document.documentElement.scrollHeight - innerHeight;
    fill.style.transform = 'scaleY(' + (max > 0 ? scrollY / max : 0) + ')';
    rail.classList.toggle('show', scrollY > document.querySelector('.banner').offsetHeight * .6);
  }
  links.forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); scrollToEl(document.getElementById(a.dataset.s), 58);
  }));
  addEventListener('scroll', update, { passive:true });
  addEventListener('resize', update);
  update();
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
initThread();
initOrbs();
initNews();
initChrome();
initRail();