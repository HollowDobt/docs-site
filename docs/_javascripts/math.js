window.MathJax = {
  tex: {
    inlineMath:  [['\\(', '\\)'], ['$', '$']],
    displayMath: [['\\[', '\\]'], ['$$', '$$']],
    processEscapes: true,
    processEnvironments: true
  },
  startup: { typeset: false }
};

document$.subscribe(() => {
  MathJax.typesetPromise();
});
