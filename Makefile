# Makefile 自动化部署
# 命令: cd ~/blog-docs & make

push:
	@git add .
	@git commit -m "New Article"
	@git push origin main

.DEFAULT_GOAL := push
