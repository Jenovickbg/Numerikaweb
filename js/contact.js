/** Numerika360 — Objet de prise de contact, sans collecte sur le site. */
(function () {
  "use strict";
  var emailLink = document.getElementById("contact-email");
  var context = document.getElementById("contact-context");
  if (!emailLink || !context) return;
  var subjects = {
    digital: "Digital & Software",
    intelligence: "Intelligence artificielle",
    infrastructure: "Infrastructure & Sécurité",
    formation: "Formation & Accompagnement",
    conseil: "Conseil & Consultance",
    network: "Numerika360 Network"
  };
  var key = new URLSearchParams(window.location.search).get("sujet");
  if (!Object.prototype.hasOwnProperty.call(subjects, key)) return;
  context.textContent = subjects[key];
  emailLink.href = "mailto:contact@numerika360sarl.com?subject=" + encodeURIComponent(subjects[key]);
})();
