# 企業ページの質問者アイコンをカラーAvatarに差し替え

## Goal
- 企業ページの質問者アイコンを、トンマナを保った色付きアイコンに変更する

## Done
- 質問者アイコンをSVG RepoのAvatar（汎用 / CC0）へ差し替え
- 企業回答側の建物アイコンは既存のまま維持

## Discoveries
- なし

## Decisions
- 2026-01-15: 既存の丸背景は維持しつつ、アイコンだけ色付きにする
- 2026-01-15: CC0のSVG Repo Avatar（汎用）を採用（色付きでUIと馴染むため）

## Notes
- 変更対象: src/components/ReviewCard.tsx
