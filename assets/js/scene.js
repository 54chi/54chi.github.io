/*
 * PixelScene — procedural pixel-art skies for 54chi.
 *
 * Everything is drawn at "art resolution" (one canvas pixel == one art pixel)
 * and scaled up by an integer factor with image-rendering: pixelated, so no
 * pixel is ever blurred or anti-aliased. Gradients are ordered-dithered with a
 * Bayer matrix rather than interpolated, which keeps the whole thing readable
 * as pixel art instead of a smooth CSS gradient wearing a costume.
 *
 * Scene = palette (day of week) + day/night + a seeded horizon (post slug),
 * so every post has a stable, unique-looking sky it keeps forever.
 */
(function (global) {
  'use strict';

  /* 4x4 ordered dither. Values 0..15, compared against a 0..1 blend factor. */
  var BAYER = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5]
  ];

  var DAY_NAMES = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  /*
   * One palette per day of week. `sky` runs top -> horizon and is dithered
   * between adjacent entries. Colours are deliberately few and flat.
   */
  var PALETTES = [
    { /* SUN — warm rose */
      day:   { sky: ['#4fa8d8', '#8fd0e8', '#ffd9a0', '#ffb877'],
               body: '#fff4c2', bodyAlt: '#ffcf6b',
               cloud: ['#fffdf5', '#e2b9c8'],
               land: ['#8a5f7a', '#5d3d5c', '#33203a'] },
      night: { sky: ['#160d24', '#2a1440', '#4b2050', '#7a2f52'],
               body: '#ffe9c9', bodyAlt: '#c9a97f', star: '#ffe9f2',
               land: ['#3a2044', '#241230', '#12081c'] }
    },
    { /* MON — cold steel */
      day:   { sky: ['#2f6f9e', '#5b9dc4', '#9ec9dc', '#cfe4e8'],
               body: '#fbfbe8', bodyAlt: '#cdd7c2',
               cloud: ['#ffffff', '#a8bcc8'],
               land: ['#5c7284', '#3b4c5c', '#1e2833'] },
      night: { sky: ['#080e1c', '#101d33', '#1c3050', '#2c4a68'],
               body: '#dfe9ff', bodyAlt: '#98a8c4', star: '#cfe0ff',
               land: ['#22364e', '#152232', '#0a111b'] }
    },
    { /* TUE — moss green */
      day:   { sky: ['#3f9bbd', '#79c3cc', '#bfe0bd', '#eaf0b8'],
               body: '#fbffd8', bodyAlt: '#d6e07a',
               cloud: ['#fbfff2', '#a9c4a0'],
               land: ['#5f8058', '#3d5a3a', '#1f321f'] },
      night: { sky: ['#04140f', '#0a2418', '#123526', '#1e4a30'],
               body: '#e8ffe2', bodyAlt: '#9cbf9c', star: '#dbffd8',
               land: ['#1d3d2b', '#122619', '#07130d'] }
    },
    { /* WED — teal */
      day:   { sky: ['#1f7f9c', '#3fa8bd', '#84cfd2', '#c8ebe2'],
               body: '#f4ffee', bodyAlt: '#b9dfc2',
               cloud: ['#ffffff', '#93bfc0'],
               land: ['#3f7a80', '#265257', '#123033'] },
      night: { sky: ['#03121a', '#07222f', '#0c3546', '#134b5c'],
               body: '#dcfbff', bodyAlt: '#88b6c4', star: '#c8f4ff',
               land: ['#123c48', '#0a252d', '#04121a'] }
    },
    { /* THU — violet */
      day:   { sky: ['#5560b8', '#7f88d0', '#b0aee0', '#e0cfe8'],
               body: '#fff3ff', bodyAlt: '#d6b6e2',
               cloud: ['#fdfaff', '#a99cc8'],
               land: ['#6a5a92', '#453a66', '#241d3a'] },
      night: { sky: ['#0d0620', '#190c34', '#2a134c', '#3f1e66'],
               body: '#f0e2ff', bodyAlt: '#ab93cc', star: '#e8dcff',
               land: ['#2e1d4c', '#1c1030', '#0d0719'] }
    },
    { /* FRI — sunset */
      day:   { sky: ['#3d86c4', '#79b4d8', '#ffc98a', '#ff8f5e'],
               body: '#fff2b0', bodyAlt: '#ffab4a',
               cloud: ['#fff6e8', '#d18a72'],
               land: ['#a05c4e', '#6b3838', '#361c22'] },
      night: { sky: ['#1a0812', '#360f1e', '#5c1a26', '#8c2f2c'],
               body: '#ffe4c0', bodyAlt: '#c98f68', star: '#ffdccf',
               land: ['#4a2028', '#2c1118', '#14070b'] }
    },
    { /* SAT — deep indigo */
      day:   { sky: ['#2b4fa0', '#4f79c4', '#8fa8dc', '#c9d4ec'],
               body: '#ffffff', bodyAlt: '#c2cbe4',
               cloud: ['#ffffff', '#93a2c4'],
               land: ['#4a5a90', '#2f3a62', '#171d36'] },
      night: { sky: ['#03060f', '#080f24', '#101a3d', '#1a2a5c'],
               body: '#e6ecff', bodyAlt: '#8f9cc4', star: '#dfe8ff',
               land: ['#141f44', '#0b122a', '#040713'] }
    }
  ];

  /* ---- helpers ---------------------------------------------------------- */

  function hexToRgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  /* mulberry32 — small, fast, and stable across browsers for a given seed. */
  function makeRandom(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function hashString(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  /*
   * 1D midpoint displacement. Produces a jagged ridgeline that is stable for a
   * given random stream, which is what makes each post's horizon its own.
   */
  function ridgeline(cols, rand, amp, rough) {
    var size = 1;
    while (size < cols) size *= 2;
    size += 1;

    var a = new Float32Array(size);
    a[0] = (rand() - 0.5) * amp;
    a[size - 1] = (rand() - 0.5) * amp;

    var step = size - 1;
    var scale = amp;
    while (step > 1) {
      var half = step >> 1;
      for (var i = half; i < size; i += step) {
        a[i] = (a[i - half] + a[i + half]) / 2 + (rand() * 2 - 1) * scale;
      }
      scale *= rough;
      step = half;
    }
    return a;
  }

  /* ---- painter ----------------------------------------------------------- */

  function Painter(data, cols, rows) {
    this.data = data;
    this.cols = cols;
    this.rows = rows;
  }

  Painter.prototype.px = function (x, y, rgb) {
    if (x < 0 || y < 0 || x >= this.cols || y >= this.rows) return;
    var i = (y * this.cols + x) * 4;
    this.data[i] = rgb[0];
    this.data[i + 1] = rgb[1];
    this.data[i + 2] = rgb[2];
    this.data[i + 3] = 255;
  };

  Painter.prototype.rect = function (x, y, w, h, rgb) {
    for (var yy = y; yy < y + h; yy++) {
      for (var xx = x; xx < x + w; xx++) this.px(xx, yy, rgb);
    }
  };

  Painter.prototype.disc = function (cx, cy, r, rgb) {
    var r2 = r * r;
    for (var y = -r; y <= r; y++) {
      for (var x = -r; x <= r; x++) {
        if (x * x + y * y <= r2) this.px(cx + x, cy + y, rgb);
      }
    }
  };

  /* Dithered ring around a disc — reads as glow without any blur. */
  Painter.prototype.discGlow = function (cx, cy, r, thickness, rgb, rand) {
    var inner = r * r;
    var outer = (r + thickness) * (r + thickness);
    for (var y = -(r + thickness); y <= r + thickness; y++) {
      for (var x = -(r + thickness); x <= r + thickness; x++) {
        var d = x * x + y * y;
        if (d <= inner || d > outer) continue;
        var t = 1 - (Math.sqrt(d) - r) / thickness;
        if (BAYER[(cy + y) & 3][(cx + x) & 3] / 16 < t * 0.8) this.px(cx + x, cy + y, rgb);
      }
    }
  };

  /* ---- scene parts ------------------------------------------------------- */

  function paintSky(p, pal, horizon) {
    var ramp = pal.sky.map(hexToRgb);
    var segments = ramp.length - 1;

    for (var y = 0; y < horizon; y++) {
      var t = (y / horizon) * segments;
      var idx = Math.min(segments - 1, Math.floor(t));
      var frac = t - idx;
      var lo = ramp[idx];
      var hi = ramp[idx + 1];
      for (var x = 0; x < p.cols; x++) {
        p.px(x, y, frac > BAYER[y & 3][x & 3] / 16 ? hi : lo);
      }
    }
  }

  function paintStars(p, pal, horizon, rand, moon) {
    var star = hexToRgb(pal.star);
    var count = Math.round(p.cols * horizon * 0.006);
    var list = [];

    for (var i = 0; i < count; i++) {
      var x = Math.floor(rand() * p.cols);
      var y = Math.floor(rand() * horizon * 0.85);
      /* keep clear of the moon so it stays a clean silhouette */
      if (moon) {
        var dx = x - moon.x;
        var dy = y - moon.y;
        if (dx * dx + dy * dy < (moon.r + 4) * (moon.r + 4)) continue;
      }
      /* fade out toward the horizon */
      if (rand() < y / horizon) continue;
      p.px(x, y, star);
      list.push([x, y]);
    }
    return list;
  }

  function paintSun(p, pal, x, y, r, rand) {
    p.discGlow(x, y, r, Math.round(r * 0.7), hexToRgb(pal.bodyAlt), rand);
    p.disc(x, y, r, hexToRgb(pal.bodyAlt));
    p.disc(x, y, r - 1, hexToRgb(pal.body));
  }

  function paintMoon(p, pal, x, y, r, rand, skyBehind) {
    p.discGlow(x, y, r, Math.round(r * 0.8), hexToRgb(pal.bodyAlt), rand);
    p.disc(x, y, r, hexToRgb(pal.bodyAlt));
    p.disc(x, y, r - 1, hexToRgb(pal.body));

    /* craters */
    var alt = hexToRgb(pal.bodyAlt);
    var craters = 3 + Math.floor(rand() * 3);
    for (var i = 0; i < craters; i++) {
      var a = rand() * Math.PI * 2;
      var d = rand() * (r - 3);
      p.disc(
        Math.round(x + Math.cos(a) * d),
        Math.round(y + Math.sin(a) * d),
        1 + Math.floor(rand() * 2),
        alt
      );
    }

    /* crescent: punch the sky back in with an offset disc */
    if (rand() < 0.55) {
      p.disc(x + Math.round(r * 0.55), y - Math.round(r * 0.35), r - 1, skyBehind);
    }
  }

  function paintClouds(p, pal, horizon, rand) {
    var light = hexToRgb(pal.cloud[0]);
    var dark = hexToRgb(pal.cloud[1]);
    var count = 2 + Math.floor(rand() * 3);

    for (var c = 0; c < count; c++) {
      var cx = Math.floor(rand() * p.cols);
      var cy = Math.floor(horizon * (0.15 + rand() * 0.5));
      var w = Math.round(p.cols * (0.08 + rand() * 0.12));
      var h = Math.max(3, Math.round(w * 0.22));

      /*
       * Stack of bars, widest through the middle rows. Insetting purely by
       * row index instead gives a flat-topped trapezoid that reads as a slab
       * rather than a cloud.
       */
      var mid = (h - 1) / 2;
      for (var row = 0; row < h; row++) {
        var t = mid === 0 ? 0 : Math.abs(row - mid) / mid;
        var inset = Math.round(t * t * w * 0.34);
        var jitter = Math.round((rand() - 0.5) * 3);
        p.rect(cx + inset + jitter, cy + row, Math.max(1, w - inset * 2), 1, light);
      }
      /* one-pixel underside shade */
      p.rect(cx + Math.round(w * 0.22), cy + h, Math.round(w * 0.56), 1, dark);
    }
  }

  function paintLand(p, pal, horizon, rand) {
    var layers = pal.land.map(hexToRgb);

    for (var l = 0; l < layers.length; l++) {
      var depth = l / (layers.length - 1);
      var amp = (horizon * 0.30) * (1 - depth * 0.45);
      var base = horizon + Math.round((p.rows - horizon) * depth * 0.42);
      var ridge = ridgeline(p.cols, rand, amp, 0.55 + depth * 0.08);
      var colour = layers[l];

      for (var x = 0; x < p.cols; x++) {
        var top = Math.round(base - Math.abs(ridge[x]));
        if (top < 0) top = 0;
        for (var y = top; y < p.rows; y++) p.px(x, y, colour);
      }
    }
  }

  /* ---- public ------------------------------------------------------------ */

  /*
   * Renders into `canvas`. opts:
   *   date  'YYYY-MM-DD'   drives the day-of-week palette
   *   time  'HH:MM'        drives day vs night (06:00-17:59 is day)
   *   slug  string         seeds the horizon, clouds, stars
   *   mode  'auto'|'day'|'night'
   *   pixel number         art pixel size in CSS px (default: derived)
   *
   * Returns { isDay, dayName, cols, rows, pixel }.
   */
  function render(canvas, opts) {
    var date = opts.date || '1970-01-01';
    var parts = date.split('-');
    /* Construct in local time; a UTC Date would shift the weekday for anyone
       west of Greenwich, which is exactly where these posts were written. */
    var d = new Date(+parts[0], +parts[1] - 1, +parts[2]);
    var dow = d.getDay();

    var hour = parseInt((opts.time || '12:00').split(':')[0], 10);
    var isDay = hour >= 6 && hour < 18;
    if (opts.mode === 'day') isDay = true;
    else if (opts.mode === 'night') isDay = false;

    var pal = PALETTES[dow][isDay ? 'day' : 'night'];

    var host = canvas.parentNode;
    var vw = Math.max(1, host.clientWidth);
    var vh = Math.max(1, host.clientHeight);

    /* Aim for ~260 art columns, clamped so pixels stay chunky but not absurd. */
    var pixel = opts.pixel || Math.max(3, Math.min(8, Math.round(vw / 260)));
    var cols = Math.ceil(vw / pixel);
    var rows = Math.ceil(vh / pixel);

    canvas.width = cols;
    canvas.height = rows;
    canvas.style.width = cols * pixel + 'px';
    canvas.style.height = rows * pixel + 'px';

    var ctx = canvas.getContext('2d');
    var img = ctx.createImageData(cols, rows);
    var p = new Painter(img.data, cols, rows);

    var rand = makeRandom(hashString((opts.slug || '') + '|' + (isDay ? 'd' : 'n')));
    var horizon = Math.round(rows * (0.62 + rand() * 0.12));

    paintSky(p, pal, horizon);

    var bodyR = Math.max(4, Math.round(Math.min(cols, rows) * 0.055));

    /*
     * Keep the sun/moon out of the middle band: on the deck a centred text
     * slab sits there and swallows it. Pick a side, then a spot within it.
     */
    /* Bands stop short of the centred text column plus the glow radius. */
    var bodyX = Math.round(cols * (rand() < 0.5
      ? 0.05 + rand() * 0.14          /* left band  */
      : 0.95 - rand() * 0.14));       /* right band */
    bodyX = Math.max(bodyR + 2, Math.min(cols - bodyR - 2, bodyX));
    var bodyY = Math.round(horizon * (0.18 + rand() * 0.4));
    var stars = [];

    if (isDay) {
      paintSun(p, pal, bodyX, bodyY, bodyR, rand);
      paintClouds(p, pal, horizon, rand);
    } else {
      stars = paintStars(p, pal, horizon, rand, { x: bodyX, y: bodyY, r: bodyR });
      paintMoon(p, pal, bodyX, bodyY, bodyR, rand, hexToRgb(pal.sky[0]));
    }

    paintLand(p, pal, horizon, rand);
    ctx.putImageData(img, 0, 0);

    return {
      isDay: isDay,
      dayName: DAY_NAMES[dow],
      cols: cols,
      rows: rows,
      pixel: pixel,
      stars: stars,
      starColour: isDay ? null : pal.star,
      skyColour: pal.sky[0]
    };
  }

  global.PixelScene = { render: render, DAY_NAMES: DAY_NAMES };
})(window);
