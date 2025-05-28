document.addEventListener("DOMContentLoaded", function () {
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

  const commentContainer = document.createElement("div");
  commentContainer.id = "giscus-container";
  document.querySelector("main").appendChild(commentContainer);
  commentContainer.appendChild(giscus);
});
