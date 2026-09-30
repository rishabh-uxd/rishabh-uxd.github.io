
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.documentElement.classList.add('js-motion');

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
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });

    revealTargets.forEach(function (el) { revealObserver.observe(el); });
  }

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

  var fine = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (fine.matches && !reduced.matches) {
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

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  var PROTO_FILL = 1, PROTO_ZMAX = 1.35, PROTO_ZMIN = 0.62,
      PROTO_PHONE_W = 393, PROTO_GUTTER = 96;

  function fitEmbed(box) {
    var frame = box.querySelector('iframe');
    if (!frame) return;
    var fitted = 0;
    var zoomed = 0;

    function zoomToFit(doc) {
      var frames = doc.querySelectorAll('.phone-frame'), phone = null, i;
      for (i = 0; i < frames.length; i++) {
        if (frames[i].getBoundingClientRect().height > 0) { phone = frames[i]; break; }
      }
      if (!phone) return;
      var at = parseFloat(getComputedStyle(phone).zoom) || 1;
      var ph = phone.getBoundingClientRect().height;
      var nat = ph / at;
      if (nat < 100) return;
      var surround = doc.body.getBoundingClientRect().height - ph;
      var nav = document.querySelector('.nav');
      var under = nav ? nav.getBoundingClientRect().bottom : 0;
      var room = (window.innerHeight - under) * PROTO_FILL - surround;
      var z = Math.min(room / nat,
                       (box.clientWidth - PROTO_GUTTER) / PROTO_PHONE_W,
                       PROTO_ZMAX);
      z = Math.round(Math.max(z, PROTO_ZMIN) * 100) / 100;
      if (Math.abs(z - zoomed) < 0.01) return;
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
        if (h < 200) return;
        if (Math.abs(h - fitted) < 2) return;
        fitted = h;
        box.style.height = h + 'px';
      } catch (e) {  }
    }

    function start() {
      fit();
      try {
        if (window.ResizeObserver && frame.contentDocument) {
          new ResizeObserver(fit).observe(frame.contentDocument.body);
        }
      } catch (e) {  }

      var queued = false;
      window.addEventListener('resize', function () {
        if (queued) return;
        queued = true;
        requestAnimationFrame(function () { queued = false; fit(); });
      });
    }

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

  document.querySelectorAll('.proto-embed[data-src]').forEach(function (box) {
    var cover = box.querySelector('.proto-embed__cover');
    var frame = box.querySelector('iframe');
    if (!cover || !frame) return;

    cover.addEventListener('click', function () {
      if (box.classList.contains('is-live')) return;
      frame.setAttribute('src', box.getAttribute('data-src'));
      box.classList.add('is-live');
      frame.addEventListener('load', function () { frame.focus(); }, { once: true });
    });
  });
})();
