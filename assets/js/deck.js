/*
 * deck.js — the channel changer.
 *
 * One post on screen at a time. Arrows / edge buttons / swipe move between
 * them, the hash keeps every post linkable, and the sky behind the text is
 * regenerated per post from its own date and time.
 *
 * Glyphs are restricted to ASCII plus the box-drawing characters Departure
 * Mono ships, so nothing ever falls back to a smooth system font mid-line.
 */
(function () {
  'use strict';

  var LAMP_DAY = '■';   /* ■ */
  var LAMP_NIGHT = '□'; /* □ */

  var els = {
    scene: document.getElementById('scene'),
    static: document.getElementById('static'),
    scroll: document.getElementById('scroll'),
    article: document.getElementById('post'),
    readout: document.getElementById('readout'),
    prev: document.getElementById('prev'),
    next: document.getElementById('next'),
    edgePrev: document.getElementById('edge-prev'),
    edgeNext: document.getElementById('edge-next'),
    fxBtn: document.getElementById('fx-toggle'),
    dnBtn: document.getElementById('dn-toggle'),
    boot: document.getElementById('boot'),
    help: document.getElementById('help'),
    frame: document.querySelector('.crt__screen')
  };

  var posts = [];
  var index = 0;
  var cache = {};
  var sceneInfo = null;
  var twinkleTimer = null;

  /* User overrides, persisted. dayNight: 'auto' | 'day' | 'night' */
  var prefs = {
    fx: read('54chi.fx', 'on'),
    dayNight: read('54chi.dn', 'auto')
  };

  function read(key, fallback) {
    try { return localStorage.getItem(key) || fallback; } catch (e) { return fallback; }
  }

  function write(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }

  /* ---- chrome ------------------------------------------------------------ */

  function applyFx() {
    document.body.classList.toggle('fx-on', prefs.fx === 'on');
    els.fxBtn.setAttribute('aria-pressed', String(prefs.fx === 'on'));
    els.fxBtn.textContent = 'CRT:' + (prefs.fx === 'on' ? 'ON' : 'OFF');
  }

  function applyDayNightButton() {
    var label = { auto: 'AUTO', day: 'DAY', night: 'NIGHT' }[prefs.dayNight];
    els.dnBtn.textContent = 'SKY:' + label;
    els.dnBtn.setAttribute('aria-pressed', String(prefs.dayNight !== 'auto'));
  }

  /* ---- scene ------------------------------------------------------------- */

  function drawScene() {
    var post = posts[index];
    if (!post) return;

    sceneInfo = window.PixelScene.render(els.scene, {
      date: post.date,
      time: post.time || '12:00',
      slug: post.slug,
      mode: prefs.dayNight
    });

    startTwinkle();
    updateReadout();
  }

  /*
   * Stars breathe on a slow interval. Only the star pixels are repainted, so
   * this costs a handful of 1px fills rather than a full scene rebuild.
   */
  function startTwinkle() {
    clearInterval(twinkleTimer);
    if (!sceneInfo || sceneInfo.isDay || !sceneInfo.stars.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var ctx = els.scene.getContext('2d');
    twinkleTimer = setInterval(function () {
      for (var i = 0; i < 6; i++) {
        var s = sceneInfo.stars[Math.floor(Math.random() * sceneInfo.stars.length)];
        if (!s) continue;
        ctx.fillStyle = Math.random() < 0.5 ? sceneInfo.skyColour : sceneInfo.starColour;
        ctx.fillRect(s[0], s[1], 1, 1);
      }
    }, 420);
  }

  function updateReadout() {
    var post = posts[index];
    if (!post || !sceneInfo) return;

    var n = String(index + 1);
    var total = String(posts.length);
    while (n.length < total.length) n = '0' + n;

    var lamp = sceneInfo.isDay ? LAMP_DAY : LAMP_NIGHT;
    var guessed = post.timeGuessed ? '~' : '';

    els.readout.innerHTML =
      'CH <b>' + n + '</b>/' + total +
      ' <span class="sep">|</span> ' + post.date +
      ' ' + sceneInfo.dayName +
      ' ' + guessed + (post.time || '12:00') +
      ' <span class="sep">|</span> <span class="lamp">' + lamp + '</span> ' +
      (sceneInfo.isDay ? 'DAY' : 'NIGHT');
  }

  /* ---- channel-change static --------------------------------------------- */

  function burstStatic(swap) {
    if (prefs.fx !== 'on' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      swap();
      return;
    }

    var canvas = els.static;
    var w = Math.max(1, Math.ceil(els.frame.clientWidth / 4));
    var h = Math.max(1, Math.ceil(els.frame.clientHeight / 4));
    canvas.width = w;
    canvas.height = h;

    var ctx = canvas.getContext('2d');
    var img = ctx.createImageData(w, h);
    var frames = 8;
    var swapped = false;

    document.body.classList.add('is-switching');

    function frame() {
      var d = img.data;
      for (var i = 0; i < d.length; i += 4) {
        var v = Math.random() < 0.5 ? 0 : 190 + Math.floor(Math.random() * 65);
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 235;
      }
      ctx.putImageData(img, 0, 0);

      /* horizontal tear bands, like a roll losing sync */
      for (var b = 0; b < 3; b++) {
        var y = Math.floor(Math.random() * h);
        var bh = 1 + Math.floor(Math.random() * 3);
        ctx.fillStyle = Math.random() < 0.5 ? '#000' : '#fff';
        ctx.fillRect(0, y, w, bh);
      }

      /* swap the content under the noise, on the first covered frame */
      if (!swapped) {
        swapped = true;
        swap();
      }

      if (--frames > 0) {
        requestAnimationFrame(frame);
      } else {
        document.body.classList.remove('is-switching');
      }
    }

    requestAnimationFrame(frame);
  }

  /* ---- posts ------------------------------------------------------------- */

  function stripFrontMatter(text) {
    var m = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    return { meta: m ? m[1] : '', body: m ? m[2] : text };
  }

  function fetchPost(slug) {
    if (cache[slug]) return cache[slug];

    cache[slug] = fetch('posts/' + slug + '.md')
      .then(function (r) {
        if (!r.ok) throw new Error(String(r.status));
        return r.text();
      })
      .then(stripFrontMatter)
      .catch(function (err) {
        delete cache[slug];
        throw err;
      });

    return cache[slug];
  }

  function prefetchNeighbours() {
    [index - 1, index + 1, index + 2].forEach(function (i) {
      if (posts[i]) fetchPost(posts[i].slug).catch(function () {});
    });
  }

  function renderPost() {
    var post = posts[index];
    if (!post) return;

    document.title = post.title + ' | 54chi';
    els.prev.disabled = els.edgePrev.disabled = index <= 0;
    els.next.disabled = els.edgeNext.disabled = index >= posts.length - 1;

    fetchPost(post.slug).then(function (data) {
      if (posts[index] !== post) return; /* navigated away mid-fetch */

      var tags = (post.tags || []).length
        ? '<span class="sep">|</span> ' + post.tags.join(' ')
        : '';

      els.article.innerHTML =
        '<p class="post__meta">' + post.date + tags + '</p>' +
        '<h1>' + escapeHtml(post.title) + '</h1>' +
        window.marked.parse(data.body) +
        '<p class="post__end">-- END OF TRANSMISSION --</p>';

      els.scroll.scrollTop = 0;
      prefetchNeighbours();
    }).catch(function () {
      els.article.innerHTML =
        '<p class="notice">SIGNAL LOST<br>could not load ' + escapeHtml(post.slug) + '</p>';
    });
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function go(nextIndex, pushHash) {
    if (nextIndex < 0 || nextIndex >= posts.length || nextIndex === index) return;

    index = nextIndex;
    if (pushHash !== false) {
      history.replaceState(null, '', '#' + posts[index].slug);
    }

    burstStatic(function () {
      renderPost();
      drawScene();
    });
  }

  /* ---- boot sequence ----------------------------------------------------- */

  function boot(then) {
    var seen = false;
    try { seen = sessionStorage.getItem('54chi.booted') === '1'; } catch (e) {}

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (seen || reduced || prefs.fx !== 'on') {
      els.boot.hidden = true;
      then();
      return;
    }

    try { sessionStorage.setItem('54chi.booted', '1'); } catch (e) {}

    var lines = [
      '54CHI BROADCAST SYSTEM',
      'MEMORY OK ......... 640K',
      'POSTS DETECTED .... ' + posts.length,
      'TUNING ...'
    ];

    var i = 0;
    els.boot.hidden = false;
    els.boot.textContent = '';

    var timer = setInterval(function () {
      if (i < lines.length) {
        els.boot.textContent += lines[i++] + '\n';
      } else {
        finish();
      }
    }, 130);

    function finish() {
      clearInterval(timer);
      document.removeEventListener('keydown', skip);
      els.boot.hidden = true;
      then();
    }

    function skip() { finish(); }

    document.addEventListener('keydown', skip, { once: true });
    els.boot.addEventListener('click', finish, { once: true });
  }

  /* ---- input ------------------------------------------------------------- */

  function bindInput() {
    document.addEventListener('keydown', function (e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (!els.boot.hidden) return; /* boot sequence owns the keyboard */

      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (!els.help.hidden && e.key !== '?') {
        els.help.hidden = true;
        if (e.key === 'Escape') { e.preventDefault(); return; }
      }

      switch (e.key) {
        case 'ArrowLeft':  e.preventDefault(); go(index - 1); break;
        case 'ArrowRight': e.preventDefault(); go(index + 1); break;
        case 'Home':       e.preventDefault(); go(0); break;
        case 'End':        e.preventDefault(); go(posts.length - 1); break;
        case '?':          e.preventDefault(); els.help.hidden = !els.help.hidden; break;
        case 'd': case 'D': cycleDayNight(); break;
        case 'c': case 'C': toggleFx(); break;
        default: break;
      }
    });

    els.prev.addEventListener('click', function () { go(index - 1); });
    els.next.addEventListener('click', function () { go(index + 1); });
    els.edgePrev.addEventListener('click', function () { go(index - 1); });
    els.edgeNext.addEventListener('click', function () { go(index + 1); });
    els.fxBtn.addEventListener('click', toggleFx);
    els.dnBtn.addEventListener('click', cycleDayNight);
    els.help.addEventListener('click', function () { els.help.hidden = true; });

    /* swipe */
    var startX = null;
    var startY = null;
    els.frame.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    }, { passive: true });

    els.frame.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      startX = startY = null;
      if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
      go(dx > 0 ? index - 1 : index + 1);
    }, { passive: true });

    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(drawScene, 150);
    });

    window.addEventListener('hashchange', function () {
      var i = indexOfSlug(location.hash.slice(1));
      if (i >= 0) go(i, false);
    });
  }

  function toggleFx() {
    prefs.fx = prefs.fx === 'on' ? 'off' : 'on';
    write('54chi.fx', prefs.fx);
    applyFx();
  }

  function cycleDayNight() {
    prefs.dayNight = { auto: 'day', day: 'night', night: 'auto' }[prefs.dayNight];
    write('54chi.dn', prefs.dayNight);
    applyDayNightButton();
    drawScene();
  }

  function indexOfSlug(slug) {
    if (!slug) return -1;
    for (var i = 0; i < posts.length; i++) {
      if (posts[i].slug === slug) return i;
    }
    return -1;
  }

  /* ---- start ------------------------------------------------------------- */

  applyFx();
  applyDayNightButton();

  fetch('posts.json')
    .then(function (r) { return r.json(); })
    .then(function (list) {
      posts = list.slice().sort(function (a, b) {
        var ka = a.date + ' ' + (a.time || '12:00');
        var kb = b.date + ' ' + (b.time || '12:00');
        return ka < kb ? 1 : ka > kb ? -1 : 0;
      });

      if (!posts.length) throw new Error('empty');

      var wanted = indexOfSlug(decodeURIComponent(location.hash.slice(1)));
      index = wanted >= 0 ? wanted : 0;

      bindInput();
      boot(function () {
        renderPost();
        drawScene();
      });
    })
    .catch(function () {
      els.boot.hidden = true;
      els.article.innerHTML = '<p class="notice">NO SIGNAL<br>could not load posts.json</p>';
    });
})();
