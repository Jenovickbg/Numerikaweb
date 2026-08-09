/**
 * Numerika360 — Scroll animations (IntersectionObserver)
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    document.querySelectorAll(".reveal, .reveal-scale").forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var targets = document.querySelectorAll(".reveal, .reveal-scale");

  if (!("IntersectionObserver" in window) || !targets.length) {
    targets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12
    }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
