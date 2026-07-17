-- NORTH & FORM: initial ecommerce schema
-- Apply with Supabase CLI: supabase db push

create extension if not exists pgcrypto;

create type public.store_role as enum ('owner', 'admin', 'staff');
create type public.product_status as enum ('draft', 'active', 'archived');
create type public.cart_status as enum ('active', 'converted', 'abandoned');
create type public.order_status as enum ('draft', 'pending_payment', 'confirmed', 'cancelled', 'completed');
create type public.payment_status as enum ('pending', 'authorized', 'captured', 'failed', 'refunded', 'partially_refunded');
create type public.fulfillment_status as enum ('unfulfilled', 'processing', 'shipped', 'delivered', 'returned');
create type public.discount_type as enum ('percentage', 'fixed');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.stores (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  currency char(3) not null default 'INR',
  country_code char(2) not null default 'IN',
  support_email text,
  logo_url text,
  theme_json jsonb not null default '{}'::jsonb,
  settings_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.store_members (
  store_id uuid not null references public.stores(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.store_role not null default 'staff',
  created_at timestamptz not null default now(),
  primary key (store_id, user_id)
);

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text,
  recipient_name text not null,
  phone text not null,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country_code char(2) not null default 'IN',
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  parent_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (store_id, slug)
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text not null,
  description text not null default '',
  brand text,
  status public.product_status not null default 'draft',
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (store_id, slug)
);

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  sku text not null unique,
  option_values jsonb not null default '{}'::jsonb,
  price_minor bigint not null check (price_minor >= 0),
  compare_at_minor bigint check (compare_at_minor is null or compare_at_minor >= 0),
  cost_minor bigint check (cost_minor is null or cost_minor >= 0),
  inventory_qty integer not null default 0 check (inventory_qty >= 0),
  reserved_qty integer not null default 0 check (reserved_qty >= 0 and reserved_qty <= inventory_qty),
  weight_grams integer check (weight_grams is null or weight_grams >= 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  variant_id uuid references public.product_variants(id) on delete cascade,
  storage_path text not null,
  alt_text text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.collections (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  name text not null,
  slug text not null,
  description text not null default '',
  rule_json jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (store_id, slug)
);

create table public.product_collections (
  collection_id uuid not null references public.collections(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (collection_id, product_id)
);

create table public.carts (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  guest_token uuid unique,
  status public.cart_status not null default 'active',
  currency char(3) not null default 'INR',
  expires_at timestamptz not null default (now() + interval '30 days'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (user_id is not null or guest_token is not null)
);

create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  variant_id uuid not null references public.product_variants(id) on delete cascade,
  quantity integer not null check (quantity > 0),
  unit_price_snapshot bigint not null check (unit_price_snapshot >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (cart_id, variant_id)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_no text not null unique,
  store_id uuid not null references public.stores(id) on delete restrict,
  user_id uuid references auth.users(id) on delete set null,
  email text not null,
  phone text not null,
  shipping_address jsonb not null,
  billing_address jsonb not null,
  subtotal_minor bigint not null check (subtotal_minor >= 0),
  discount_minor bigint not null default 0 check (discount_minor >= 0),
  shipping_minor bigint not null default 0 check (shipping_minor >= 0),
  tax_minor bigint not null default 0 check (tax_minor >= 0),
  total_minor bigint not null check (total_minor >= 0),
  currency char(3) not null default 'INR',
  status public.order_status not null default 'draft',
  payment_status public.payment_status not null default 'pending',
  fulfillment_status public.fulfillment_status not null default 'unfulfilled',
  idempotency_key uuid not null unique,
  placed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete restrict,
  product_id uuid references public.products(id) on delete set null,
  variant_id uuid references public.product_variants(id) on delete set null,
  product_name text not null,
  sku text not null,
  option_values jsonb not null default '{}'::jsonb,
  quantity integer not null check (quantity > 0),
  unit_price_minor bigint not null check (unit_price_minor >= 0),
  total_minor bigint not null check (total_minor >= 0)
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete restrict,
  provider text not null,
  provider_order_id text not null,
  provider_payment_id text,
  status public.payment_status not null default 'pending',
  amount_minor bigint not null check (amount_minor >= 0),
  fee_minor bigint check (fee_minor is null or fee_minor >= 0),
  currency char(3) not null default 'INR',
  payload_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (provider, provider_order_id),
  unique (provider, provider_payment_id)
);

create table public.shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete restrict,
  carrier text,
  tracking_no text,
  tracking_url text,
  status public.fulfillment_status not null default 'unfulfilled',
  shipped_at timestamptz,
  delivered_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.discounts (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  code text not null,
  type public.discount_type not null,
  value bigint not null check (value > 0),
  min_order_minor bigint not null default 0 check (min_order_minor >= 0),
  starts_at timestamptz,
  ends_at timestamptz,
  usage_limit integer check (usage_limit is null or usage_limit > 0),
  per_user_limit integer check (per_user_limit is null or per_user_limit > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (store_id, code)
);

create table public.discount_redemptions (
  id uuid primary key default gen_random_uuid(),
  discount_id uuid not null references public.discounts(id) on delete restrict,
  order_id uuid not null references public.orders(id) on delete restrict,
  user_id uuid references auth.users(id) on delete set null,
  amount_minor bigint not null check (amount_minor >= 0),
  created_at timestamptz not null default now(),
  unique (discount_id, order_id)
);

create table public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid not null references public.product_variants(id) on delete restrict,
  order_id uuid references public.orders(id) on delete set null,
  delta integer not null check (delta <> 0),
  reason text not null,
  reference text,
  actor_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.pages (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  slug text not null,
  title text not null,
  seo_title text,
  seo_description text,
  status public.product_status not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (store_id, slug)
);

create table public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  type text not null,
  config_json jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.webhook_events (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  event_id text not null,
  type text not null,
  payload_json jsonb not null,
  status text not null default 'received',
  attempts integer not null default 0,
  processed_at timestamptz,
  last_error text,
  created_at timestamptz not null default now(),
  unique (provider, event_id)
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete restrict,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_json jsonb,
  after_json jsonb,
  created_at timestamptz not null default now()
);

create index products_catalog_idx on public.products (store_id, status, created_at desc);
create index variants_product_idx on public.product_variants (product_id, is_active);
create index orders_store_history_idx on public.orders (store_id, created_at desc);
create index orders_user_history_idx on public.orders (user_id, created_at desc);
create index cart_user_idx on public.carts (user_id, status);
create index inventory_variant_idx on public.inventory_movements (variant_id, created_at desc);

create or replace function public.is_store_member(target_store uuid, allowed_roles public.store_role[] default array['owner','admin','staff']::public.store_role[])
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.store_members
    where store_id = target_store and user_id = auth.uid() and role = any(allowed_roles)
  );
$$;

alter table public.profiles enable row level security;
alter table public.stores enable row level security;
alter table public.store_members enable row level security;
alter table public.addresses enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images enable row level security;
alter table public.collections enable row level security;
alter table public.product_collections enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.shipments enable row level security;
alter table public.discounts enable row level security;
alter table public.discount_redemptions enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.pages enable row level security;
alter table public.page_sections enable row level security;
alter table public.webhook_events enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles own row" on public.profiles for all using (id = auth.uid()) with check (id = auth.uid());
create policy "addresses own rows" on public.addresses for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "stores publicly readable" on public.stores for select using (true);
create policy "members read own memberships" on public.store_members for select using (user_id = auth.uid() or public.is_store_member(store_id, array['owner','admin']::public.store_role[]));
create policy "catalog categories public" on public.categories for select using (is_active);
create policy "catalog products public" on public.products for select using (status = 'active');
create policy "catalog variants public" on public.product_variants for select using (is_active and exists (select 1 from public.products p where p.id = product_id and p.status = 'active'));
create policy "catalog images public" on public.product_images for select using (exists (select 1 from public.products p where p.id = product_id and p.status = 'active'));
create policy "collections public" on public.collections for select using (is_active);
create policy "collection products public" on public.product_collections for select using (true);
create policy "published pages public" on public.pages for select using (status = 'active');
create policy "published sections public" on public.page_sections for select using (is_visible and exists (select 1 from public.pages p where p.id = page_id and p.status = 'active'));
create policy "customers own carts" on public.carts for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "customers own cart items" on public.cart_items for all using (exists (select 1 from public.carts c where c.id = cart_id and c.user_id = auth.uid())) with check (exists (select 1 from public.carts c where c.id = cart_id and c.user_id = auth.uid()));
create policy "customers read own orders" on public.orders for select using (user_id = auth.uid());
create policy "customers read own order items" on public.order_items for select using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "customers read own payments" on public.payments for select using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));
create policy "customers read own shipments" on public.shipments for select using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

-- Admin mutations are intentionally performed through audited server-side operations.
-- The service role bypasses RLS; never expose it to a browser bundle.
