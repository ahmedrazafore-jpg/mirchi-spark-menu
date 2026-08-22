import { useMemo, useState } from "react";
import { formatPrice, fullItemName, menu } from "@/data/menu";
import { categoryImage, itemImage } from "@/data/images";
import { orderMessage, whatsappHref } from "@/data/site";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/cart";
import { Reveal } from "./Reveal";
import { SearchIcon, WhatsAppIcon } from "./Icons";
import { ProductModal, type Product } from "./ProductModal";

export function MenuSection({ heading = "The Menu" }: { heading?: string }) {
  const [active, setActive] = useState<string>(menu[0]?.id ?? "");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const { addItem, setOpen } = useCart();

  const trimmed = query.trim().toLowerCase();

  const categories = useMemo(() => {
    if (!trimmed) return menu.filter((c) => c.id === active);
    return menu
      .map((c) => ({
        ...c,
        items: c.items.filter((i) => fullItemName(i).toLowerCase().includes(trimmed)),
      }))
      .filter((c) => c.items.length > 0);
  }, [active, trimmed]);

  const resultCount = categories.reduce((n, c) => n + c.items.length, 0);

  return (
    <section id="menu" className="border-t border-border/60 bg-surface/40 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Fresh • Spicy • Made to order</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">{heading}</h2>
          <div className="rule-flame mt-4" />
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
            Browse by category or search for a dish. Tap any dish for details, quantity
            and special instructions. All prices in PKR.
          </p>
        </Reveal>

        <div className="mt-8 space-y-4">
          <label className="relative block">
            <span className="sr-only">Search menu</span>
            <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search menu..."
              className="h-12 w-full rounded-md border border-border bg-background pl-11 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
          </label>

          <div className="-mx-4 overflow-x-auto px-4 hide-scrollbar sm:mx-0 sm:px-0">
            <div
              role="tablist"
              aria-label="Menu categories"
              className="flex w-max min-w-full gap-2"
            >
              {menu.map((c) => {
                const selectedTab = !trimmed && c.id === active;
                return (
                  <button
                    key={c.id}
                    role="tab"
                    type="button"
                    aria-selected={selectedTab}
                    onClick={() => {
                      setQuery("");
                      setActive(c.id);
                    }}
                    className={cn(
                      "h-10 shrink-0 rounded-md border px-4 text-xs font-semibold uppercase tracking-[0.13em] transition-colors",
                      selectedTab
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground hover:border-primary hover:text-foreground",
                    )}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {trimmed ? (
          <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {resultCount} {resultCount === 1 ? "result" : "results"} for “{query.trim()}”
          </p>
        ) : null}

        <div className="mt-8 space-y-12">
          {categories.map((category) => (
            <div key={category.id}>
              {/* Category banner */}
              <div className="relative overflow-hidden rounded-lg border border-border">
                <img
                  src={categoryImage[category.id] ?? itemImage(category.id, category.label)}
                  alt={`${category.label} at Mirchi Point`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-28 w-full object-cover sm:h-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
                <div className="absolute inset-0 flex flex-col justify-center px-5 sm:px-8">
                  <p className="eyebrow">Mirchi Point</p>
                  <h3 className="mt-1 text-2xl uppercase text-foreground sm:text-4xl">
                    {category.label}
                  </h3>
                  <div className="rule-flame mt-2" />
                </div>
              </div>

              <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
                {category.items.map((item) => {
                  const label = fullItemName(item);
                  const image = itemImage(category.id, item.name);
                  const product: Product = {
                    name: label,
                    price: item.price,
                    image,
                    category: category.label,
                  };
                  return (
                    <li key={`${category.id}-${label}`}>
                      <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/70">
                        <button
                          type="button"
                          onClick={() => setSelected(product)}
                          className="relative block aspect-[4/3] w-full overflow-hidden text-left"
                          aria-label={`View ${label}`}
                        >
                          <img
                            src={image}
                            alt={label}
                            loading="lazy"
                            decoding="async"
                            width={1024}
                            height={768}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        </button>
                        <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
                          <button
                            type="button"
                            onClick={() => setSelected(product)}
                            className="text-left"
                          >
                            <p className="text-sm font-medium leading-snug text-foreground">
                              {item.name}
                            </p>
                            {item.portion ? (
                              <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                                {item.portion}
                              </p>
                            ) : null}
                          </button>
                          <span className="font-display text-base text-primary">
                            {formatPrice(item.price)}
                          </span>
                          <div className="mt-auto flex items-center gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                addItem({
                                  name: label,
                                  price: item.price,
                                  image,
                                  category: category.label,
                                  notes: "",
                                  quantity: 1,
                                });
                                setOpen(true);
                              }}
                              className="inline-flex h-9 flex-1 items-center justify-center rounded-md bg-primary px-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-flame hover:text-flame-foreground"
                            >
                              Add to cart
                            </button>
                            <a
                              href={whatsappHref(orderMessage(label))}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Order ${label} on WhatsApp`}
                              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-whatsapp hover:text-whatsapp"
                            >
                              <WhatsAppIcon className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {resultCount === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No dishes match that search. Try “karahi”, “biryani” or “burger”.
            </p>
          ) : null}
        </div>
      </div>

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
