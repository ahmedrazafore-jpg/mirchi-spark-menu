import heroImage from "@/assets/hero-karahi.jpg";
import { directionsHref, orderMessage, site, whatsappHref } from "@/data/site";
import { ActionButton } from "./ActionButton";
import { ArrowIcon, PinIcon, WhatsAppIcon } from "./Icons";

export function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="Sizzling chicken karahi cooked in a black iron wok"
          width={1600}
          height={1200}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div
          aria-hidden="true"
          className="absolute -left-24 top-1/3 h-64 w-64 rounded-full bg-primary/25 blur-[110px]"
        />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col justify-end px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-36 lg:min-h-[92vh] lg:pb-24">
        <p className="eyebrow animate-in fade-in slide-in-from-bottom-2 duration-700">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          {site.area}
        </p>

        <h1 className="mt-4 animate-in fade-in slide-in-from-bottom-3 text-[3.1rem] leading-[0.88] duration-700 xs:text-6xl sm:text-7xl lg:text-[7.5rem]">
          Mirchi
          <span className="block text-primary">Point</span>
        </h1>

        <p className="mt-4 max-w-md animate-in fade-in slide-in-from-bottom-3 text-sm font-semibold uppercase tracking-[0.22em] text-flame duration-1000">
          {site.tagline}
        </p>

        <p className="mt-4 max-w-sm text-balance-tight text-base leading-relaxed text-muted-foreground sm:max-w-md sm:text-lg">
          {site.intro} Fast food, BBQ, karahi, handi, biryani and Chinese — served fresh in
          Heerabad, Hyderabad.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <ActionButton
            href={whatsappHref(orderMessage())}
            external
            variant="whatsapp"
            className="w-full sm:w-auto"
            icon={<WhatsAppIcon className="h-5 w-5" />}
          >
            Order on WhatsApp
          </ActionButton>
          <ActionButton
            href="#menu"
            variant="primary"
            className="w-full sm:w-auto"
            icon={<ArrowIcon className="h-4 w-4" />}
          >
            View Menu
          </ActionButton>
          <ActionButton
            href={directionsHref}
            external
            variant="outline"
            className="w-full sm:w-auto"
            icon={<PinIcon className="h-4 w-4" />}
          >
            Get Directions
          </ActionButton>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-border/70 pt-6 sm:grid-cols-4">
          {[
            ["Cuisine", "Pakistani & Chinese"],
            ["Speciality", "Karahi & BBQ"],
            ["Area", "Heerabad, Hyderabad"],
            ["Order", "Call or WhatsApp"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {label}
              </dt>
              <dd className="mt-1.5 text-sm font-semibold text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
