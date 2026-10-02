/** Numerika360 — Année de copyright. */
(function () {
  "use strict";
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
