# ホームに絞り込みボタン追加

## Goal
- ホーム下部に業種・地域で探せる絞り込みUIを追加する

## Done
- `src/app/page.tsx`に業種・都道府県の絞り込みセクションを追加
- 業種はDBから取得、都道府県は固定配列で定義
- `/companies?industry=xxx` や `/companies?prefecture=xxx` へ遷移する導線

## Discoveries
- 特になし

## Decisions
- 2026-01-15: 業種・地域ボタンは `/companies` へ遷移する導線で実装（既存検索ページを活用するため）
- 絞り込みボタンのデザインはカード内にグリッド表示

## Notes
- 都道府県は47件の固定配列
- 業種はindustryServiceから動的取得
