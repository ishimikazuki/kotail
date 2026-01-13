# 現在の作業: GitHub新規リポジトリ作成 + Vercelデプロイ

## ゴール
- 既存のNext.jsプロジェクトを指定GitHubに新規作成・pushし、Vercelへ本番デプロイしてURLを共有できる状態にする

## 進捗 (常に最新に更新)
- [x] リポジトリ名・公開範囲・所有者（org/user）を確定
- [x] Git状態確認と初回コミット準備（必要なら）
- [x] GitHubリポジトリ作成（ユーザー側で作成）
- [x] pushして初回リリース
- [ ] Vercelプロジェクト作成・本番デプロイ（ビルドエラー解消後）
- [ ] デプロイURL共有 + 注意点（Vercel不都合）説明

## 発見・予想外のこと
- 2026-01-13: `genaigenai2525-spec` へのリポジトリ作成権限が不足（gh repo createが権限エラー）
- 2026-01-13: Vercel CLIのログイン先が `kazu312stone-4228` で、指定スコープ `genais-projects-20aaefc8` にアクセスできない
- 2026-01-13: VercelのGitHub連携が未設定で、`ishimikazuki/kotail` の接続に失敗
- 2026-01-13: この実行環境から `vercel.com` / `api.vercel.com` のDNS解決ができず、Vercel CLIが通信できない
- 2026-01-13: Vercelビルドで `RecentActivity.tsx` の型エラー（companiesの型不一致）が発生

## 決定したこと
- 2026-01-13: GitHubは`genaigenai2525-spec/kotail`でpublicに作成（ユーザー指定）
- 2026-01-13: Vercelプロジェクト名は`kotail`（ユーザー指定）

## メモ
- GitHub/Vercelの認証が必要。必要に応じて権限確認とログインを行う
