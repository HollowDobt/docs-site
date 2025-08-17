# Makefile 自动化部署
# 命令: cd ~/blog-docs & make

push:
	@git add .
	@git commit -m "New Article"
	@make copy-404
	@git add site/404.html site/static/rain.svg
	@git commit -m "Add custom 404 page with rain.svg"
	@git push origin main

# 确保 404 页面和 rain.svg 文件被正确复制
copy-404:
	@echo "Copying custom 404 page and assets..."
	@cp docs/static/404.html site/404.html
	@cp docs/static/rain.svg site/static/rain.svg
	@echo "404 page and assets copied successfully"

.DEFAULT_GOAL := push
