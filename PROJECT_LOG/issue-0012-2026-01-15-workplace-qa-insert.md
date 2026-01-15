# 職場環境Q&Aの作成とSupabase登録

## Goal
- 職場環境の当たり障りないQ&Aを4件作成し、Supabaseのarticlesへ登録する

## Done
- 既存データを確認して対象会社IDとユーザーIDを選定
- Q&Aを4件作成
- service_roleキーでRLSを回避しINSERT

## Discoveries
- anonキーでのINSERTはRLSで拒否される（articlesテーブル）

## Decisions
- 既存記事の user_id を流用して登録
- 既存記事がある会社（株式会社テック・イノベーション）に紐付ける

## Notes
- company_id: 52aa3e2d-04f7-494f-a399-d826d27d3c2e
- user_id: 00000000-0000-0000-0000-000000000001
- 追加した記事ID: 43597e3c-3cd1-412a-be18-f1cf394a26c2, 545c1f1d-40e4-4dc1-9e0b-8edc36dcdb0b, 2ec4562e-6eda-4484-ac6d-7743e4a25411, 6d57af92-7905-4aa6-a2ff-822bb2a754b2
