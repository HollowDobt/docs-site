// docs/javascripts/mathjax.js

window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"], ['$', '$']],
    displayMath: [["\\[", "\\]"], ['$$', '$$']],
    processEscapes: true,
    processEnvironments: true
  },

  chtml: {
    scale: 0.9,
  },
};

document$.subscribe(() => {
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.startup.output.clearCache();
    MathJax.typesetClear();
    MathJax.texReset();
    MathJax.typesetPromise();
  }
});
