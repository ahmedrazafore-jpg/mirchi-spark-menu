import karahi from "@/assets/hero-karahi.jpg";
import biryani from "@/assets/dish-biryani.jpg";
import bbq from "@/assets/dish-bbq.jpg";
import zinger from "@/assets/dish-zinger.jpg";
import roll from "@/assets/dish-roll.jpg";
import chowmein from "@/assets/dish-chowmein.jpg";
import rice from "@/assets/dish-rice.jpg";
import flame from "@/assets/about-flame.jpg";
import { Reveal } from "./Reveal";

/** Demo imagery — swap `src` with real Mirchi Point photos when supplied. */
const shots = [
  { src: karahi, alt: "Chicken karahi in an iron wok", tag: "Karahi", tall: true },
  { src: bbq, alt: "Chicken tikka skewers on the grill", tag: "BBQ" },
  { src: biryani, alt: "Matka biryani in a clay pot", tag: "Biryani" },
  { src: zinger, alt: "Zinger burger with fries", tag: "Fast Food" },
  { src: roll, alt: "Chicken paratha rolls", tag: "Rolls", tall: true },
  { src: chowmein, alt: "Chicken chowmein noodles in a wok", tag: "Chinese" },
  { src: rice, alt: "Spicy chicken fried rice", tag: "Rice" },
  { src: flame, alt: "Open charcoal flame in the kitchen", tag: "Kitchen" },
];

export function Gallery() {
  return (
    <section id="gallery" className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Gallery</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Straight From The Kitchen</h2>
          <div className="rule-flame mt-4" />
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {shots.map((shot, i) => (
            <Reveal
              as="li"
              key={shot.alt}
              delay={i * 50}
              className={shot.tall ? "lg:row-span-2" : undefined}
            >
              <figure className="group relative h-full overflow-hidden rounded-lg border border-border">
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  decoding="async"
                  width={1024}
                  height={1024}
                  className={
                    "w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 " +
                    (shot.tall ? "h-56 sm:h-72 lg:h-full lg:min-h-[26rem]" : "h-40 sm:h-56")
                  }
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-3 pb-2.5 pt-8 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-foreground">
                  {shot.tag}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
