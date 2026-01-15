# Supabase データインポート手順書

100件程度のデータ（画像含む）をSupabaseにインポートするベストプラクティス。

## 概要

| 方法 | テキストデータ | 画像 | 手軽さ |
|------|--------------|------|--------|
| CSVダッシュボード | 最も簡単 | 別途必要 | ★★★ |
| MCP + Claude Code | 可能 | 一緒に処理可 | ★★★ |
| スクリプト作成 | 可能 | 完全制御 | ★☆☆ |

**画像があるなら MCP + Claude Code がおすすめ**

---

## 手順

### Step 1: 画像をSupabase Storageにアップロード

#### 方法A: Supabase CLI（自動化向け・推奨）

```bash
# 初回セットアップ
brew install supabase/tap/supabase
supabase login  # ブラウザ認証、またはSUPABASE_ACCESS_TOKEN環境変数を設定
supabase link --project-ref jjshrbvqpmiwsefeizqy

# バケット作成（SQLで実行）
# INSERT INTO storage.buckets (id, name, public) VALUES ('company-images', 'company-images', true);

# 画像アップロード
export SUPABASE_ACCESS_TOKEN="your-token"
supabase storage cp "/path/to/image.png" "ss:///company-images/filename.png" --experimental --linked

# 確認
supabase storage ls "ss:///company-images/" --experimental --linked
```

#### 方法B: ダッシュボード（手動）

1. Supabase ダッシュボード → Storage → New bucket
2. バケット名: `company-images`（publicに設定）
3. 画像ファイルをまとめてドラッグ&ドロップ

**画像URL形式:**
```
https://jjshrbvqpmiwsefeizqy.supabase.co/storage/v1/object/public/company-images/{filename}
```

### Step 2: データをJSON形式で準備

```json
[
  {
    "name": "株式会社サンプル",
    "address": "東京都渋谷区...",
    "prefecture": "東京都",
    "url": "https://example.com",
    "employee_count": "100-500名",
    "established": "2010年",
    "capital": "1億円",
    "industries": ["ITサービス", "SaaS"],
    "business": "ITサービス（旧カラム）",
    "hero_image_path": "/path/to/sample-company.png",
    "overall_summary": "成長中のIT企業...",
    "pros": ["リモートワーク可", "福利厚生充実"],
    "cons": ["残業多め"]
  }
]
```

**注意:**
- `hero_image_path`: ローカルの画像パス。**MV（ヒーロー）とサムネイル両方に使用**
- `tagline`: 不要（画像に文字が含まれているため）

**カラム一覧（companiesテーブル）:**
- `name` (必須) - 企業名
- `address` (必須) - 住所
- `prefecture` - 都道府県
- `url` - 企業サイトURL
- `employee_count` - 従業員数
- `established` - 設立年
- `capital` - 資本金
- `business` - 事業内容（旧カラム）
- `hero_image_url` - MV画像URL（サムネイルと共通）
- `overall_summary` - 総評
- `pros` - 良い点（配列）
- `cons` - 悪い点（配列）

**業種は正規化（industries / company_industries）:**
- `industries` に業種名を登録し、`company_industries` で企業と紐づけ
- 旧データ移行時は `business` を埋めてからマイグレーションのバックフィルを使ってもOK

### Step 3: Claude Code + MCPでINSERT

JSONデータをClaude Codeに渡すと、MCPの `execute_sql` でまとめてINSERTしてくれる。

---

## 注意点

- 画像アップロードはMCPでは直接できないが、**Supabase CLI経由でClaude Codeから自動化可能**
- CLIのstorageコマンドは `--experimental` フラグが必要（2026年1月現在）
- 6MB以上のファイルはCLIの `cp` コマンドでは非対応（TUS resumable uploadを使う）
- 大量データ（1000件以上）の場合は `psql` の `COPY` コマンドを検討
- RLSが有効な場合、service_role経由でINSERTする必要がある

---

## 参考リンク

- [Import data into Supabase](https://supabase.com/docs/guides/database/import-data)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
