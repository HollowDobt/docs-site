window.MathJax = {
  // 关键：禁用 MathJax 首次加载时的自动 typeset，避免与 document$.subscribe 重复渲染
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
  }
};

(() => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const raf = () => new Promise((r) => requestAnimationFrame(() => r()));

  // 用 token + URL 标记，确保同一页只 typeset 一次（防 document$ 多次触发）
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

    // 等 DOM 注入与布局稳定（两帧通常足够）
    await raf();
    await raf();

    // 如果这段等待期间又来了新事件，只做最后一次
    if (myToken !== token) return;

    await waitMathJaxReady();

    // iOS/Safari 上字体加载时序会影响度量，尽量等字体 ready 再渲染
    if (document.fonts?.ready) {
      try { await document.fonts.ready; } catch (_) {}
    }

    const root = getRoot(body);
    const url = location.href;

    // 防止同一页面重复 typeset（哪怕 document$ 又发了一次）
    if (root?.dataset?.mjxTypeset === url) return;

    // 动态内容：清掉 MathJax 对旧页面的记录，并重置标签/编号状态
    // typesetClear() / texReset() 的语义来自官方“动态内容”文档 :contentReference[oaicite:3]{index=3}
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
