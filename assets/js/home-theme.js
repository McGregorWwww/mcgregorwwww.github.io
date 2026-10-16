/* ============================================================================
   HOME — theme toggle + live citation counts
   ----------------------------------------------------------------------------
   Two small jobs that the mockup handled with preview-only chrome.

   1. Light/dark. "indigo" is the default and lives on :root in _home.scss;
      "midnight" overrides those same custom properties. We only ever set
      data-theme, so nothing reflows. The head script has already applied the
      remembered choice before first paint -- this file only handles clicks.

   2. Citations + stars. google_scholar_crawler writes citations.json on a
      schedule: Scholar counts keyed by Scholar id, GitHub stars keyed by
      owner/repo. Each publication in home.js carries both keys, so we look
      them up and append small metrics in the page's own type, not external
      badge images. If the fetch fails the papers still render.
   ============================================================================ */
(function () {
  'use strict';

  var root = document.documentElement;
  var DARK = 'midnight';
  var LIGHT = 'indigo';

  /* ---------------- 1. theme ---------------- */

  // Rendered in two places: the banner's top-right corner (so it's reachable
  // without scrolling) and the mini header (which only appears on scroll).
  var toggles = [].slice.call(document.querySelectorAll('.theme-toggle'));

  function isDark() {
    return root.getAttribute('data-theme') === DARK;
  }

  function paint() {
    var dark = isDark();
    toggles.forEach(function (t) {
      t.setAttribute('aria-pressed', dark ? 'true' : 'false');
      t.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
      var label = t.querySelector('.tt-label');
      if (label) label.textContent = dark ? 'Light' : 'Dark';
    });
  }

  function setTheme(name, remember) {
    root.setAttribute('data-theme', name);
    if (document.body) document.body.classList.add('theming');
    clearTimeout(setTheme._t);
    setTheme._t = setTimeout(function () {
      if (document.body) document.body.classList.remove('theming');
    }, 500);

    if (remember) {
      try { localStorage.setItem('home-theme', name); } catch (e) {}
    }
    paint();

    // the blueprint canvases cache --accent-rgb in JS; this makes them re-read
    window.dispatchEvent(new CustomEvent('palettechange', { detail: { theme: name } }));
  }

  toggles.forEach(function (t) {
    t.addEventListener('click', function () {
      setTheme(isDark() ? LIGHT : DARK, true);
    });
  });
  if (toggles.length) paint();

  /* ---------------- 2. citations ---------------- */

  var cfg = window.HOME_CONFIG || {};
  var HOME = window.HOME || {};
  var PUBS = HOME.PUBS || [];

  // Both metrics share one shape: a muted mono label, then the number.
  // "Cited by 41" sits on the venue line; "★ 189" sits with Paper / Code.
  function metric(cls, label, n, title) {
    var span = document.createElement('span');
    span.className = 'metric ' + cls;
    span.title = title;
    span.innerHTML = '<span class="m-k">' + label + '</span><b>' + n + '</b>';
    return span;
  }

  function place(data) {
    var byId = data.publications || {};
    var stars = data.stars || {};
    var placed = 0;
    PUBS.forEach(function (p) {
      var row = document.getElementById('pub-' + p.id);
      if (!row) return;

      var rec = p.scholar && byId[p.scholar];
      var venue = row.querySelector('.venue');
      if (rec && rec.cites > 0 && venue) {
        venue.appendChild(metric('cite', 'Cited by', rec.cites,
          rec.cites + (rec.cites === 1 ? ' citation' : ' citations') + ' on Google Scholar'));
        placed++;
      }

      var links = row.querySelector('.plinks');
      var repo = links && links.getAttribute('data-repo');
      if (repo && typeof stars[repo] === 'number') {
        var s = metric('star', '★', stars[repo], stars[repo] + ' stars on GitHub · ' + repo);
        var code = [].slice.call(links.querySelectorAll('a')).filter(function (a) {
          return a.href.indexOf('github.com/' + repo) > -1;
        })[0];
        links.insertBefore(s, code ? code.nextSibling : links.lastChild);
      }
    });
    return placed;
  }

  function loadCitations() {
    if (!cfg.citationsUrl || !PUBS.length) return;

    fetch(cfg.citationsUrl, { cache: 'no-cache' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (data) {
        if (!data || typeof data !== 'object') return;
        HOME.metrics = data;      // the map's hover card reads it too (home.js)
        dispatchEvent(new Event('metricsready'));
        if (place(data)) root.setAttribute('data-cites', 'on');
      })
      .catch(function () {
        /* No citation counts this time. Silent by design: the numbers are
           decoration, and taking the page down over them would be worse. */
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadCitations);
  } else {
    loadCitations();
  }
})();
