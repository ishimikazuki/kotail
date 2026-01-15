# Supabaseデータインポート環境構築

## Goal
- 100件程度の企業データ（画像含む）を効率的にSupabaseにインポートできる仕組みを作る
- JSONを渡すだけで自動登録できるようにする

## Done
- Supabase CLIのインストール・セットアップ
- `company-images` バケット作成
- GENAI社のサンプルデータ登録（画像 + DBレコード）
- ヒーロー画像をダークブルー画像に変更（青グラデーション廃止）
- 環境変数（SUPABASE_URL, ANON_KEY）の設定
- CLAUDE.md作成（JSON投げるだけで企業登録できる設定）
- SUPABASE_DATA_IMPORT.md作成（手順書）
- kotail-lpプロジェクトをリポジトリに追加

## Discoveries
- Supabase MCPにはStorage直接アップロード機能がない
- Supabase CLI経由（`supabase storage cp`）で自動化可能
- CLIのstorageコマンドは `--experimental` フラグが必要（2026年1月現在）

## Decisions
- 画像はSupabase Storageの `company-images` バケットに格納
- MV画像とサムネイル画像は同じ `hero_image_url` を使用
- taglineは画像に含まれているためDB不要

## Notes
- 6MB以上のファイルはCLIの `cp` コマンドでは非対応（TUS resumable upload使用）
- Supabase CLIトークンは https://supabase.com/dashboard/account/tokens で生成
