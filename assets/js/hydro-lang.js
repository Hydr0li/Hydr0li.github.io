(function () {
  function setLanguage(lang) {
    var next = lang === "zh" ? "zh" : "en";
    document.documentElement.classList.toggle("lang-zh", next === "zh");
    document.documentElement.classList.toggle("lang-en", next === "en");
    try {
      window.localStorage.setItem("hydro-language", next);
    } catch (error) {
      // localStorage may be disabled in privacy modes.
    }
    var buttons = document.querySelectorAll("[data-set-lang]");
    Array.prototype.forEach.call(buttons, function (button) {
      var active = button.getAttribute("data-set-lang") === next;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function preferredLanguage() {
    try {
      var saved = window.localStorage.getItem("hydro-language");
      if (saved === "zh" || saved === "en") {
        return saved;
      }
    } catch (error) {
      // Ignore storage errors and fall back to browser language.
    }
    return /^zh/i.test(navigator.language || "") ? "zh" : "en";
  }

  document.addEventListener("DOMContentLoaded", function () {
    setLanguage(preferredLanguage());
    document.addEventListener("click", function (event) {
      var target = event.target.closest("[data-set-lang]");
      if (!target) {
        return;
      }
      setLanguage(target.getAttribute("data-set-lang"));
    });
  });
})();
