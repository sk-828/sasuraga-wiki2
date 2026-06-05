# さすらがwiki

TRPG キャンペーン「さすらが」向けの Wiki サイトです。React + TypeScript + Bulma で構築された SPA です。

## 機能

- **キャラ図鑑** — Google スプレッドシートからキャラクター情報を取得・表示
- **料理** — Canvas で料理カードを描画
- **タロット占い** — 22 枚からランダムに 2 枚表示（再抽選可）
- **設定資料集** — 卓別の設定テキスト一覧
- **ログ閲覧** — 静的 HTML ログを iframe で表示
- **威力ダメージ計算** — トップページの TRPG ダメージ計算ツール

## セットアップ

```bash
npm install
npm start
```

ブラウザで http://localhost:3001 が開きます（`vite.config.ts` でポート 3001 を指定）。

## 環境変数

`.env` に以下を設定します（`.env.example` をコピーして編集）。

| 変数名 | 説明 |
|--------|------|
| `VITE_GAS_URL` | Google Apps Script の Web アプリ URL |

未設定時はビルド・起動時にエラーになります。

### GAS の再デプロイ手順（403 / CORS エラー時）

1. Google スプレッドシートの「拡張機能」→「Apps Script」を開く
2. 「デプロイ」→「新しいデプロイ」→ 種類「ウェブアプリ」
3. 実行ユーザー: 自分、アクセス: **全員**（匿名ユーザーを含む）
4. デプロイ後の URL を `.env` の `VITE_GAS_URL` に設定
5. コード変更後は必ず **新しいデプロイ** を作成（既存デプロイの編集だけでは URL が変わらない場合あり）

GAS が HTML エラーや 403 を返すと、ブラウザでは CORS エラーのように見えることがあります。サイト側では JSON 検証と日本語エラーメッセージで対処しています。

## 画像アセット

以下のディレクトリに画像を配置してください（リポジトリに含まれない場合があります）。

- `public/img/` — キャラクター画像
- `public/images/` — タロット・UI 用画像
- `public/pages/img/` — 料理カード用背景・キャラアイコン
- `src/font/Nちはやフォント.ttf` — 料理カード用フォント

## ビルド・デプロイ

```bash
npm run build
```

`dist/` フォルダを静的ホスティング（Netlify 等）にデプロイします。SPA 用に `public/_redirects` でフォールバックが設定されています。

## 開発コマンド

| コマンド | 説明 |
|----------|------|
| `npm start` / `npm run dev` | 開発サーバー起動 |
| `npm run build` | 本番ビルド |
| `npm run preview` | ビルド結果のプレビュー |
| `npm run lint` | ESLint 実行 |

## 技術スタック

- React 18 + TypeScript 5
- Vite 6
- react-router-dom v6
- Bulma 0.9.4
- Google Apps Script（データ API）
