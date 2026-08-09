/**
 * Numerika360 — Navigation + ancres (single-page)
 */
(function () {
  "use strict";

  var header = document.querySelector(".header");
  var toggle = document.querySelector(".nav__toggle");
  var mobile = document.querySelector(".nav__mobile");
  var mobileLinks = document.querySelectorAll(".nav__mobile-link");
  var body = document.body;
  var navLinks = document.querySelectorAll('.nav__link[href^="#"], .nav__mobile-link[href^="#"]');
  var sections = [];

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
    if (header) header.classList.add("is-menu-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Fermer le menu");
    body.style.overflow = "hidden";
  }

  function closeMenu() {
    if (!mobile || !toggle) return;
    mobile.classList.remove("is-open");
    if (header) header.classList.remove("is-menu-open");
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

  function collectSections() {
    sections = [];
    document.querySelectorAll(".nav__link[href^='#']").forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el) sections.push({ id: id, el: el, link: link });
    });
  }

  function setActiveNav() {
    if (!sections.length) return;
    var offset = (header ? header.offsetHeight : 72) + 40;
    var current = null;
    var y = window.scrollY + offset;

    sections.forEach(function (item) {
      if (item.el.offsetTop <= y) current = item.id;
    });

    document.querySelectorAll(".nav__link[href^='#'], .nav__mobile-link[href^='#']").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === "#" + current) {
        link.classList.add("is-active");
      } else {
        link.classList.remove("is-active");
      }
    });
  }

  setScrolled();
  collectSections();
  setActiveNav();

  window.addEventListener(
    "scroll",
    function () {
      setScrolled();
      setActiveNav();
    },
    { passive: true }
  );

  if (toggle) {
    toggle.addEventListener("click", toggleMenu);
  }

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeMenu();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) closeMenu();
  });
})();
