// 两类都可以使用: $$, \\(
document$.subscribe(() => {
  renderMathInElement(document.body, {
    // customized options
    delimiters: [
      {left: "$$", right: "$$", display: true},
      {left: "$", right: "$", display: false},
      {left: "\\(", right: "\\)", display: false},
      {left: "\\[", right: "\\]", display: true}
    ],
    throwOnError : false
  });
});