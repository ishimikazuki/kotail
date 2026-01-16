# LPデプロイとヘッダーリンク設定

## Goal
- kotail-lpをVercelにデプロイ
- 親kotailのヘッダー「掲載をご希望の方へ」からLPへリンク
- ホームのセクション順変更（企業一覧を口コミ回答探すより上に）

## Done
- kotail-lpをVercelにデプロイ → https://kotail-lp.vercel.app
- Header.tsxの「掲載をご希望の方へ」リンクをLPに変更
- page.tsxのセクション順を変更（企業一覧 → 口コミ回答を探す）

## Discoveries
- kotail-lpは独立したNext.jsプロジェクトとしてVercelにデプロイ
- 親kotailとは別のVercelプロジェクトとして管理

## Decisions
- 2026-01-16: LPは `kotail-lp.vercel.app` でホスト
- 2026-01-16: 「掲載をご希望の方へ」は新しいタブで開く（外部リンク扱い）
- 2026-01-16: ホームの順番は 企業一覧 → 口コミ回答を探す → 最近の回答

## Notes
- LPのトンマナ変更（ダーク→ライト）は前セッションのコンテキストにのみ存在、ファイル未反映の可能性あり
