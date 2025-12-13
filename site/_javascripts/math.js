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

  let firstFixPending = true;

  const typesetMath = (root = document.body, isRetry = false) => {
    const tryTypeset = () => {
      if (!window.MathJax?.typesetPromise || !MathJax.startup?.promise) {
        setTimeout(tryTypeset, 25);
        return;
      }

      const fontsReady = window.document?.fonts?.ready?.catch?.(() => {}) || Promise.resolve();

      MathJax.startup.promise
        .then(() => fontsReady)
        .then(() => {
          // Clear any cached render info so navigation.instant pages don't carry stale math
          MathJax.startup.document?.clear?.();
          MathJax.startup.output?.clearCache?.();
          MathJax.typesetClear?.();
          MathJax.texReset?.();
          return MathJax.typesetPromise([root]);
        })
        .then(() => {
          // On the very first render, run a quick follow-up typeset to correct
          // any late-loading fonts/CSS that might shift layout after deploy.
          if (!isRetry && firstFixPending) {
            firstFixPending = false;
            setTimeout(() => typesetMath(root, true), 60);
          }
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
