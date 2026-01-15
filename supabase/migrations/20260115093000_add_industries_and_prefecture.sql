-- Add prefecture and normalize industries
-- Note: pgcrypto is enabled by default in Supabase projects

alter table companies
  add column if not exists prefecture text;

create table if not exists industries (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  created_at timestamptz default now()
);

create table if not exists company_industries (
  company_id uuid references companies(id) on delete cascade,
  industry_id uuid references industries(id) on delete restrict,
  created_at timestamptz default now(),
  primary key (company_id, industry_id)
);

create index if not exists company_industries_company_id_idx
  on company_industries(company_id);

create index if not exists company_industries_industry_id_idx
  on company_industries(industry_id);

-- Backfill industries from legacy business column
insert into industries (name)
select distinct business
from companies
where business is not null and business <> ''
on conflict (name) do nothing;

insert into company_industries (company_id, industry_id)
select c.id, i.id
from companies c
join industries i on i.name = c.business
where c.business is not null and c.business <> ''
on conflict do nothing;

-- Backfill prefecture from address (if address starts with prefecture)
update companies
set prefecture = substring(address from '^(北海道|青森県|岩手県|宮城県|秋田県|山形県|福島県|茨城県|栃木県|群馬県|埼玉県|千葉県|東京都|神奈川県|新潟県|富山県|石川県|福井県|山梨県|長野県|岐阜県|静岡県|愛知県|三重県|滋賀県|京都府|大阪府|兵庫県|奈良県|和歌山県|鳥取県|島根県|岡山県|広島県|山口県|徳島県|香川県|愛媛県|高知県|福岡県|佐賀県|長崎県|熊本県|大分県|宮崎県|鹿児島県|沖縄県)')
where prefecture is null
  and address is not null;
