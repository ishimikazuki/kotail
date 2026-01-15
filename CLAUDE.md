# kotail プロジェクト設定

## Supabase 情報

- **Project ID**: `jjshrbvqpmiwsefeizqy`
- **Project Name**: kotail
- **Region**: ap-northeast-1

## 企業データ一括登録

ユーザーが企業データのJSONを渡したら、以下を自動実行する：

### 入力フォーマット

```json
[
  {
    "name": "企業名（必須）",
    "address": "住所（必須）",
    "prefecture": "都道府県（任意）",
    "url": "企業サイトURL",
    "employee_count": "従業員数",
    "established": "設立年",
    "capital": "資本金",
    "industries": ["業種1", "業種2"],
    "business": "事業内容（旧カラム、移行までの互換用）",
    "hero_image_path": "/path/to/local/image.png",
    "overall_summary": "総評",
    "pros": ["良い点1", "良い点2"],
    "cons": ["悪い点1", "悪い点2"]
  }
]
```

**注意:**
- `hero_image_path`: ローカルの画像パス。MV（ヒーロー）とサムネイル両方に使用される
- `tagline`: 不要（画像に文字が含まれているため）

### 実行手順

1. **画像アップロード**（`hero_image_path`がある場合）
   ```bash
   export SUPABASE_ACCESS_TOKEN="トークン"
   supabase storage cp "{hero_image_path}" "ss:///company-images/{filename}.png" --experimental --linked
   ```

2. **DBにINSERT**（MCP経由）
   - `hero_image_url` は自動生成: `https://jjshrbvqpmiwsefeizqy.supabase.co/storage/v1/object/public/company-images/{filename}`
   - MCPの `execute_sql` でINSERT
   - **MV画像とサムネイル画像は同じ `hero_image_url` を使用**
   - `industries` がある場合は `industries` テーブルへ登録し、`company_industries` で紐づけ

### バケット情報

- **Bucket**: `company-images`（public）
- **URL形式**: `https://jjshrbvqpmiwsefeizqy.supabase.co/storage/v1/object/public/company-images/{filename}`

### companiesテーブル構造

| カラム | 型 | 必須 | 説明 |
|--------|-----|------|------|
| name | text | ✓ | 企業名 |
| address | text | ✓ | 住所 |
| prefecture | text | | 都道府県 |
| url | text | | 企業サイトURL |
| employee_count | text | | 従業員数 |
| established | text | | 設立年 |
| capital | text | | 資本金 |
| business | text | | 事業内容（旧カラム） |
| hero_image_url | text | | MV画像URL（サムネイルと共通） |
| overall_summary | text | | 総評 |
| pros | text[] | | 良い点の配列 |
| cons | text[] | | 悪い点の配列 |

### industriesテーブル構造

| カラム | 型 | 必須 | 説明 |
|--------|-----|------|------|
| id | uuid | ✓ | 業種ID |
| name | text | ✓ | 業種名（ユニーク） |
| created_at | timestamptz | | 作成日時 |

### company_industriesテーブル構造

| カラム | 型 | 必須 | 説明 |
|--------|-----|------|------|
| company_id | uuid | ✓ | 企業ID |
| industry_id | uuid | ✓ | 業種ID |
| created_at | timestamptz | | 作成日時 |

### 認証

Supabase CLIの認証が必要。トークンがない場合はユーザーに確認：
- https://supabase.com/dashboard/account/tokens でトークン生成
