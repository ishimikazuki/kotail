# Supabase/Vercel MCPとCLIの有効化

## Goal
- Supabase/VercelのCLIとMCPを、このプロジェクトで即使える状態にする

## Done
- `.mcp.json` を追加してSupabase/Vercel MCPを定義
- `MCP_SETUP.md` にMCP/OAuthとCLI手順を整理
- Claude向け設定でVercel MCPを有効化（ローカル）

## Discoveries
- Supabase MCPはOAuthログインが必要（必要ならPATヘッダで代替）

## Decisions
- 既存のProject Ref `jjshrbvqpmiwsefeizqy` にスコープして設定（誤接続防止）

## Notes
- MCP接続の詳細は `MCP_SETUP.md` を参照
