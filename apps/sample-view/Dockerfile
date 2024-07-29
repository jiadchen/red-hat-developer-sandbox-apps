# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# パッケージファイルをコピーし、依存関係をインストール
COPY package.json package-lock.json ./
RUN npm install

# 残りのアプリケーションファイルをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine

WORKDIR /app

# ビルドステージからアプリケーションファイルをコピー
COPY --from=builder /app ./

# ポートを公開
EXPOSE 3000

# エントリーポイントを設定
CMD ["npm", "run", "start"]
