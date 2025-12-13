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

  startup: {
    typeset: false,
  },
};

(function () {
  // 为了兼容不同设备和不稳定网络，这里做一点“等 MathJax 就绪再渲染”的逻辑
  var MAX_RETRIES = 20;   // 最多重试 20 次
  var RETRY_DELAY = 50;   // 每次间隔 50ms，总共最多约 1s

  function renderMath(body) {
    if (!body) {
      body = document.body;
    }

    var attempts = 0;

    function tryRender() {
      // 还没加载到 MathJax 或 typesetPromise，说明 CDN 脚本还在路上
      if (!window.MathJax || !MathJax.typesetPromise) {
        if (attempts++ < MAX_RETRIES) {
          setTimeout(tryRender, RETRY_DELAY);
        } else {
          console.error("MathJax not ready after retries");
        }
        return; // 失败
      }

      if (MathJax.startup &&
          MathJax.startup.output &&
          typeof MathJax.startup.output.clearCache === "function") {
        MathJax.startup.output.clearCache();
      }

      if (typeof MathJax.typesetClear === "function") {
        MathJax.typesetClear();
      }

      if (typeof MathJax.texReset === "function") {
        MathJax.texReset();
      }

      var p = MathJax.typesetPromise([body]);

      // 防止有些环境里 Promise 不完全规范，这里做一次保护性判断
      if (p && typeof p.then === "function" && typeof p["catch"] === "function") {
        p["catch"](function (err) {
          console.error("MathJax typeset failed:", err);
        });
      }
    }

    tryRender();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      renderMath(document.body);
    });
  } else {
    renderMath(document.body);
  }

  // ② Material for MkDocs 的 SPA 导航钩子
  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(function (event) {
      var body = event && event.body;
      renderMath(body || document.body);
    });
  }
})();
