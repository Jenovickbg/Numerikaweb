/**
 * Numerika360 — Contact form validation
 * Frontend-only for now. Ready for future backend / email service.
 */
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  if (!form) return;

  var success = document.getElementById("form-success");
  var fields = {
    name: form.querySelector("#name"),
    company: form.querySelector("#company"),
    email: form.querySelector("#email"),
    phone: form.querySelector("#phone"),
    subject: form.querySelector("#subject"),
    message: form.querySelector("#message")
  };

  function getGroup(input) {
    return input ? input.closest(".form__group") : null;
  }

  function setInvalid(input, message) {
    var group = getGroup(input);
    if (!group) return;
    group.classList.add("is-invalid");
    var err = group.querySelector(".form__error");
    if (err && message) err.textContent = message;
  }

  function clearInvalid(input) {
    var group = getGroup(input);
    if (group) group.classList.remove("is-invalid");
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validate() {
    var valid = true;

    Object.keys(fields).forEach(function (key) {
      clearInvalid(fields[key]);
    });

    if (!fields.name.value.trim()) {
      setInvalid(fields.name, "Veuillez indiquer votre nom.");
      valid = false;
    }

    if (!fields.email.value.trim()) {
      setInvalid(fields.email, "Veuillez indiquer votre email.");
      valid = false;
    } else if (!isEmail(fields.email.value.trim())) {
      setInvalid(fields.email, "Adresse email invalide.");
      valid = false;
    }

    if (!fields.subject.value) {
      setInvalid(fields.subject, "Veuillez sélectionner un sujet.");
      valid = false;
    }

    if (!fields.message.value.trim() || fields.message.value.trim().length < 10) {
      setInvalid(fields.message, "Votre message doit contenir au moins 10 caractères.");
      valid = false;
    }

    return valid;
  }

  Object.keys(fields).forEach(function (key) {
    var input = fields[key];
    if (!input) return;
    input.addEventListener("input", function () {
      clearInvalid(input);
    });
    input.addEventListener("change", function () {
      clearInvalid(input);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validate()) {
      var firstInvalid = form.querySelector(".form__group.is-invalid .form__input, .form__group.is-invalid .form__textarea, .form__group.is-invalid .form__select");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    /* Payload ready for future API integration:
       {
         name, company, email, phone, subject, message
       }
    */
    var payload = {
      name: fields.name.value.trim(),
      company: fields.company.value.trim(),
      email: fields.email.value.trim(),
      phone: fields.phone.value.trim(),
      subject: fields.subject.value,
      message: fields.message.value.trim()
    };

    // Placeholder: log payload until backend is connected
    if (typeof console !== "undefined" && console.info) {
      console.info("[Numerika360] Message préparé (non envoyé) :", payload);
    }

    form.reset();
    if (success) {
      success.classList.add("is-visible");
      success.setAttribute("role", "status");
      success.focus && success.focus();
    }

    window.setTimeout(function () {
      if (success) success.classList.remove("is-visible");
    }, 8000);
  });
})();
