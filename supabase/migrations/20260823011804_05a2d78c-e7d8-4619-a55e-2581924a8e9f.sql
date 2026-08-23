
create type public.app_role as enum ('admin', 'staff', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "Users can read own roles" on public.user_roles
for select to authenticated using (user_id = auth.uid());

create type public.order_status as enum (
  'new','confirmed','preparing','ready','out_for_delivery','completed','cancelled'
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text not null unique default upper(substr(replace(gen_random_uuid()::text,'-',''),1,6)),
  customer_name text not null,
  phone text not null,
  order_type text not null check (order_type in ('delivery','pickup')),
  address text,
  notes text,
  items jsonb not null,
  subtotal numeric(10,2) not null,
  status order_status not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

grant insert on public.orders to anon, authenticated;
grant select, update on public.orders to authenticated;
grant all on public.orders to service_role;

alter table public.orders enable row level security;

create policy "Anyone can place an order" on public.orders
for insert to anon, authenticated with check (true);

create policy "Admins can view orders" on public.orders
for select to authenticated using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'staff'));

create policy "Admins can update orders" on public.orders
for update to authenticated using (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'staff'))
with check (public.has_role(auth.uid(), 'admin') or public.has_role(auth.uid(), 'staff'));

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end; $$;

create trigger orders_updated_at before update on public.orders
for each row execute function public.set_updated_at();
