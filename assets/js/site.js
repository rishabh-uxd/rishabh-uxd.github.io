/* ==========================================================================
   site.js  v2
   Progressive enhancement only. Every effect here is additive: with JS off
   the page is complete, readable, and fully navigable.

   Contents
     1. setup            adds .js-motion so CSS may hide things
     2. splitWords       word-by-word entrance for [data-split]
     3. reveals          IntersectionObserver for .reveal / .reveal-pop / .reveal-stagger
     4. countUp          stat numbers animate when their band scrolls in
     5. scrollProgress   top progress bar + nav glass state
     6. pointerFx        card tilt and hero blob parallax
     7. year             footer copyright
   ========================================================================== */

(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* 1. setup ------------------------------------------------------------- */
  // Only now is it safe for CSS to start elements at opacity 0.
  document.documentElement.classList.add('js-motion');

  /* 2. splitWords -------------------------------------------------------- */
  // Wraps each word in <span class="word"><span>word</span></span> so the
  // inner span can slide up from behind the clipped outer one. Inline
  // elements (the gradient span) are preserved and split in place.
  function splitWords(root) {
    var i = 0;

    function walk(node) {
      var kids = Array.prototype.slice.call(node.childNodes);

      kids.forEach(function (child) {
        if (child.nodeType === 3) {
          var words = child.nodeValue.split(/(\s+)/);
          var frag = document.createDocumentFragment();

          words.forEach(function (word) {
            if (!word) return;
            if (/^\s+$/.test(word)) {
              frag.appendChild(document.createTextNode(' '));
              return;
            }
            var outer = document.createElement('span');
            outer.className = 'word';
            var inner = document.createElement('span');
            inner.style.setProperty('--wi', i++);
            inner.textContent = word;
            outer.appendChild(inner);
            frag.appendChild(outer);
          });

          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          // background-clip: text does not paint behind descendants that create
          // their own layer, so a gradient span is animated whole, not per word.
          if (child.classList.contains('grad-text')) {
            var wrap = document.createElement('span');
            wrap.className = 'word';
            var lift = document.createElement('span');
            lift.style.setProperty('--wi', i++);
            node.replaceChild(wrap, child);
            lift.appendChild(child);
            wrap.appendChild(lift);
            return;
          }
          walk(child);
        }
      });
    }

    walk(root);
  }

  if (!reduced.matches) {
    document.querySelectorAll('[data-split]').forEach(splitWords);
  }

  /* 3. reveals ----------------------------------------------------------- */
  var staggerParents = document.querySelectorAll('.reveal-stagger');
  staggerParents.forEach(function (parent) {
    Array.prototype.forEach.call(parent.children, function (child, i) {
      child.style.setProperty('--i', i);
    });
  });

  var revealTargets = document.querySelectorAll('.reveal, .reveal-pop, .reveal-stagger');

  if (!('IntersectionObserver' in window) || reduced.matches) {
    revealTargets.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      });
      // threshold stays 0: a ratio threshold is unsatisfiable for any element
      // taller than viewportHeight / threshold, which silently left whole
      // sections at opacity 0 (the Screens section of a case study is ~7250px).
      // The -12% bottom rootMargin already delays the trigger to 88% of the
      // viewport, so it is the only gate we need.
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

  /* 4. countUp ----------------------------------------------------------- */
  // Animates the first number inside the element and leaves the rest of the
  // string alone, so "1.6M" and "4 in 10" both work. The final text is always
  // the authored text, so a failed animation can never change the number.
  function countUp(el) {
    var finalText = el.textContent;
    var match = finalText.match(/-?[\d,]+(\.\d+)?/);
    if (!match) return;

    var raw = match[0];
    var target = parseFloat(raw.replace(/,/g, ''));
    if (isNaN(target)) return;

    var decimals = (raw.split('.')[1] || '').length;
    var grouped = raw.indexOf(',') > -1;
    var before = finalText.slice(0, match.index);
    var after = finalText.slice(match.index + raw.length);
    var start = performance.now();
    var dur = 1100;

    function format(n) {
      var s = n.toFixed(decimals);
      if (grouped) s = Number(s).toLocaleString('en-US');
      return before + s + after;
    }

    function frame(now) {
      var t = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = t < 1 ? format(target * eased) : finalText;
      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  var counters = document.querySelectorAll('[data-count]');

  if (counters.length && 'IntersectionObserver' in window && !reduced.matches) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* 5. scrollProgress ---------------------------------------------------- */
  var bar = document.querySelector('.progress__fill');
  var nav = document.querySelector('.nav');
  var ticking = false;

  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var pct = max > 0 ? window.scrollY / max : 0;

    if (bar) bar.style.transform = 'scaleX(' + pct.toFixed(4) + ')';
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 24);

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onScroll);
  }, { passive: true });

  onScroll();

  /* 6. pointerFx --------------------------------------------------------- */
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (fine.matches && !reduced.matches) {
    // Card tilt. Small angles only, so text stays legible.
    document.querySelectorAll('.project').forEach(function (card) {
      var media = card.querySelector('.project__media');
      if (!media) return;

      card.addEventListener('pointermove', function (e) {
        var r = media.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        media.style.transform =
          'perspective(900px) rotateY(' + (x * 5).toFixed(2) + 'deg) rotateX(' +
          (-y * 5).toFixed(2) + 'deg) scale(1.012)';
      });

      card.addEventListener('pointerleave', function () {
        media.style.transform = '';
      });
    });

    // Hero aurora drifts a little with the pointer, on top of its own
    // keyframe animation, via a translate applied to the wrapper.
    var aurora = document.querySelector('.hero .aurora');
    if (aurora) {
      var pending = false;
      var px = 0, py = 0;

      window.addEventListener('pointermove', function (e) {
        px = (e.clientX / window.innerWidth - 0.5) * 34;
        py = (e.clientY / window.innerHeight - 0.5) * 24;
        if (pending) return;
        pending = true;
        requestAnimationFrame(function () {
          aurora.style.translate = px.toFixed(1) + 'px ' + py.toFixed(1) + 'px';
          pending = false;
        });
      }, { passive: true });
    }
  }

  /* 7. year -------------------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* 8a. prototype embeds: fit the frame to its content -------------------
     A .proto-embed--wide holds a prototype that draws its own device frame, so its
     height can come neither from an aspect ratio nor from CSS: the content height
     is set by a fixed-width phone frame, so it does not track the embed's width,
     and it steps as that frame zooms. The --proto-h tokens can therefore only ever
     be per-band worst cases, which left up to 150px of dead background under the
     phone. The frame is same-origin, so measure the real document instead.

     It refits in both directions, so a shorter treatment is not left sitting over
     dead background. Safe to shrink because the prototype's own controls are at the
     top of the frame: changing its height moves its bottom edge and the caption
     below it, never the control the visitor just used.

     Measured from the body box, not documentElement.scrollHeight: scrollHeight is
     floored at the viewport, so while the embed is still at its CSS height it would
     report that height straight back and the fit would never tighten.

     try/catch because over file:// Chrome treats the iframe as a separate opaque
     origin and contentDocument throws. The CSS tokens stay as the fallback and are
     measured never to scroll, so that case degrades to surplus, not a scrollbar. */
  /* The embed is sized to one screenful: as tall as the viewport leaves under the
     fixed nav, which owns the top 80px of every viewport because it is position:
     fixed. So the heading, the two selects and the whole phone are visible together
     without scrolling, at every window size, which is what "use the space" means
     for something a visitor has to operate rather than read.

     FILL is 1 and it is a calibration, not a taste judgement. On a 2560x1440
     monitor, the size the user said looked right, the embed came out 1259px tall in
     the 1240px the nav leaves: it was already filling exactly one screenful there,
     to within 2%. What was wrong was that it got there by accident, through a zoom
     keyed to the embed's WIDTH, so a 16-inch MacBook Pro was handed the same 1259px
     in 920px of room and a 14-inch the same again in 780.

     ZMAX is the prototype's own cap and the reason for it is in that file: its WebP
     assets are encoded at 3.0x, so past 1.35 the product images start to soften.
     ZMIN is its narrow-embed floor.

     PHONE_W is the frame's border-box width at 1x, and with GUTTER it caps the zoom
     by width so an enlarged phone can never overflow the embed sideways. 96 rather
     than .proto-wrap's 20px of padding, because that padding is not the whole of
     what the prototype leaves itself: back-solving its own bands gives 340 - 0.62 x
     393 = 96px of clear width at its narrowest and more at every other step, so 96
     is the tightest it ever chooses to run. Allowing only the padding let a 390px
     viewport push the phone to 0.79 and nearly edge to edge, which is not what that
     band was for. At 96 the width cap reproduces the 0.62 band exactly at 390 and
     never binds from about 560px of embed up, where height takes over. */
  var PROTO_FILL = 1, PROTO_ZMAX = 1.35, PROTO_ZMIN = 0.62,
      PROTO_PHONE_W = 393, PROTO_GUTTER = 96;

  function fitEmbed(box) {
    var frame = box.querySelector('iframe');
    if (!frame) return;
    var fitted = 0;
    var zoomed = 0;

    /* Only the phone frame zooms; the heading, the intro line and the two selects
       above it do not. So the embed's height is surround + zoom * phoneNat, and the
       zoom that fills a given height is (target - surround) / phoneNat. Both terms
       are measured off the live document rather than assumed: the surround grows
       when the selects wrap at a narrow embed, and phoneNat is read back through
       whatever zoom is in force so it does not matter which of the prototype's own
       width bands picked it. The frame is found by which one has a box rather than
       by a panel class, so it does not matter which treatment is on show either.

       A one-shot solve, not an iteration, because the surround does not depend on the
       zoom. That is also why this cannot fight the height fit below: the zoom is
       computed from the viewport and the embed's width, never from the height that
       fit() writes. */
    function zoomToFit(doc) {
      var frames = doc.querySelectorAll('.phone-frame'), phone = null, i;
      for (i = 0; i < frames.length; i++) {
        if (frames[i].getBoundingClientRect().height > 0) { phone = frames[i]; break; }
      }
      if (!phone) return;
      var at = parseFloat(getComputedStyle(phone).zoom) || 1;
      var ph = phone.getBoundingClientRect().height;
      var nat = ph / at;
      if (nat < 100) return;                  /* not laid out yet */
      var surround = doc.body.getBoundingClientRect().height - ph;
      var nav = document.querySelector('.nav');
      var under = nav ? nav.getBoundingClientRect().bottom : 0;
      var room = (window.innerHeight - under) * PROTO_FILL - surround;
      var z = Math.min(room / nat,
                       (box.clientWidth - PROTO_GUTTER) / PROTO_PHONE_W,
                       PROTO_ZMAX);
      z = Math.round(Math.max(z, PROTO_ZMIN) * 100) / 100;
      if (Math.abs(z - zoomed) < 0.01) return;  /* dead band, so it cannot churn */
      zoomed = z;
      doc.documentElement.style.setProperty('--proto-zoom', z);
    }

    function fit() {
      try {
        var doc = frame.contentDocument;
        if (!doc || !doc.body) return;
        zoomToFit(doc);
        var rect = doc.body.getBoundingClientRect();
        var scrolled = doc.documentElement.scrollTop || doc.body.scrollTop || 0;
        var below = parseFloat(getComputedStyle(doc.body).marginBottom) || 0;
        var h = Math.ceil(rect.bottom + scrolled + below);
        if (h < 200) return;                  /* not laid out yet */
        if (Math.abs(h - fitted) < 2) return; /* dead band, so it cannot churn */
        fitted = h;
        box.style.height = h + 'px';
      } catch (e) { /* cross-origin: keep the CSS height */ }
    }

    function start() {
      fit();
      /* Re-fit when the prototype swaps what it is showing, or when a resize
         reflows it. Observing the embedded body catches both. */
      try {
        if (window.ResizeObserver && frame.contentDocument) {
          new ResizeObserver(fit).observe(frame.contentDocument.body);
        }
      } catch (e) { /* cross-origin */ }

      /* And on the window, because the observer above cannot see this one: a resize
         that changes only the window's HEIGHT leaves the embed's width alone, so the
         embedded body never reflows and never reports anything, while the height the
         zoom is solved against has just changed. One rAF so a drag coalesces. */
      var queued = false;
      window.addEventListener('resize', function () {
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () { queued = false; fit(); });
      });
    }

    /* The load event may already have fired: this embed carries its src in the
       markup, and a back-navigation can restore it complete. */
    var ready = false;
    try {
      ready = !!frame.contentDocument
        && frame.contentDocument.readyState === 'complete'
        && frame.contentDocument.body
        && frame.contentDocument.body.childElementCount > 0;
    } catch (e) { ready = false; }
    if (ready) start();
    frame.addEventListener('load', start);
  }

  document.querySelectorAll('.proto-embed--wide').forEach(fitEmbed);

  /* 8b. prototype embeds behind a play cover -----------------------------
     The other shape: an <iframe> whose real URL sits in data-src, loaded only when
     the cover button is pressed. For a prototype heavy enough that arriving in it
     unannounced would be worse than asking. Basket Building does not use this, it
     runs on arrival; the code is here because .proto-embed--pending and the plain
     .proto-embed variant still expect it. With JS off the cover stays put and the
     link beside it still opens the prototype in a new tab. */
  document.querySelectorAll('.proto-embed[data-src]').forEach(function (box) {
    var cover = box.querySelector('.proto-embed__cover');
    var frame = box.querySelector('iframe');
    if (!cover || !frame) return;

    cover.addEventListener('click', function () {
      if (box.classList.contains('is-live')) return;
      frame.setAttribute('src', box.getAttribute('data-src'));
      box.classList.add('is-live');
      /* Move focus into the prototype so a keyboard visitor lands inside the
         thing they just started, not back at the top of the page. */
      frame.addEventListener('load', function () { frame.focus(); }, { once: true });
    });
  });
})();
