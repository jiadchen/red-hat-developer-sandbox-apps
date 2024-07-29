FROM node:18-alpine

WORKDIR /app

# パッケージファイルをコピーし、依存関係をインストール
COPY package.json package-lock.json ./
RUN npm ci

# 残りのアプリケーションファイルをコピー
COPY . .

# ポートを公開
EXPOSE 8080

# エントリーポイントを設定
CMD ["npm", "run", "serve"]
