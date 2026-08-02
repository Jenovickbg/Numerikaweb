/**
 * Numerika360 — Navigation
 */
(function () {
  "use strict";

  var header = document.querySelector(".header");
  var toggle = document.querySelector(".nav__toggle");
  var mobile = document.querySelector(".nav__mobile");
  var mobileLinks = document.querySelectorAll(".nav__mobile-link");
  var body = document.body;

  function setScrolled() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  function openMenu() {
    if (!mobile || !toggle) return;
    mobile.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fermer le menu");
    body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!mobile || !toggle) return;
    mobile.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
    body.style.overflow = "";
  }

  function toggleMenu() {
    if (!mobile) return;
    if (mobile.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });

  if (toggle) {
    toggle.addEventListener("click", toggleMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) closeMenu();
  });
})();
