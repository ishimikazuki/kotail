# MCP / CLI Setup

This project includes MCP server definitions and CLI notes so Supabase/Vercel can be used immediately.

## MCP servers (project-scoped)

The repo now has `.mcp.json` with two HTTP MCP servers:

- `supabase` -> `https://mcp.supabase.com/mcp?project_ref=jjshrbvqpmiwsefeizqy`
- `vercel` -> `https://mcp.vercel.com`

Most MCP clients will discover `.mcp.json` automatically. If your client needs manual registration, add these servers using its MCP add command and follow the OAuth flow.

### Headless / CI auth (optional)

If your MCP client does not support OAuth, add an `Authorization: Bearer <token>` header for Supabase using a PAT created in the Supabase dashboard. Keep tokens out of git.

## Supabase CLI

Verify/install/login:

```bash
supabase --version
supabase login
supabase link --project-ref jjshrbvqpmiwsefeizqy
```

For storage uploads (CLI):

```bash
export SUPABASE_ACCESS_TOKEN="your-token"
supabase storage cp "/path/to/image.png" "ss:///company-images/filename.png" --experimental --linked
```

## Vercel CLI

Verify/login:

```bash
vercel --version
vercel login
```

The project is already linked via `.vercel/project.json`.
