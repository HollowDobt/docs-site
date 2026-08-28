FROM python:3.12-slim AS builder

ENV NO_MKDOCS_2_WARNING=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1

RUN apt-get update \
    && apt-get install --yes --no-install-recommends git \
    && rm -rf /var/lib/apt/lists/*

RUN python -m pip install \
    "mkdocs-material==9.*" \
    "mkdocs<2" \
    "mkdocs-glightbox" \
    "mkdocs-git-revision-date-localized-plugin" \
    "mkdocs-git-committers-plugin-2" \
    "mkdocs-git-authors-plugin" \
    "mkdocs-minify-plugin" \
    "mkdocs-add-number-plugin"

WORKDIR /src
COPY . .

RUN mkdocs build --clean \
    && touch site/.nojekyll \
    && if [ -f site/static/404.html ]; then cp site/static/404.html site/404.html; fi

FROM nginx:1.28-alpine

LABEL ink.hollow.service="notes"

COPY deploy/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder --chown=nginx:nginx /src/site/ /usr/share/nginx/html/notes/

RUN test -f /usr/share/nginx/html/notes/index.html \
    && test -f /usr/share/nginx/html/notes/404.html

USER nginx
EXPOSE 8080
STOPSIGNAL SIGQUIT

HEALTHCHECK --interval=5s --timeout=3s --start-period=3s --retries=6 \
    CMD wget --quiet --output-document=/dev/null http://127.0.0.1:8080/notes/ || exit 1

ENTRYPOINT ["nginx", "-g", "daemon off;"]
