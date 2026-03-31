# mkdocs-material-share-code

一个独立的 `mkdocs-material` 插件，用来把“人机验证 -> 后端换取分享码”的流程嵌入 Material 页面，并保持与主题外观一致。

## 功能

- Material 风格卡片组件，直接插入页面正文末尾
- 点击“获取验证码”后执行前端验证，再把 token 发给后端
- 后端返回分享码后，按钮文字直接切换成分享码
- 成功后再次点击按钮会复制分享码
- 默认优先走同源 `"/@/*"` 路径，适配 `server-blog` 当前的 Netlify 反向代理方案
- 如果没有同源代理，也可以按当前站点主机名派生 `blog-api` 域名
  - 例如 `https://blog.hollowdobt.com` -> `https://blog-api.hollowdobt.com`
- 兼容 `mkdocs-material` 的 `navigation.instant`

## 安装

```bash
pip install -e ./packages/mkdocs-material-share-code
```

## 启用

`mkdocs-material` 会优先尝试加载 `material/<plugin-name>` 命名空间插件，所以配置名可以直接写成 `share-code`：

```yaml
plugins:
  - share-code:
      default_enabled: false
      exchange_path: /@/share-code
      provider: custom
      custom_token_resolver: acquireShareCodeToken
```

如果你的博客和 `server-blog` 一样放在 Netlify 前端层，且 `/@/*` 已经反代到 `blog-api.hollowdobt.com`，这里通常不需要显式填写 `backend_origin`。

## 页面开关

默认建议按页启用：

```markdown
---
share_code: true
---
```

也支持按页覆盖：

```markdown
---
share_code:
  title: 评论分享码
  helper_text: 通过人机验证后即可查看评论区分享码
  exchange_path: /@/comment/share-code
  provider: turnstile
  provider_site_key: your-turnstile-site-key
---
```

## 两种 token 获取方式

### 1. 自定义 resolver

如果你已经有现成的人机验证前端逻辑，只需要暴露一个全局异步函数：

```html
<script>
  window.acquireShareCodeToken = async function () {
    const token = await window.yourCaptchaSdk.getToken()
    return { token }
  }
</script>
```

返回值可以是：

- 纯字符串：`"token-value"`
- 对象：`{ token: "token-value", payload: { scene: "comment" } }`

其中 `payload` 会一并合并到发往后端的 JSON 请求体里。

### 2. 内置 Turnstile

```yaml
plugins:
  - share-code:
      provider: turnstile
      provider_site_key: your-turnstile-site-key
```

插件会在用户点击按钮时懒加载 Turnstile 脚本，并执行 invisible challenge。

## 默认后端请求协议

默认会向当前站点同源的：

```text
/@/share-code
```

如果你显式设置了 `backend_origin`，插件才会改为直连那个后端域名。

发送 `POST` JSON：

```json
{
  "token": "human-verification-token",
  "action": "share_code",
  "page_url": "https://blog.hollowdobt.com/post/hello/",
  "page_path": "/post/hello/",
  "page_title": "Hello"
}
```

默认期望后端返回：

```json
{
  "data": {
    "share_code": "ABCD-1234",
    "message": "ok"
  }
}
```

这些字段都可以通过插件配置改名：

- `request_token_field`
- `response_code_field`
- `response_message_field`

如果你的验证不是单个 token，而是像 `server-blog` 里的 `captchaPayload` 一样返回一个对象，也可以这样写：

```html
<script>
  window.acquireShareCodeToken = async function () {
    return {
      payload: {
        captchaPayload: await window.solveHumanPayload()
      }
    }
  }
</script>
```

## 常用配置

```yaml
plugins:
  - share-code:
      default_enabled: false
      backend_origin: https://blog-api.hollowdobt.com
      backend_host_label: blog-api
      exchange_path: /@/share-code
      request_timeout_ms: 15000
      request_credentials: include
      include_page_context: true
      title: 分享码验证
      label: Human verification
      helper_text: 完成人机验证后即可领取分享码
      button_text: 获取验证码
      loading_text: 验证中...
      success_text: 分享码已就绪，点击可复制
      copied_text: 已复制分享码
      error_prefix: 获取失败
      provider: custom
      provider_script: https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit
      provider_site_key: null
      provider_action: share_code
      custom_token_resolver: acquireShareCodeToken
```

## 后端注意事项

- 允许博客站点来源跨域访问后端接口
- 接口应返回 JSON，失败时建议返回可读的 `message`
- 如果分享码有时效，建议由后端自己控制，不要信任前端状态
