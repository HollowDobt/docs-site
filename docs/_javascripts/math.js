// docs/javascripts/mathjax.js

window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"], ['$', '$']],
    displayMath: [["\\[", "\\]"], ['$$', '$$']],
    processEscapes: true,
    processEnvironments: true,
  },

  chtml: {
    scale: 0.9,
  },

  // 关键：禁用 MathJax 自带的“首屏自动 typeset”
  // 我们改为完全由 document$.subscribe 接管
  startup: {
    typeset: false,   // ← 官方文档说明：设为 false 就不会自动排版 
  },
};

// Material for MkDocs 的 SPA 导航钩子
document$.subscribe(({ body }) => {
  // 等 MathJax 完全初始化完再排版，避免 race condition
  MathJax.startup.promise
    .then(() => {
      // 四步重置：避免跨页面缓存导致公式“借用前一页字符”的问题 
      if (MathJax.startup.output && MathJax.startup.output.clearCache) {
        MathJax.startup.output.clearCache();
      }
      MathJax.typesetClear();
      MathJax.texReset();

      // 只对当前页面主体排版（更安全，也更快）
      return MathJax.typesetPromise([body]);
    })
    .catch((err) => {
      console.error('MathJax typeset failed:', err);
    });
});
