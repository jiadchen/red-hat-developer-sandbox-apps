const express = require("express");
const path = require("path");
const morgan = require("morgan");
const app = express();

const port = 8080;

// アクセスログを出力するためのmorganミドルウェアを設定
app.use(morgan('combined'));

// 静的ファイルを提供
app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
