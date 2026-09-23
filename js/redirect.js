/**
 * Redirection vers une ancre de la page vitrine.
 * Usage : <script src="js/redirect.js" data-to="index.html#offre"></script>
 */
(function () {
  "use strict";
  var script = document.currentScript;
  var target = (script && script.getAttribute("data-to")) || "index.html";
  window.location.replace(target);
})();
