window.MathJax = {
  startup: {
    typeset: false
  },
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: ".*|",
    processHtmlClass: "arithmatex"
  },
};

(() => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const raf = () => new Promise((r) => requestAnimationFrame(() => r()));
  let token = 0;

  async function waitMathJaxReady() {
    while (!window.MathJax?.typesetPromise) {
      await sleep(25);
    }
  }

  function getRoot(body) {
    return (
      body?.querySelector?.('[data-md-component="content"]') ||
      body?.querySelector?.(".md-content") ||
      body ||
      document
    );
  }

  async function typeset(body) {
    const myToken = ++token;

    await raf();
    await raf();

    if (myToken !== token) return;

    await waitMathJaxReady();

    if (document.fonts?.ready) {
      try { await document.fonts.ready; } catch (_) {}
    }

    const root = getRoot(body);
    const url = location.href;

    if (root?.dataset?.mjxTypeset === url) return;

    MathJax.typesetClear();
    MathJax.texReset();
    MathJax.startup?.output?.clearCache?.();

    await MathJax.typesetPromise([root]);

    if (root?.dataset) root.dataset.mjxTypeset = url;
  }

  function hook() {
    if (typeof document$ === "undefined" || !document$?.subscribe) {
      setTimeout(hook, 50);
      return;
    }

    document$.subscribe((e) => {
      typeset(e?.body || document.body);
    });
  }

  hook();
})();
