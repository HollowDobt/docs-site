// docs/javascripts/mathjax.js

window.MathJax = {
  tex: {
    // 按官方文档，只配置 \(...\) 和 \[...\] 即可
    inlineMath: [["\\(", "\\)"], ['$', '$']],
    displayMath: [["\\[", "\\]"], ['$$', '$$']],
    processEscapes: true,
    processEnvironments: true
  },
  // options: {
  //   // 只处理被 Arithmatex 包裹的内容
  //   ignoreHtmlClass: ".*|",
  //   processHtmlClass: "arithmatex"
  // },
  // startup: { typeset: false }
};

// 关键：此版本先完全不订阅 document$，
// 让 MathJax 自己在页面加载完成后做首轮自动 typeset。

document$.subscribe(() => {
  // 官方推荐的四步：清缓存 + 重算 + 重新 typeset
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.startup.output.clearCache();
    MathJax.typesetClear();
    MathJax.texReset();
    MathJax.typesetPromise();
  }
});
