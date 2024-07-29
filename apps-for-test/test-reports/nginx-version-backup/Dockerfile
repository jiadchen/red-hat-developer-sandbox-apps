# ベースイメージとしてnginxを使用
FROM nginx:latest

# 必要なディレクトリを作成し、権限を設定
RUN mkdir -p /var/cache/nginx/client_temp \
             /var/cache/nginx/proxy_temp \
             /var/cache/nginx/fastcgi_temp \
             /var/cache/nginx/uwsgi_temp \
             /var/cache/nginx/scgi_temp && \
    chown -R nginx:nginx /var/cache/nginx /usr/share/nginx/html

# テストレポートのディレクトリをコピー
COPY ./sample-app/unit-test /usr/share/nginx/html/sample-app/unit-test
COPY ./sample-app/integration-test /usr/share/nginx/html/sample-app/integration-test
COPY ./sample-view/unit-test /usr/share/nginx/html/sample-view/unit-test
COPY ./sample-view/storybook /usr/share/nginx/html/sample-view/storybook
COPY ./e2e /usr/share/nginx/html/e2e

# カスタムNginx設定ファイルをコピー
COPY ./nginx.conf /etc/nginx/nginx.conf

# Nginxを非rootユーザーとして実行する
USER nginx

EXPOSE 8080

# Nginxを起動
CMD ["nginx", "-g", "daemon off;"]
