function renderGiscus() {
  const old = document.querySelector("#giscus-container");
  if (old) old.remove(); // 移除旧容器

  const container = document.createElement("div");
  container.id = "giscus-container";

  const script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.async = true;
  script.setAttribute("data-repo", "HollowDobt/docs-site");
  script.setAttribute("data-repo-id", "R_kgDOOvKsgw");
  script.setAttribute("data-category", "Comments");
  script.setAttribute("data-category-id", "DIC_kwDOOvKsg84CqrwA");
  script.setAttribute("data-mapping", "pathname");
  script.setAttribute("data-strict", "0");
  script.setAttribute("data-reactions-enabled", "1");
  script.setAttribute("data-emit-metadata", "1");
  script.setAttribute("data-input-position", "top");
  script.setAttribute("data-theme", "dark_high_contrast");
  script.setAttribute("data-lang", "zh-CN");
  script.setAttribute("data-loading", "lazy");
  script.setAttribute("crossorigin", "anonymous");

  const target = document.querySelector(".md-content");
  if (target) {
    target.appendChild(container);
    container.appendChild(script);
  }
}

// 第一次加载时执行
document.addEventListener("DOMContentLoaded", renderGiscus);

// MkDocs Material 页面切换后重新加载 Giscus
if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    renderGiscus();
  });
}
