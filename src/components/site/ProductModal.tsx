import { useEffect, useState } from "react";
import { formatPrice } from "@/data/menu";
import { site, whatsappHref } from "@/data/site";
import { useCart } from "@/context/cart";
import { CloseIcon, MinusIcon, PlusIcon, WhatsAppIcon } from "./Icons";

export type Product = {
  name: string;
  price: number;
  image: string;
  category: string;
};

export function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addItem, setOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setQty(1);
    setNotes("");
  }, [product?.name]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const total = product.price * qty;
  const waText = `Assalamualaikum, I would like to order from ${site.name}:\n${qty} x ${product.name} — ${formatPrice(total)}${
    notes.trim() ? `\nNote: ${notes.trim()}` : ""
  }`;

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-background/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-border bg-card sm:rounded-2xl"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={640}
            className="h-full w-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 text-foreground"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
          <span className="absolute left-3 top-3 rounded bg-background/85 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-flame">
            {product.category}
          </span>
        </div>

        <div className="space-y-5 p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl leading-tight">{product.name}</h3>
            <span className="shrink-0 pt-1 font-display text-xl text-primary">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Quantity
            </span>
            <div className="flex items-center gap-1 rounded-md border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="inline-flex h-10 w-10 items-center justify-center text-foreground hover:text-primary"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-display text-lg">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(50, q + 1))}
                className="inline-flex h-10 w-10 items-center justify-center text-foreground hover:text-primary"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Special instructions
            </span>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="e.g. Less spicy, extra raita, no onion"
              className="mt-2 w-full resize-none rounded-md border border-border bg-background p-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </label>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                addItem({
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  category: product.category,
                  notes,
                  quantity: qty,
                });
                onClose();
                setOpen(true);
              }}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-colors hover:bg-flame hover:text-flame-foreground"
            >
              Add to cart • {formatPrice(total)}
            </button>
            <a
              href={whatsappHref(waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border px-5 text-sm font-semibold uppercase tracking-[0.14em] transition-colors hover:border-whatsapp hover:text-whatsapp"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
