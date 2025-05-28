function loadGiscus() {
  const existing = document.getElementById("giscus-container");
  if (existing) existing.remove(); // 移除旧评论区

  const commentContainer = document.createElement("div");
  commentContainer.id = "giscus-container";
  commentContainer.style.marginTop = "3rem";

  const giscus = document.createElement("script");
  giscus.src = "https://giscus.app/client.js";
  giscus.setAttribute("data-repo", "HollowDobt/docs-site");
  giscus.setAttribute("data-repo-id", "R_kgDOOvKsgw");
  giscus.setAttribute("data-category", "Comments");
  giscus.setAttribute("data-category-id", "DIC_kwDOOvKsg84CqrwA");
  giscus.setAttribute("data-mapping", "pathname");
  giscus.setAttribute("data-strict", "0");
  giscus.setAttribute("data-reactions-enabled", "1");
  giscus.setAttribute("data-emit-metadata", "1");
  giscus.setAttribute("data-input-position", "top");
  giscus.setAttribute("data-theme", "dark_high_contrast");
  giscus.setAttribute("data-lang", "zh-CN");
  giscus.setAttribute("data-loading", "lazy");
  giscus.setAttribute("crossorigin", "anonymous");
  giscus.async = true;

  const target =
    document.querySelector(".md-content") || document.querySelector("main");
  if (target) {
    target.appendChild(commentContainer);
    commentContainer.appendChild(giscus);
  }
}

// 页面首次加载
document.addEventListener("DOMContentLoaded", loadGiscus);

// 监听 MkDocs Material 的局部页面切换事件
document.addEventListener("DOMContentLoaded", function () {
  if (typeof document$ !== "undefined") {
    document$.subscribe(() => {
      loadGiscus();
    });
  }
});
