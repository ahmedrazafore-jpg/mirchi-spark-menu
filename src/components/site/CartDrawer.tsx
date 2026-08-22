import { formatPrice } from "@/data/menu";
import { site, whatsappHref } from "@/data/site";
import { useCart } from "@/context/cart";
import { CloseIcon, MinusIcon, PlusIcon, TrashIcon, WhatsAppIcon } from "./Icons";

export function CartDrawer() {
  const { lines, count, subtotal, open, setOpen, setQuantity, removeItem, clear } =
    useCart();

  if (!open) return null;

  const message = [
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

  return (
    <div
      className="fixed inset-0 z-[80] flex justify-end bg-background/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Your cart"
      onClick={() => setOpen(false)}
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col border-l border-border bg-card"
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-xl">
            Your Order{" "}
            <span className="text-sm text-muted-foreground">({count})</span>
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close cart"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground hover:border-primary hover:text-primary"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-sm text-muted-foreground">
              Your cart is empty. Add something spicy from the menu.
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 items-center rounded-md border border-border px-5 text-xs font-semibold uppercase tracking-[0.14em] hover:border-primary hover:text-primary"
            >
              Browse menu
            </button>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto px-5 py-4">
            {lines.map((l) => (
              <li key={l.id} className="flex gap-3 border-b border-border/60 py-4">
                <img
                  src={l.image}
                  alt={l.name}
                  loading="lazy"
                  width={160}
                  height={160}
                  className="h-16 w-16 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-medium leading-snug">{l.name}</p>
                    <button
                      type="button"
                      aria-label={`Remove ${l.name}`}
                      onClick={() => removeItem(l.id)}
                      className="shrink-0 text-muted-foreground hover:text-primary"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                  {l.notes.trim() ? (
                    <p className="mt-0.5 text-[0.7rem] italic text-muted-foreground">
                      {l.notes.trim()}
                    </p>
                  ) : null}
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center rounded-md border border-border">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity(l.id, l.quantity - 1)}
                        className="inline-flex h-8 w-8 items-center justify-center hover:text-primary"
                      >
                        <MinusIcon className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-7 text-center text-sm">{l.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQuantity(l.id, l.quantity + 1)}
                        className="inline-flex h-8 w-8 items-center justify-center hover:text-primary"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="font-display text-base text-primary">
                      {formatPrice(l.price * l.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 ? (
          <footer className="space-y-3 border-t border-border px-5 py-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-display text-lg text-primary">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Delivery fee</span>
              <span>To be confirmed</span>
            </div>
            <a
              href={whatsappHref(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-whatsapp text-sm font-semibold uppercase tracking-[0.14em] text-flame-foreground hover:brightness-110"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Send order on WhatsApp
            </a>
            <button
              type="button"
              onClick={clear}
              className="w-full text-center text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"
            >
              Clear cart
            </button>
          </footer>
        ) : null}
      </aside>
    </div>
  );
}
