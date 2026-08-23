import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/context/cart";
import { formatPrice } from "@/data/menu";
import { site, whatsappHref } from "@/data/site";
import { Logo } from "@/components/site/Logo";
import { WhatsAppIcon } from "@/components/site/Icons";

const title = "Checkout | Mirchi Point Hyderabad";
const description =
  "Place your Mirchi Point order online — delivery or pickup from C929+7FX, Jail Rd, Heerabad, Hyderabad.";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

type OrderType = "delivery" | "pickup";

function CheckoutPage() {
  const { lines, subtotal, setQuantity, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [placed, setPlaced] = useState<{ code: string } | null>(null);

  const waMessage = [
    `Assalamualaikum, I would like to place an order from ${site.name}:`,
    ...lines.map(
      (l) =>
        `• ${l.quantity} x ${l.name} — ${formatPrice(l.price * l.quantity)}${
          l.notes.trim() ? ` (Note: ${l.notes.trim()})` : ""
        }`,
    ),
    `Subtotal: ${formatPrice(subtotal)}`,
    "Delivery fee: To be confirmed",
  ].join("\n");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (lines.length === 0) return;
    if (orderType === "delivery" && address.trim().length < 6) {
      setError("Please enter a delivery address.");
      return;
    }
    setBusy(true);
    const { data, error: dbError } = await supabase
      .from("orders")
      .insert({
        customer_name: name.trim(),
        phone: phone.trim(),
        order_type: orderType,
        address: orderType === "delivery" ? address.trim() : null,
        notes: notes.trim() || null,
        items: lines.map((l) => ({
          name: l.name,
          price: l.price,
          quantity: l.quantity,
          notes: l.notes,
          category: l.category,
        })),
        subtotal,
      })
      .select("order_code")
      .single();
    setBusy(false);
    if (dbError || !data) {
      setError("We couldn't place your order. Please try WhatsApp instead.");
      return;
    }
    setPlaced({ code: data.order_code });
    clear();
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" aria-label="Mirchi Point home">
            <Logo showTagline={false} />
          </Link>
          <Link
            to="/"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"
          >
            Back to menu
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
        <h1 className="font-display text-3xl tracking-wide sm:text-4xl">Checkout</h1>

        {placed ? (
          <div className="mt-6 rounded-lg border border-primary/50 bg-card p-6 text-center">
            <p className="font-display text-2xl text-primary">Order received</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Your order number is{" "}
              <span className="font-semibold text-foreground">#{placed.code}</span>. We
              will call you on {phone} to confirm the total and delivery fee.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground"
            >
              Back to home
            </Link>
          </div>
        ) : lines.length === 0 ? (
          <div className="mt-6 rounded-lg border border-border bg-card p-6 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/"
              className="mt-5 inline-flex h-12 items-center justify-center rounded-md border border-border px-6 text-xs font-semibold uppercase tracking-[0.14em] hover:border-primary hover:text-primary"
            >
              Browse the menu
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_20rem]">
            <form onSubmit={submit} className="space-y-4">
              <Field label="Your name">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Ahmed Raza"
                />
              </Field>
              <Field label="Phone number">
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputClass}
                  placeholder="03xx-xxxxxxx"
                />
              </Field>
              <fieldset>
                <legend className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Order type
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {(["delivery", "pickup"] as OrderType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setOrderType(t)}
                      className={`h-12 rounded-md border text-xs font-semibold uppercase tracking-[0.14em] ${
                        orderType === t
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/60"
                      }`}
                    >
                      {t === "delivery" ? "Delivery" : "Pickup"}
                    </button>
                  ))}
                </div>
              </fieldset>
              {orderType === "delivery" ? (
                <Field label="Delivery address">
                  <textarea
                    required
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={inputClass}
                    placeholder="House / street / area, Hyderabad"
                  />
                </Field>
              ) : (
                <p className="rounded-md border border-border bg-card px-4 py-3 text-xs text-muted-foreground">
                  Pickup from {site.address}
                </p>
              )}
              <Field label="Special instructions (optional)">
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Less spicy, extra raita"
                />
              </Field>

              {error ? <p className="text-sm text-primary">{error}</p> : null}

              <button
                type="submit"
                disabled={busy}
                className="h-12 w-full rounded-md bg-primary text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground disabled:opacity-60"
              >
                {busy ? "Placing order…" : "Place order"}
              </button>

              <a
                href={whatsappHref(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-whatsapp text-sm font-semibold uppercase tracking-[0.14em] text-flame-foreground hover:brightness-110"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Order on WhatsApp instead
              </a>
            </form>

            <aside className="h-fit rounded-lg border border-border bg-card p-4">
              <h2 className="font-display text-xl">Order summary</h2>
              <ul className="mt-3 space-y-3">
                {lines.map((l) => (
                  <li key={l.id} className="text-sm">
                    <div className="flex justify-between gap-2">
                      <span>
                        {l.quantity} × {l.name}
                      </span>
                      <span className="text-primary">
                        {formatPrice(l.price * l.quantity)}
                      </span>
                    </div>
                    {l.notes.trim() ? (
                      <p className="text-[0.7rem] italic text-muted-foreground">
                        {l.notes.trim()}
                      </p>
                    ) : null}
                    <div className="mt-1 flex gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                      <button
                        type="button"
                        onClick={() => setQuantity(l.id, l.quantity - 1)}
                        className="hover:text-primary"
                      >
                        −
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuantity(l.id, l.quantity + 1)}
                        className="hover:text-primary"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuantity(l.id, 0)}
                        className="hover:text-primary"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 space-y-1 border-t border-border pt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-display text-lg text-primary">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Delivery fee</span>
                  <span>To be confirmed</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

const inputClass =
  "w-full rounded-md border border-border bg-surface-2 px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
