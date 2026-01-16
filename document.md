# document.md

## プロジェクト概要
- **目的**: 企業の評判・口コミをAIでまとめて表示するサービス「コタエル」
- **技術スタック**: Next.js 16, React 19, Supabase, Tailwind CSS, TypeScript
- **現在のフェーズ**: MVP開発中

## Supabase情報
- **Project ID**: `jjshrbvqpmiwsefeizqy`
- **Project Name**: kotail
- **Region**: ap-northeast-1
- **Storage Bucket**: `company-images`（public）

## 重要ルール・制約
- 企業データはJSONで渡せば自動登録（CLAUDE.md参照）
- MV画像とサムネイル画像は同じ `hero_image_url` を使用
- taglineは画像に含まれているためDB不要

## 今の作業
→ PLANS.md を参照（なければ特になし）

## 重要な決定事項
- 2026-01-16: LPは `kotail-lp.vercel.app` で独立デプロイ
- 2026-01-15: Supabase CLI経由で画像アップロードを自動化
- 2026-01-15: hero_image_urlをMVとサムネイル両方で共用
- 2026-01-15: MCP設定を`.mcp.json`に集約し、Supabase/Vercelをプロジェクト単位で利用可能にする

## ログ参照
→ PROJECT_LOG/INDEX.md
