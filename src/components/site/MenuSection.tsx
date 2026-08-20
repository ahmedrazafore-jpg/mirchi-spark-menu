import { useMemo, useState } from "react";
import { formatPrice, fullItemName, menu } from "@/data/menu";
import { orderMessage, whatsappHref } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SearchIcon, WhatsAppIcon } from "./Icons";

export function MenuSection({ heading = "The Menu" }: { heading?: string }) {
  const [active, setActive] = useState<string>(menu[0].id);
  const [query, setQuery] = useState("");

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
            Browse by category or search for a dish. All prices in PKR.
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
                const selected = !trimmed && c.id === active;
                return (
                  <button
                    key={c.id}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    onClick={() => {
                      setQuery("");
                      setActive(c.id);
                    }}
                    className={cn(
                      "h-10 shrink-0 rounded-md border px-4 text-xs font-semibold uppercase tracking-[0.13em] transition-colors",
                      selected
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

        <div className="mt-8 space-y-10">
          {categories.map((category) => (
            <div key={category.id}>
              {trimmed ? (
                <h3 className="mb-4 text-xl text-flame">{category.label}</h3>
              ) : null}
              <ul className="grid grid-cols-1 gap-x-8 gap-y-1 lg:grid-cols-2">
                {category.items.map((item) => {
                  const label = fullItemName(item);
                  return (
                    <li
                      key={`${category.id}-${label}`}
                      className="group flex items-baseline gap-3 border-b border-border/60 py-3.5"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.95rem] font-medium text-foreground">
                          {item.name}
                        </p>
                        {item.portion ? (
                          <p className="mt-0.5 text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                            {item.portion}
                          </p>
                        ) : null}
                      </div>
                      <span
                        aria-hidden="true"
                        className="hidden h-px flex-1 self-center bg-border/70 sm:block"
                      />
                      <span className="shrink-0 font-display text-base text-primary">
                        {formatPrice(item.price)}
                      </span>
                      <a
                        href={whatsappHref(orderMessage(label))}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Order ${label} on WhatsApp`}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-whatsapp hover:text-whatsapp"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                      </a>
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
    </section>
  );
}
