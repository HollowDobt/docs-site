from __future__ import annotations

import html
import json
import logging
from pathlib import Path
from typing import Any

from mkdocs.config import base, config_options as c
from mkdocs.plugins import BasePlugin

logger = logging.getLogger("mkdocs.plugins.material.share-code")

THEME_DIR = Path(__file__).resolve().parent / "theme"
STYLE_PATH = "assets/stylesheets/share-code.css"
SCRIPT_PATH = "assets/javascripts/share-code.js"

PAGE_OVERRIDE_KEYS = {
    "backend_origin",
    "backend_host_label",
    "exchange_path",
    "request_token_field",
    "response_code_field",
    "response_message_field",
    "request_timeout_ms",
    "request_credentials",
    "include_page_context",
    "title",
    "label",
    "helper_text",
    "button_text",
    "loading_text",
    "success_text",
    "copied_text",
    "error_prefix",
    "provider",
    "provider_script",
    "provider_site_key",
    "provider_action",
    "custom_token_resolver",
}


class ShareCodePluginConfig(base.Config):
    enabled = c.Type(bool, default=True)
    default_enabled = c.Type(bool, default=False)
    page_meta_key = c.Type(str, default="share_code")

    backend_origin = c.Optional(c.Type(str))
    backend_host_label = c.Type(str, default="blog-api")
    exchange_path = c.Type(str, default="/@/share-code")

    request_token_field = c.Type(str, default="token")
    response_code_field = c.Type(str, default="share_code")
    response_message_field = c.Type(str, default="message")
    request_timeout_ms = c.Type(int, default=15000)
    request_credentials = c.Choice(("omit", "same-origin", "include"), default="include")
    include_page_context = c.Type(bool, default=True)

    title = c.Type(str, default="分享码验证")
    label = c.Type(str, default="Human verification")
    helper_text = c.Type(str, default="完成人机验证后即可领取分享码")
    button_text = c.Type(str, default="获取验证码")
    loading_text = c.Type(str, default="验证中...")
    success_text = c.Type(str, default="分享码已就绪，点击可复制")
    copied_text = c.Type(str, default="已复制分享码")
    error_prefix = c.Type(str, default="获取失败")

    provider = c.Choice(("custom", "turnstile"), default="custom")
    provider_script = c.Type(
        str,
        default="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit",
    )
    provider_site_key = c.Optional(c.Type(str))
    provider_action = c.Type(str, default="share_code")
    custom_token_resolver = c.Type(str, default="acquireShareCodeToken")


class ShareCodePlugin(BasePlugin[ShareCodePluginConfig]):
    def on_config(self, config: Any) -> Any:
        theme = config["theme"]
        if getattr(theme, "name", None) != "material":
            logger.warning("[share-code] This plugin is designed for mkdocs-material.")

        theme_dir = str(THEME_DIR)
        if theme_dir not in theme.dirs:
            insert_at = 1 if getattr(theme, "custom_dir", None) else 0
            theme.dirs.insert(insert_at, theme_dir)

        _append_unique(config["extra_css"], STYLE_PATH)
        _append_unique(config["extra_javascript"], SCRIPT_PATH)
        return config

    def on_page_content(self, html_content: str, page: Any, config: Any, files: Any) -> str:
        if not self.config["enabled"]:
            return html_content

        enabled, overrides = self._resolve_page_toggle(page)
        if not enabled:
            return html_content

        widget_config = self._build_widget_config(overrides)
        widget_markup = self._render_widget(widget_config)
        return f"{html_content}\n{widget_markup}"

    def _resolve_page_toggle(self, page: Any) -> tuple[bool, dict[str, Any]]:
        meta = getattr(page, "meta", {}) or {}
        raw_value = meta.get(self.config["page_meta_key"])

        if raw_value is None:
            return self.config["default_enabled"], {}

        if isinstance(raw_value, bool):
            return raw_value, {}

        if isinstance(raw_value, dict):
            overrides = dict(raw_value)
            enabled = bool(overrides.pop("enabled", True))
            return enabled, overrides

        logger.warning(
            "[share-code] Ignoring invalid page meta %r on page %r.",
            self.config["page_meta_key"],
            getattr(page, "file", None),
        )
        return False, {}

    def _build_widget_config(self, overrides: dict[str, Any]) -> dict[str, Any]:
        widget_config: dict[str, Any] = {
            "backendOrigin": self.config["backend_origin"],
            "backendHostLabel": self.config["backend_host_label"],
            "exchangePath": self.config["exchange_path"],
            "requestTokenField": self.config["request_token_field"],
            "responseCodeField": self.config["response_code_field"],
            "responseMessageField": self.config["response_message_field"],
            "requestTimeoutMs": self.config["request_timeout_ms"],
            "requestCredentials": self.config["request_credentials"],
            "includePageContext": self.config["include_page_context"],
            "title": self.config["title"],
            "label": self.config["label"],
            "helperText": self.config["helper_text"],
            "buttonText": self.config["button_text"],
            "loadingText": self.config["loading_text"],
            "successText": self.config["success_text"],
            "copiedText": self.config["copied_text"],
            "errorPrefix": self.config["error_prefix"],
            "provider": self.config["provider"],
            "providerScript": self.config["provider_script"],
            "providerSiteKey": self.config["provider_site_key"],
            "providerAction": self.config["provider_action"],
            "customTokenResolver": self.config["custom_token_resolver"],
        }

        for key, value in overrides.items():
            if key not in PAGE_OVERRIDE_KEYS:
                logger.warning("[share-code] Ignoring unsupported page override: %s", key)
                continue
            widget_config[_camelize(key)] = value

        return widget_config

    def _render_widget(self, widget_config: dict[str, Any]) -> str:
        script_json = _json_for_script(widget_config)
        title = html.escape(str(widget_config["title"]))
        label = html.escape(str(widget_config["label"]))
        helper_text = html.escape(str(widget_config["helperText"]))
        button_text = html.escape(str(widget_config["buttonText"]))

        return (
            '<section class="mdx-share-code" data-mdx-share-code>'
            '<div class="mdx-share-code__surface">'
            '<div class="mdx-share-code__copy">'
            f'<p class="mdx-share-code__label">{label}</p>'
            f'<h3 class="mdx-share-code__title">{title}</h3>'
            f'<p class="mdx-share-code__helper">{helper_text}</p>'
            "</div>"
            '<div class="mdx-share-code__actions">'
            f'<button class="md-button md-button--primary mdx-share-code__button" type="button">{button_text}</button>'
            '<p class="mdx-share-code__status" aria-live="polite"></p>'
            "</div>"
            "</div>"
            '<div class="mdx-share-code__provider" hidden aria-hidden="true"></div>'
            f'<script class="mdx-share-code__config" type="application/json">{script_json}</script>'
            "</section>"
        )


def _append_unique(values: list[str], value: str) -> None:
    if value not in values:
        values.append(value)


def _camelize(value: str) -> str:
    head, *tail = value.split("_")
    return head + "".join(part.capitalize() for part in tail)


def _json_for_script(value: dict[str, Any]) -> str:
    return json.dumps(value, ensure_ascii=False).replace("</", "<\\/")
