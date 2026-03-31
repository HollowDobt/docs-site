---
title: Share Code Demo
comments: false
share_code:
  enabled: true
  title: 评论分享码测试
  helper_text: 点击下方按钮后会先执行人机验证，再向后端交换分享码。本地 `mkdocs serve` 时会自动使用页面内 mock，方便直接预览按钮状态变化。
  exchange_path: /@/share-code
  provider: custom
  custom_token_resolver: acquireShareCodeToken
---

# Share Code Demo

这个页面专门用来测试 `mkdocs-material-share-code` 插件的外观和交互。

## 预期行为

1. 初始状态下，页面底部会出现一个 Material 风格的分享码卡片。
2. 点击“获取验证码”后，前端先拿到人机验证结果。
3. 随后前端会把 token 或 payload 发送到 `"/@/share-code"`。
4. 成功后，按钮文本会直接变成返回的分享码，再次点击会复制该分享码。

## 本地调试说明

- 如果你在 `localhost` 或 `127.0.0.1` 下预览，这个页面会自动启用 mock。
- mock 模式下不会请求真实后端，而是返回一个演示分享码。
- 部署到正式域名后，这段 mock 不会生效，页面会继续请求真实 `/@/share-code`。

## 当前页面内联测试脚本

```html
<script>
  window.acquireShareCodeToken = async function () {
    return {
      token: "demo-human-token",
      payload: {
        scene: "share-code-demo"
      }
    }
  }
</script>
```

<script>
  window.acquireShareCodeToken = async function () {
    return {
      token: "demo-human-token",
      payload: {
        scene: "share-code-demo"
      }
    };
  };

  (function () {
    const isLocalPreview =
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1" ||
      location.hostname === "[::1]";

    if (!isLocalPreview || window.__shareCodeDemoMockInstalled) return;

    const nativeFetch = window.fetch.bind(window);
    window.__shareCodeDemoMockInstalled = true;

    window.fetch = async function (input, init) {
      const url = typeof input === "string" ? input : input instanceof Request ? input.url : String(input);
      const absolute = new URL(url, location.origin);

      if (absolute.origin === location.origin && absolute.pathname === "/@/share-code") {
        const body = init && typeof init.body === "string" ? JSON.parse(init.body) : {};
        const scene = body && typeof body.scene === "string" ? body.scene : "demo";
        const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();

        return new Response(
          JSON.stringify({
            data: {
              share_code: `DEMO-${scene.toUpperCase()}-${suffix}`,
              message: "本地预览 mock 已返回分享码"
            }
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }

      return nativeFetch(input, init);
    };
  })();
</script>
