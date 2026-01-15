# ブランド表記/検索ページ/業種・都道府県対応

## Goal
- ブランド表記を「コタエル」に統一し、企業検索ページと業種/都道府県対応を実装する

## Done
- ロゴ表記を「コタエル」に変更し、FVコピーを更新
- /companies ページを追加し、検索フォームと企業一覧カードを実装
- 業種の正規化（industries / company_industries）と都道府県カラムを追加
- 企業検索・詳細表示を業種/都道府県に対応
- ヘッダーの「コラム」リンクを削除

## Discoveries
- なし

## Decisions
- 業種は industries / company_industries の正規化で運用する
- 企業所在地は都道府県のみを新カラムとして保持する
- 検索ページのUIは既存の青系トーンに合わせる

## Notes
- マイグレーション: `supabase/migrations/20260115093000_add_industries_and_prefecture.sql`
