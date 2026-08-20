import aboutImage from "@/assets/about-flame.jpg";
import { Reveal } from "./Reveal";
import { ActionButton } from "./ActionButton";
import { ArrowIcon } from "./Icons";

const pillars = [
  { title: "Fast Food", copy: "Burgers, broast, sandwiches and rolls." },
  { title: "BBQ & Karahi", copy: "Charcoal tikka, boti, kabab, karahi and handi." },
  { title: "Biryani & Chinese", copy: "Matka biryani, rice, chowmein, pasta and soups." },
];

export function About() {
  return (
    <section id="about" className="border-t border-border/60 py-16 sm:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <p className="eyebrow">About Us</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Welcome to Mirchi Point</h2>
          <div className="rule-flame mt-4" />
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            At Mirchi Point, great food meets great mood. Explore a menu packed with fast
            food, BBQ, karahi, handi, biryani and Chinese favourites.
          </p>

          <ul className="mt-8 space-y-4">
            {pillars.map((p) => (
              <li key={p.title} className="flex gap-4 border-l-2 border-primary/70 pl-4">
                <div>
                  <h3 className="text-base tracking-wide">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.copy}</p>
                </div>
              </li>
            ))}
          </ul>

          <ActionButton
            href="#menu"
            className="mt-8 w-full sm:w-auto"
            icon={<ArrowIcon className="h-4 w-4" />}
          >
            Explore Our Menu
          </ActionButton>
        </Reveal>

        <Reveal className="order-1 lg:order-2" delay={100}>
          <div className="relative overflow-hidden rounded-lg border border-border">
            <img
              src={aboutImage}
              alt="Kababs grilling over an open charcoal flame at the restaurant"
              loading="lazy"
              decoding="async"
              width={1200}
              height={1400}
              className="h-full max-h-[30rem] w-full object-cover lg:max-h-[34rem]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
