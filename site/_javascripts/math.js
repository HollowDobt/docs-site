(() => {
  // Do NOT clobber MathJax object created by the loader; just extend its config.
  const mj = window.MathJax || {};

  mj.tex = {
    ...mj.tex,
    inlineMath: [["\\(", "\\)"], ["$", "$"]],
    displayMath: [["\\[", "\\]"], ["$$", "$$"]],
    processEscapes: true,
    processEnvironments: true
  };

  mj.options = {
    ...mj.options,
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  };

  mj.chtml = {
    ...mj.chtml,
    scale: 0.9
  };

  // Ensure the global is kept (don’t overwrite if already set)
  window.MathJax = mj;

  const typesetMath = (root = document.body) => {
    const tryTypeset = () => {
      if (!window.MathJax?.typesetPromise || !MathJax.startup?.promise) {
        setTimeout(tryTypeset, 25);
        return;
      }

      MathJax.startup.promise
        .then(() => {
          // Clear any cached render info so navigation.instant pages don't carry stale math
          MathJax.startup.document?.clear?.();
          MathJax.startup.output?.clearCache?.();
          MathJax.typesetClear?.();
          MathJax.texReset?.();
          MathJax.startup.document?.updateDocument?.();
          return MathJax.typesetPromise([root]);
        })
        .catch((err) => console.error("[MathJax] typeset failed:", err));
    };

    tryTypeset();
  };

  // First page load (after MathJax finishes startup)
  typesetMath(document.body);

  // Subsequent instant-navigation loads
  document$.subscribe(({ body }) => typesetMath(body));
})();
