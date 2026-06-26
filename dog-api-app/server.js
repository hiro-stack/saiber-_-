const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();

    const dogImageUrl = data.message;

    res.send(`
      <!DOCTYPE html>
      <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dog API App</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <main class="container">
          <h1>Dog APIを使った犬画像表示アプリ</h1>

          <p class="description">
            Dog APIからランダムな犬の画像を取得して表示しています。
          </p>

          <div class="card">
            <img src="${dogImageUrl}" alt="ランダムな犬の画像" />

            <p class="url">
              画像URL：<br />
              <a href="${dogImageUrl}" target="_blank">${dogImageUrl}</a>
            </p>
          </div>

          <a class="button" href="/">別の犬画像を表示する</a>
        </main>
      </body>
      </html>
    `);
  } catch (error) {
    console.error(error);

    res.status(500).send(`
      <h1>エラーが発生しました</h1>
      <p>Dog APIから画像を取得できませんでした。</p>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});