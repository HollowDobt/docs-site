from __future__ import annotations

import json
import re
import unittest

from mkdocs.theme import Theme

from mkdocs_material_share_code.plugin import SCRIPT_PATH, STYLE_PATH, ShareCodePlugin


class FakePage:
    def __init__(self, meta=None):
        self.meta = meta or {}
        self.file = "docs/example.md"


class ShareCodePluginTests(unittest.TestCase):
    def setUp(self) -> None:
        self.plugin = ShareCodePlugin()
        errors, warnings = self.plugin.load_config({})
        self.assertEqual(errors, [])
        self.assertEqual(warnings, [])

    def test_on_config_registers_assets(self) -> None:
        config = {
            "theme": Theme(name="material"),
            "extra_css": [],
            "extra_javascript": [],
        }

        self.plugin.on_config(config)

        self.assertIn(STYLE_PATH, config["extra_css"])
        self.assertIn(SCRIPT_PATH, config["extra_javascript"])
        self.assertTrue(
            any("mkdocs_material_share_code/theme" in path for path in config["theme"].dirs)
        )

    def test_widget_not_injected_when_default_disabled(self) -> None:
        html = self.plugin.on_page_content("<p>body</p>", FakePage(), {}, None)
        self.assertEqual(html, "<p>body</p>")

    def test_widget_injected_when_page_meta_true(self) -> None:
        output = self.plugin.on_page_content("<p>body</p>", FakePage({"share_code": True}), {}, None)
        self.assertIn('data-mdx-share-code', output)
        self.assertIn("获取验证码", output)

    def test_page_overrides_are_merged(self) -> None:
        output = self.plugin.on_page_content(
            "<p>body</p>",
            FakePage(
                {
                    "share_code": {
                        "title": "评论分享码",
                        "exchange_path": "/api/comment/share-code",
                        "provider": "turnstile",
                        "provider_site_key": "demo-site-key",
                    }
                }
            ),
            {},
            None,
        )

        match = re.search(
            r'<script class="mdx-share-code__config" type="application/json">(.*?)</script>',
            output,
        )
        self.assertIsNotNone(match)

        payload = json.loads(match.group(1).replace("<\\/", "</"))
        self.assertEqual(payload["title"], "评论分享码")
        self.assertEqual(payload["exchangePath"], "/api/comment/share-code")
        self.assertEqual(payload["provider"], "turnstile")
        self.assertEqual(payload["providerSiteKey"], "demo-site-key")

    def test_default_exchange_path_matches_server_blog_proxy_style(self) -> None:
        output = self.plugin.on_page_content("<p>body</p>", FakePage({"share_code": True}), {}, None)
        match = re.search(
            r'<script class="mdx-share-code__config" type="application/json">(.*?)</script>',
            output,
        )
        self.assertIsNotNone(match)
        payload = json.loads(match.group(1).replace("<\\/", "</"))
        self.assertEqual(payload["exchangePath"], "/@/share-code")
        self.assertEqual(payload["requestCredentials"], "include")


if __name__ == "__main__":
    unittest.main()
