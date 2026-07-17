-- Create a customer profile whenever Supabase Auth creates a user.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Store members can read operational data. Mutations continue through audited
-- server endpoints using the service role.
create policy "members read store orders" on public.orders for select
using (public.is_store_member(store_id));

create policy "members read store products" on public.products for select
using (public.is_store_member(store_id));

create policy "members read store categories" on public.categories for select
using (public.is_store_member(store_id));

create policy "members read store discounts" on public.discounts for select
using (public.is_store_member(store_id));

create policy "members read store audit logs" on public.audit_logs for select
using (public.is_store_member(store_id, array['owner','admin']::public.store_role[]));

create policy "members read order items" on public.order_items for select
using (exists (
  select 1 from public.orders o
  where o.id = order_id and public.is_store_member(o.store_id)
));

create policy "members read shipments" on public.shipments for select
using (exists (
  select 1 from public.orders o
  where o.id = order_id and public.is_store_member(o.store_id)
));

create policy "members read inventory movements" on public.inventory_movements for select
using (exists (
  select 1 from public.product_variants v
  join public.products p on p.id = v.product_id
  where v.id = variant_id and public.is_store_member(p.store_id)
));
