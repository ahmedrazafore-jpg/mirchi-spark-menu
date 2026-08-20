import ctaImage from "@/assets/dish-bbq.jpg";
import { ActionButton } from "./ActionButton";
import { Reveal } from "./Reveal";
import { ArrowIcon, WhatsAppIcon } from "./Icons";
import { orderMessage, whatsappHref } from "@/data/site";

export function AppetiteCta() {
  return (
    <section className="relative isolate overflow-hidden border-y border-border/60">
      <img
        src={ctaImage}
        alt="Charcoal grilled chicken tikka skewers"
        loading="lazy"
        decoding="async"
        width={1024}
        height={1024}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-background/80" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <Reveal>
          <p className="eyebrow justify-center">Hungry Yet?</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance-tight text-4xl sm:text-6xl">
            Bring Your <span className="text-primary">Appetite.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Spice, smoke and flavour — cooked fresh to order in Heerabad, Hyderabad.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ActionButton href="#menu" icon={<ArrowIcon className="h-4 w-4" />}>
              Explore Our Menu
            </ActionButton>
            <ActionButton
              href={whatsappHref(orderMessage())}
              external
              variant="outline"
              icon={<WhatsAppIcon className="h-4 w-4" />}
            >
              Order on WhatsApp
            </ActionButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
