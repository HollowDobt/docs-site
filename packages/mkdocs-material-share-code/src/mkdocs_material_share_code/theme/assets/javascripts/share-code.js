(function () {
  const scriptCache = new Map();

  function boot() {
    document
      .querySelectorAll("[data-mdx-share-code]")
      .forEach((root) => initWidget(root));
  }

  function initWidget(root) {
    if (root.dataset.mdxShareCodeReady === "true") return;

    const configNode = root.querySelector(".mdx-share-code__config");
    const button = root.querySelector(".mdx-share-code__button");
    const status = root.querySelector(".mdx-share-code__status");
    const provider = root.querySelector(".mdx-share-code__provider");

    if (!configNode || !button || !status || !provider) return;

    let config;
    try {
      config = JSON.parse(configNode.textContent || "{}");
    } catch (error) {
      console.error("[share-code] Invalid widget config.", error);
      return;
    }

    root.dataset.mdxShareCodeReady = "true";

    const widget = {
      root,
      button,
      status,
      provider,
      config,
      shareCode: "",
    };

    button.addEventListener("click", async function () {
      if (widget.shareCode) {
        await copyShareCode(widget);
        return;
      }

      if (button.disabled) return;

      setState(widget, "loading", config.loadingText || "验证中...");
      button.disabled = true;

      try {
        const tokenResult = await acquireToken(widget);
        const response = await exchangeShareCode(widget, tokenResult);
        widget.shareCode = response.shareCode;
        button.textContent = response.shareCode;
        button.disabled = false;
        root.dataset.shareCode = response.shareCode;
        setState(widget, "success", response.message || config.successText || "");
      } catch (error) {
        button.disabled = false;
        setState(widget, "error", formatError(config, error));
      }
    });
  }

  async function acquireToken(widget) {
    const provider = widget.config.provider || "custom";
    if (provider === "turnstile") {
      return acquireTurnstileToken(widget);
    }
    return acquireCustomToken(widget);
  }

  async function acquireCustomToken(widget) {
    const path = widget.config.customTokenResolver || "acquireShareCodeToken";
    const resolver = resolveFunction(path);
    if (typeof resolver !== "function") {
      throw new Error("未找到前端 token resolver");
    }

    const result = await resolver({
      root: widget.root,
      page: {
        title: document.title,
        url: window.location.href,
        path: window.location.pathname,
      },
      config: widget.config,
    });

    return normalizeTokenResult(result);
  }

  async function acquireTurnstileToken(widget) {
    const siteKey = widget.config.providerSiteKey;
    if (!siteKey) {
      throw new Error("缺少 Turnstile site key");
    }

    const turnstile = await ensureScript(widget.config.providerScript);
    if (!turnstile || typeof turnstile.render !== "function") {
      throw new Error("Turnstile 脚本未就绪");
    }

    return new Promise((resolve, reject) => {
      let settled = false;
      widget.provider.hidden = false;

      const cleanup = (widgetId) => {
        widget.provider.hidden = true;
        widget.provider.innerHTML = "";
        if (typeof turnstile.remove === "function" && widgetId !== undefined) {
          turnstile.remove(widgetId);
        }
      };

      const widgetId = turnstile.render(widget.provider, {
        sitekey: siteKey,
        action: widget.config.providerAction || "share_code",
        size: "invisible",
        callback(token) {
          if (settled) return;
          settled = true;
          cleanup(widgetId);
          resolve({ token: token });
        },
        "error-callback"() {
          if (settled) return;
          settled = true;
          cleanup(widgetId);
          reject(new Error("人机验证失败，请重试"));
        },
        "expired-callback"() {
          if (settled) return;
          settled = true;
          cleanup(widgetId);
          reject(new Error("人机验证已过期，请重试"));
        },
        "timeout-callback"() {
          if (settled) return;
          settled = true;
          cleanup(widgetId);
          reject(new Error("人机验证超时，请重试"));
        },
      });

      if (typeof turnstile.execute === "function") {
        turnstile.execute(widgetId);
        return;
      }

      cleanup(widgetId);
      reject(new Error("当前 Turnstile 配置不支持 execute"));
    });
  }

  async function exchangeShareCode(widget, tokenResult) {
    const controller = new AbortController();
    const timeoutMs = Number(widget.config.requestTimeoutMs) || 15000;
    const timer = window.setTimeout(() => controller.abort(), timeoutMs);

    try {
      const payload = {
        action: widget.config.providerAction || "share_code",
      };

      if (typeof tokenResult.token === "string" && tokenResult.token.trim()) {
        payload[widget.config.requestTokenField || "token"] = tokenResult.token;
      }

      if (widget.config.includePageContext !== false) {
        payload.page_url = window.location.href;
        payload.page_path = window.location.pathname;
        payload.page_title = document.title;
      }

      if (tokenResult.payload && typeof tokenResult.payload === "object") {
        Object.assign(payload, tokenResult.payload);
      }

      const endpoint = resolveEndpoint(widget.config);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: widget.config.requestCredentials || "omit",
        signal: controller.signal,
      });

      const rawText = await response.text();
      let payloadData = {};

      if (rawText) {
        try {
          payloadData = JSON.parse(rawText);
        } catch (error) {
          payloadData = {};
        }
      }

      if (!response.ok) {
        throw new Error(
          extractErrorMessage(payloadData, widget.config.responseMessageField) ||
          rawText ||
          ("HTTP " + response.status),
        );
      }

      const data = unwrapData(payloadData);
      const shareCodeField = widget.config.responseCodeField || "share_code";
      const shareCode = data[shareCodeField];
      if (typeof shareCode !== "string" || !shareCode.trim()) {
        throw new Error("后端未返回分享码");
      }

      return {
        shareCode: shareCode.trim(),
        message: pickMessage(data, widget.config.responseMessageField),
      };
    } catch (error) {
      if (error && error.name === "AbortError") {
        throw new Error("请求超时，请重试");
      }
      throw error;
    } finally {
      window.clearTimeout(timer);
    }
  }

  async function copyShareCode(widget) {
    if (!widget.shareCode) return;
    await copyToClipboard(widget.shareCode);
    setState(widget, "success", widget.config.copiedText || "已复制分享码");
  }

  async function copyToClipboard(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      await navigator.clipboard.writeText(text);
      return;
    }

    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "absolute";
    input.style.left = "-9999px";
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }

  function setState(widget, state, message) {
    widget.root.dataset.state = state;
    widget.button.classList.toggle("mdx-share-code__button--code", state === "success");
    widget.status.textContent = message || "";
  }

  function formatError(config, error) {
    const prefix = config.errorPrefix || "获取失败";
    const message = error instanceof Error ? error.message : String(error || "");
    return message ? prefix + "：" + message : prefix;
  }

  function normalizeTokenResult(result) {
    if (typeof result === "string") {
      return { token: result };
    }

    if (result && typeof result === "object") {
      const hasToken = typeof result.token === "string" && result.token.trim();
      const hasPayload =
        result.payload &&
        typeof result.payload === "object" &&
        Object.keys(result.payload).length > 0;

      if (!hasToken && !hasPayload) {
        throw new Error("token resolver 至少要返回 token 或 payload");
      }

      return {
        token: hasToken ? result.token.trim() : undefined,
        payload: hasPayload ? result.payload : undefined,
      };
    }

    throw new Error("token resolver 必须返回字符串或 { token } / { payload } 对象");
  }

  function resolveFunction(path) {
    return String(path || "")
      .split(".")
      .filter(Boolean)
      .reduce((value, key) => (value && key in value ? value[key] : undefined), window);
  }

  function resolveEndpoint(config) {
    const exchangePath = String(config.exchangePath || "/@/share-code");
    if (!config.backendOrigin && exchangePath.startsWith("/@/")) {
      return new URL(exchangePath, window.location.origin).toString();
    }

    const origin = deriveBackendOrigin(config);
    return new URL(exchangePath, origin).toString();
  }

  function deriveBackendOrigin(config) {
    if (config.backendOrigin) {
      return String(config.backendOrigin).replace(/\/+$/, "");
    }

    const current = new URL(window.location.href);
    const backendHostLabel = String(config.backendHostLabel || "blog-api");

    if (
      current.hostname === "localhost" ||
      current.hostname === "127.0.0.1" ||
      current.hostname === "[::1]"
    ) {
      return current.origin;
    }

    const parts = current.hostname.split(".");
    if (parts.length > 1) {
      parts[0] = backendHostLabel;
      return current.protocol + "//" + parts.join(".");
    }

    return current.protocol + "//" + backendHostLabel + "." + current.hostname;
  }

  function pickMessage(data, fieldName) {
    if (!data || typeof data !== "object") return "";
    const field = fieldName || "message";
    const value = data[field];
    return typeof value === "string" ? value : "";
  }

  function extractErrorMessage(data, fieldName) {
    if (!data || typeof data !== "object") return "";

    const directMessage = pickMessage(data, fieldName);
    if (directMessage) return directMessage;

    if (data.error && typeof data.error === "object") {
      return pickMessage(data.error, fieldName) || pickMessage(data.error, "message");
    }

    return "";
  }

  function unwrapData(data) {
    if (data && typeof data === "object" && data.data && typeof data.data === "object") {
      return data.data;
    }
    return data;
  }

  function ensureScript(src) {
    const url = String(src || "").trim();
    if (!url) {
      return Promise.reject(new Error("缺少验证脚本地址"));
    }

    if (scriptCache.has(url)) {
      return scriptCache.get(url);
    }

    const promise = new Promise((resolve, reject) => {
      const existing = Array.from(document.scripts).find((script) => script.src === url);
      if (existing) {
        if (window.turnstile) {
          resolve(window.turnstile);
          return;
        }
        existing.addEventListener("load", () => resolve(window.turnstile), { once: true });
        existing.addEventListener("error", () => reject(new Error("验证脚本加载失败")), {
          once: true,
        });
        return;
      }

      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", () => resolve(window.turnstile), { once: true });
      script.addEventListener("error", () => reject(new Error("验证脚本加载失败")), {
        once: true,
      });
      document.head.appendChild(script);
    });

    scriptCache.set(url, promise);
    return promise;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  if (typeof window.document$ !== "undefined" && window.document$.subscribe) {
    window.document$.subscribe(boot);
  }
})();
