(function () {
  // Merge helper to avoid relying on modern syntax (better mobile compatibility)
  var extend = function (target, source) {
    var out = target || {};
    if (!source) return out;
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        out[key] = source[key];
      }
    }
    return out;
  };

  var mj = window.MathJax || {};

  var tex = extend({}, mj.tex);
  tex.inlineMath = [["\\(", "\\)"], ["$", "$"]];
  tex.displayMath = [["\\[", "\\]"], ["$$", "$$"]];
  tex.processEscapes = true;
  tex.processEnvironments = true;
  mj.tex = tex;

  var options = extend({}, mj.options);
  options.ignoreHtmlClass = ".*|";
  options.processHtmlClass = "arithmatex";
  mj.options = options;

  var chtml = extend({}, mj.chtml);
  chtml.scale = 0.9;
  mj.chtml = chtml;

  window.MathJax = mj;

  var firstFixPending = true;

  var getFontsReadyPromise = function () {
    try {
      var fonts = document.fonts;
      if (fonts && fonts.ready && typeof fonts.ready.then === "function") {
        return typeof fonts.ready.catch === "function"
          ? fonts.ready.catch(function () {})
          : fonts.ready.then(
              function () {},
              function () {}
            );
      }
    } catch (err) {}
    return Promise.resolve();
  };

  var typesetMath = function (root, isRetry) {
    if (!root) {
      root = document.body;
    }
    if (typeof isRetry === "undefined") {
      isRetry = false;
    }

    var tryTypeset = function () {
      var mjGlobal = window.MathJax;
      var startup = mjGlobal && mjGlobal.startup;

      if (!mjGlobal || !mjGlobal.typesetPromise || !startup || !startup.promise) {
        setTimeout(tryTypeset, 25);
        return;
      }

      mjGlobal.startup.promise
        .then(function () {
          return getFontsReadyPromise();
        })
        .then(function () {
          if (startup.document && typeof startup.document.clear === "function") {
            startup.document.clear();
          }
          if (startup.output && typeof startup.output.clearCache === "function") {
            startup.output.clearCache();
          }
          if (typeof mjGlobal.typesetClear === "function") {
            mjGlobal.typesetClear();
          }
          if (typeof mjGlobal.texReset === "function") {
            mjGlobal.texReset();
          }
          return mjGlobal.typesetPromise([root]);
        })
        .then(function () {
          if (!isRetry && firstFixPending) {
            firstFixPending = false;
            setTimeout(function () {
              typesetMath(root, true);
            }, 60);
          }
        })
        .catch(function (err) {
          console.error("[MathJax] typeset failed:", err);
        });
    };

    tryTypeset();
  };

  typesetMath(document.body);

  if (typeof document$ !== "undefined" && document$ && typeof document$.subscribe === "function") {
    document$.subscribe(function (ctx) {
      var body = ctx && ctx.body ? ctx.body : document.body;
      typesetMath(body);
    });
  }
})();
