
create schema if not exists private;
grant usage on schema private to authenticated, service_role;

create or replace function private.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;
revoke all on function private.has_role(uuid, public.app_role) from public, anon;
grant execute on function private.has_role(uuid, public.app_role) to authenticated, service_role;

drop policy "Admins can view orders" on public.orders;
drop policy "Admins can update orders" on public.orders;

create policy "Admins can view orders" on public.orders
for select to authenticated using (private.has_role(auth.uid(), 'admin') or private.has_role(auth.uid(), 'staff'));

create policy "Admins can update orders" on public.orders
for update to authenticated using (private.has_role(auth.uid(), 'admin') or private.has_role(auth.uid(), 'staff'))
with check (private.has_role(auth.uid(), 'admin') or private.has_role(auth.uid(), 'staff'));

drop function if exists public.has_role(uuid, public.app_role);
