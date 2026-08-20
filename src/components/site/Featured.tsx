import biryani from "@/assets/dish-biryani.jpg";
import zinger from "@/assets/dish-zinger.jpg";
import bbq from "@/assets/dish-bbq.jpg";
import rice from "@/assets/dish-rice.jpg";
import chowmein from "@/assets/dish-chowmein.jpg";
import karahi from "@/assets/hero-karahi.jpg";
import { formatPrice } from "@/data/menu";
import { orderMessage, whatsappHref } from "@/data/site";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./Icons";

/** Featured picks — replace `image` with real restaurant photos when available. */
const featured = [
  { name: "Special Mirchi Rice", category: "Chinese", price: 800, image: rice },
  {
    name: "Special Chicken Butter Karahi (Half)",
    category: "Karahi & Handi",
    price: 1200,
    image: karahi,
  },
  {
    name: "Mirchi Special Matka Biryani (Half kg)",
    category: "Biryani",
    price: 500,
    image: biryani,
  },
  { name: "Chicken Malai Tikka", category: "BBQ", price: 600, image: bbq },
  { name: "Zinger Burger", category: "Fast Food", price: 480, image: zinger },
  { name: "Chicken Chowmein", category: "Chinese", price: 650, image: chowmein },
];

export function Featured() {
  return (
    <section id="featured" className="border-t border-border/60 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Must Try</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Fan Favourites</h2>
          <div className="rule-flame mt-4" />
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            A few delicious reasons to visit Mirchi Point.
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item, i) => (
            <Reveal as="li" key={item.name} delay={i * 70}>
              <article className="group h-full overflow-hidden rounded-lg border border-border bg-card transition-colors duration-300 hover:border-primary/70">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded bg-background/85 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-flame">
                    {item.category}
                  </span>
                </div>
                <div className="flex flex-col gap-3 p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg leading-tight">{item.name}</h3>
                    <span className="shrink-0 pt-0.5 font-display text-base text-primary">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <a
                    href={whatsappHref(orderMessage(item.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-border text-xs font-semibold uppercase tracking-[0.14em] transition-colors hover:border-whatsapp hover:text-whatsapp"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Order
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
