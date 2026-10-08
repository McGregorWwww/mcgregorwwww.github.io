---
permalink: /
layout: home
title: "Haonan Wang (王浩楠)"
excerpt: ""
redirect_from:
  - /about/
  - /about.html
---

<!-- Page content only. The banner above it is site chrome and lives in
     _layouts/home.html, so that it can span the full viewport width. -->

<!-- ============ row 1 · biography + news ============ -->
<div class="duo">
  <section id="bio" class="rv">
    <div class="sec-head"><span class="num">01</span><h2>Biography</h2></div>
    <p class="lede">I am a Ph.D. student supervised by <a href="https://xmengli.github.io/" target="_blank" rel="noopener">Prof. Xiaomeng Li</a> at <a href="https://hkust.edu.hk/" target="_blank" rel="noopener">The Hong Kong University of Science and Technology</a>.</p>
    <p>My research follows one question &mdash; <em>how are visual semantics represented?</em> &mdash; across three settings: medical scans where labels are scarce, natural images in the open world, and finally the human visual cortex itself. <a href="#research">See how the pieces connect &darr;</a></p>
    <p>Before that, I received my Master's degree from <a href="https://www.hku.hk/" target="_blank" rel="noopener">The University of Hong Kong</a> and my B.Eng. degree from <a href="http://www.neu.edu.cn/" target="_blank" rel="noopener">Northeastern University</a>, supervised by <a href="https://scholar.google.com/citations?user=0OfgZSsAAAAJ&amp;hl=en" target="_blank" rel="noopener">Prof. Peng Cao</a>.</p>
    <p class="interests">
      <i>Interests</i>
      <span>Deep Learning</span><span class="dot">&middot;</span>
      <span>Computer Vision</span><span class="dot">&middot;</span>
      <span>Label-efficient Learning</span><span class="dot">&middot;</span>
      <span>Medical Image Analysis</span><span class="dot">&middot;</span>
      <span>Foundation Models</span><span class="dot">&middot;</span>
      <span>Brain Decoding</span><span class="dot">&middot;</span>
      <span>Generative Models</span>
    </p>
  </section>

  <section id="news" class="rv">
    <div class="sec-head"><span class="num">02</span><h2>News</h2><span class="count" id="news-count"></span></div>
    <div class="news-box" id="news-box">
      <div class="news-scroll" id="news-scroll">
        <ul class="news-list">
          <li><span class="when">2026.01</span><span><strong>1</strong> co-authored paper accepted by <em>ICLR&nbsp;2026</em> &mdash; <a class="jump" href="#pub-vcflow">VCFLOW</a>.</span></li>
          <li><span class="when">2025.09</span><span><strong>1</strong> paper accepted by <em>NeurIPS&nbsp;2025</em>. We propose <a class="jump" href="#pub-zebra">ZEBRA</a>, the first zero-shot brain visual decoding framework that eliminates subject-specific adaptation.</span></li>
          <li><span class="when">2025.06</span><span><strong>2</strong> papers accepted by <em>ICCV&nbsp;2025</em> &mdash; <a class="jump" href="#pub-neurons">Neurons</a> &amp; <a class="jump" href="#pub-tam">TAM</a>.<span class="flag">TAM &middot; Oral</span></span></li>
          <li><span class="when">2025.05</span><span><strong>1</strong> co-authored paper accepted by <em>TMI&nbsp;2025</em> &mdash; <a class="jump" href="#pub-snd">S&amp;D Messenger</a>.</span></li>
          <li><span class="when">2025.01</span><span><strong>1</strong> co-authored paper accepted by <em>ICLR&nbsp;2025</em> &mdash; <a class="jump" href="#pub-medrega">MedRegA</a>.</span></li>
          <li><span class="when">2024.10</span><span><strong>1</strong> co-authored paper accepted by <em>TMI&nbsp;2024</em>.</span></li>
          <li><span class="when">2024.02</span><span><strong>1</strong> paper accepted by <em>CVPR&nbsp;2024</em> &mdash; <a class="jump" href="#pub-allspark">AllSpark</a>.</span></li>
          <li><span class="when">2023.09</span><span><strong>1</strong> paper accepted by <em>NeurIPS&nbsp;2023</em> &mdash; <a class="jump" href="#pub-and">GenericSSL</a>.</span></li>
          <li><span class="when">2023.08</span><span>Joined <a href="https://xmengli.github.io/" target="_blank" rel="noopener">Prof. Xiaomeng Li</a>'s lab at HKUST to pursue my Ph.D.</span></li>
          <li><span class="when">2023.06</span><span><strong>1</strong> paper accepted by <em>MICCAI&nbsp;2023</em> &mdash; <a class="jump" href="#pub-dhc">DHC</a>.</span></li>
          <li><span class="when">2022.02</span><span><strong>1</strong> paper accepted by <em>AAAI&nbsp;2022</em> &mdash; <a class="jump" href="#pub-uctransnet">UCTransNet</a>.<span class="flag">Top-1 Influential</span></span></li>
        </ul>
      </div>
      <div class="news-foot">
        <span id="news-pos">1 / 11</span>
        <div class="news-meter"><i id="news-meter"></i></div>
        <button id="news-up" aria-label="scroll news up">&uarr;</button>
        <button id="news-down" aria-label="scroll news down">&darr;</button>
      </div>
    </div>
  </section>
</div>

<!-- ============ 03 · research thread ============ -->
<section id="research" class="rv">
  <div class="sec-head"><span class="num">03</span><h2>Research Thread</h2>
    <span class="count">hover a dot &middot; click to open the paper</span></div>

  <div class="thread" id="thread">
    <div class="thread-head">
      <p class="thread-title">
        <span class="k">Core question &middot; Visual Semantic Representation</span>
        <b>How are <em>visual semantics</em> represented &mdash; in scans, in photos, and in the brain?</b>
      </p>
      <div class="thread-ctrl" id="thread-ctrl">
        <button class="tbtn on" data-focus="all">Overview</button>
        <button class="tbtn" data-focus="med"><i style="background:var(--d-med)"></i>I &middot; Medical</button>
        <button class="tbtn" data-focus="nat"><i style="background:var(--d-nat)"></i>II &middot; Natural</button>
        <button class="tbtn" data-focus="hum"><i style="background:var(--d-hum)"></i>III &middot; Human</button>
        <button class="tbtn play" id="play">&#9654; Play the story</button>
      </div>
    </div>

    <div class="stage">
      <div class="map-wrap"><svg id="map" viewBox="0 0 940 528" role="img"
        aria-label="Research map: papers arranged by year (angle) and domain (ring), from medical images through natural images to human vision"></svg></div>
      <aside class="aside">
        <div class="hcard" id="hcard"></div>
        <ul class="legend">
          <li><svg width="22" height="12"><circle cx="11" cy="6" r="4.5" style="fill:var(--accent)"/></svg>first / co-first author</li>
          <li><svg width="22" height="12"><circle cx="11" cy="6" r="4" style="fill:var(--surface)" class="lg-s" stroke-width="1.6"/></svg>co-author</li>
          <li><svg width="22" height="12"><circle cx="11" cy="6" r="4" style="fill:var(--surface)" class="lg-s" stroke-width="1.6"/><circle cx="11" cy="6" r="6.5" fill="none" class="lg-s" stroke-width=".8"/></svg>oral / award</li>
          <li><svg width="22" height="12"><path d="M1 8 Q11 0 21 6" fill="none" class="lg-s" stroke-width="2"/></svg>my main thread</li>
          <li><svg width="22" height="12"><path d="M1 6 H21" class="lg-s" stroke-width="1.1" stroke-dasharray="3 3"/></svg><button id="links-toggle">show shared ideas</button></li>
        </ul>
      </aside>
    </div>

    <div class="chapters" id="chapters"></div>
    <div class="thread-foot" id="thread-foot">
      <span>Same question, widening scope: <b>pixels with scarce labels</b> &rarr; <b>open-world semantics</b> &rarr; <b>cortical representation</b></span>
      <a href="#pubs" id="foot-link">all 14 papers &darr;</a>
    </div>
  </div>
</section>

<!-- ============ 04 · publications ============ -->
<section id="pubs">
  <div class="sec-head"><span class="num">04</span><h2>Selected Publications</h2>
    <span class="count"><sup>&dagger;</sup> equal contribution &middot; <a href="{{ site.author.googlescholar }}" target="_blank" rel="noopener">all papers on Google Scholar &rarr;</a></span></div>
  <div class="filterbar" id="filterbar">
    <button class="fbtn on" data-f="all">All<span class="n"></span></button>
    <span class="fgrp b">Domain</span>
    <button class="fbtn" data-f="med"><i style="background:var(--d-med)"></i>Medical<span class="n"></span></button>
    <button class="fbtn" data-f="nat"><i style="background:var(--d-nat)"></i>Natural<span class="n"></span></button>
    <button class="fbtn" data-f="hum"><i style="background:var(--d-hum)"></i>Human<span class="n"></span></button>
    <span class="fgrp b brk">Topic</span>
    <button class="fbtn" data-f="brain">Brain Decoding<span class="n"></span></button>
    <button class="fbtn" data-f="foundation">Foundation Models<span class="n"></span></button>
    <button class="fbtn" data-f="label-efficient">Label-efficient<span class="n"></span></button>
    <button class="fbtn" data-f="seg">Segmentation<span class="n"></span></button>
    <button class="fbtn" data-f="interpret">Interpretability<span class="n"></span></button>
    <button class="fbtn-reset" id="reset">reset</button>
  </div>
  <div class="publist" id="publist"></div>
  <p class="empty" id="empty">No papers match this filter.</p>
</section>

<!-- ============ 05 · education + service ============ -->
<section id="service" class="rv">
  <div class="sec-head"><span class="num">05</span><h2>Education &amp; Service</h2></div>
  <div class="trio">
    <div>
      <p class="sub">Education</p>
      <ul class="edu">
        <li><span class="when">2023.09 &mdash;</span><span>Ph.D., The Hong Kong University of Science and Technology</span></li>
        <li><span class="when">2022 &mdash; 2023</span><span>M.Sc. Computer Science, The University of Hong Kong</span></li>
        <li><span class="when">2017 &mdash; 2021</span><span>B.Eng. Computer Science, Northeastern University</span></li>
      </ul>
    </div>
    <div>
      <p class="sub">Journal Reviews</p>
      <ul><li>IEEE TPAMI</li><li>IEEE TIP</li><li>IEEE TNNLS</li><li>IEEE TMI</li><li>IEEE JBHI</li></ul>
    </div>
    <div>
      <p class="sub">Conference Reviews</p>
      <ul><li>CVPR &middot; ICCV</li><li>ICML <em>(Gold Reviewer 2026)</em></li><li>ICLR &middot; NeurIPS</li><li>AAAI &middot; MICCAI</li></ul>
    </div>
  </div>
</section>
