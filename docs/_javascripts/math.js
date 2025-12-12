// docs/javascripts/mathjax.js

window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"], ['$', '$']],
    displayMath: [["\\[", "\\]"], ['$$', '$$']],
    processEscapes: true,
    processEnvironments: true,
  },

  chtml: {
    scale: 0.95,
  },

  // 禁用 MathJax 自带的首屏自动 typeset
  startup: {
    typeset: false,
  },
};

// Material for MkDocs 的 SPA 导航钩子
document$.subscribe(({ body }) => {
  MathJax.startup.promise
    .then(() => {
      if (MathJax.startup.output && MathJax.startup.output.clearCache) {
        MathJax.startup.output.clearCache();
      }
      MathJax.typesetClear();
      MathJax.texReset();

      return MathJax.typesetPromise([body]);
    })
    .catch((err) => {
      console.error('MathJax typeset failed:', err);
    });
});
