import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/data/menu";
import { Logo } from "@/components/site/Logo";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "Order Dashboard | Mirchi Point Hyderabad" },
      {
        name: "description",
        content: "Manage incoming Mirchi Point orders and update their status.",
      },
      { property: "og:title", content: "Order Dashboard | Mirchi Point Hyderabad" },
      {
        property: "og:description",
        content: "Manage incoming Mirchi Point orders and update their status.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminOrders,
});

const STATUSES = [
  "new",
  "confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
  "completed",
  "cancelled",
] as const;

type Status = (typeof STATUSES)[number];

type OrderItem = {
  name: string;
  price: number;
  quantity: number;
  notes?: string;
};

type Order = {
  id: string;
  order_code: string;
  customer_name: string;
  phone: string;
  order_type: string;
  address: string | null;
  notes: string | null;
  items: OrderItem[];
  subtotal: number;
  status: Status;
  created_at: string;
};

const label = (s: string) => s.replace(/_/g, " ");

function AdminOrders() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"active" | "all">("active");

  const load = useCallback(async () => {
    const { data, error: dbError } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (dbError) {
      setError("You don't have access to the order dashboard.");
      setOrders([]);
      return;
    }
    setError(null);
    setOrders((data ?? []) as unknown as Order[]);
  }, []);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      await load();
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, [load, navigate]);

  async function updateStatus(id: string, status: Status) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    const { error: dbError } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id);
    if (dbError) {
      setError("Could not update that order.");
      void load();
    }
  }

  const visible =
    filter === "all"
      ? orders
      : orders.filter((o) => o.status !== "completed" && o.status !== "cancelled");

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link to="/" aria-label="Mirchi Point home">
            <Logo showTagline={false} />
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void load()}
              className="h-10 rounded-md border border-border px-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] hover:border-primary hover:text-primary"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                navigate({ to: "/auth" });
              }}
              className="h-10 rounded-md border border-border px-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] hover:border-primary hover:text-primary"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-3xl tracking-wide">Orders</h1>
          <div className="flex gap-2">
            {(["active", "all"] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`h-9 rounded-md border px-4 text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${
                  filter === f
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {error ? <p className="mt-4 text-sm text-primary">{error}</p> : null}
        {!ready && !error ? (
          <p className="mt-6 text-sm text-muted-foreground">Loading orders…</p>
        ) : null}

        {ready && !error && visible.length === 0 ? (
          <p className="mt-6 text-sm text-muted-foreground">No orders here yet.</p>
        ) : null}

        <ul className="mt-5 space-y-4">
          {visible.map((o) => (
            <li key={o.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-display text-xl">#{o.order_code}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(o.created_at).toLocaleString("en-PK")} •{" "}
                    {label(o.order_type)}
                  </p>
                </div>
                <span className="rounded-full border border-primary/60 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary">
                  {label(o.status)}
                </span>
              </div>

              <div className="mt-3 text-sm">
                <p className="font-medium">{o.customer_name}</p>
                <a href={`tel:${o.phone}`} className="text-primary">
                  {o.phone}
                </a>
                {o.address ? (
                  <p className="text-xs text-muted-foreground">{o.address}</p>
                ) : null}
                {o.notes ? (
                  <p className="mt-1 text-xs italic text-muted-foreground">
                    Note: {o.notes}
                  </p>
                ) : null}
              </div>

              <ul className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
                {(o.items ?? []).map((it, i) => (
                  <li key={i} className="flex justify-between gap-2">
                    <span>
                      {it.quantity} × {it.name}
                      {it.notes ? (
                        <span className="text-xs italic text-muted-foreground">
                          {" "}
                          ({it.notes})
                        </span>
                      ) : null}
                    </span>
                    <span className="text-muted-foreground">
                      {formatPrice(it.price * it.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex justify-between border-t border-border pt-3 text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display text-lg text-primary">
                  {formatPrice(Number(o.subtotal))}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void updateStatus(o.id, s)}
                    className={`h-9 rounded-md border px-3 text-[0.65rem] font-semibold uppercase tracking-[0.12em] ${
                      o.status === s
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/60"
                    }`}
                  >
                    {label(s)}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
