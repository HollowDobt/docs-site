window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']]
  },
  options: {
    enableMenu: false
  },
  chtml: {
    scale: 1.0,
    fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/tex'
  }
};

// 关键！监听 Material 的页面切换事件，重新触发 MathJax 渲染
document$.subscribe(() => {
  if (window.MathJax && window.MathJax.typeset) {
    window.MathJax.typeset();  // ✅ 渲染动态加载的公式
  }
});

