/**
 * Numerika360 — Main
 * Hero particles / network canvas (lightweight)
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Year in footer (if needed) ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Hero particle canvas ---------- */
  function initHeroCanvas() {
    var canvas = document.getElementById("hero-canvas");
    if (!canvas || reduceMotion) return;

    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var particles = [];
    var raf = null;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      var parent = canvas.parentElement;
      var w = parent.clientWidth;
      var h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildParticles(w, h);
    }

    function buildParticles(w, h) {
      var count = Math.min(48, Math.floor((w * h) / 22000));
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.4 + 0.4
        });
      }
    }

    function draw() {
      var w = canvas.clientWidth;
      var h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100, 116, 139, 0.4)";
        ctx.fill();

        for (var j = i + 1; j < particles.length; j++) {
          var q = particles[j];
          var dx = p.x - q.x;
          var dy = p.y - q.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "rgba(37, 99, 235, " + (0.14 * (1 - dist / 120)) + ")";
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        draw();
      }
    });
  }

  /* ---------- Network visual canvas ---------- */
  function initNetworkCanvas() {
    var canvas = document.getElementById("network-canvas");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var nodes = [];
    var raf = null;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var reduce = reduceMotion;

    function resize() {
      var parent = canvas.parentElement;
      var w = parent.clientWidth;
      var h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build(w, h);
    }

    function build(w, h) {
      var count = Math.min(36, Math.floor(w / 28));
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: Math.random() * 2 + 1.2
        });
      }
    }

    function frame() {
      var w = canvas.clientWidth;
      var h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        if (!reduce) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = i % 5 === 0 ? "rgba(8, 145, 178, 0.55)" : "rgba(37, 99, 235, 0.45)";
        ctx.fill();

        for (var j = i + 1; j < nodes.length; j++) {
          var m = nodes[j];
          var dx = n.x - m.x;
          var dy = n.y - m.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = "rgba(100, 116, 139, " + (0.22 * (1 - dist / 140)) + ")";
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      if (!reduce) {
        raf = requestAnimationFrame(frame);
      }
    }

    resize();
    frame();

    var t;
    window.addEventListener("resize", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        cancelAnimationFrame(raf);
        resize();
        frame();
      }, 150);
    });
  }

  initHeroCanvas();
  initNetworkCanvas();
})();
