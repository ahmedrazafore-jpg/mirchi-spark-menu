import {
  directionsHref,
  mapEmbedSrc,
  orderMessage,
  site,
  telHref,
  whatsappHref,
} from "@/data/site";
import { ActionButton } from "./ActionButton";
import { Reveal } from "./Reveal";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";

export function LocationSection() {
  return (
    <section
      id="location"
      className="border-t border-border/60 bg-surface/40 py-16 sm:py-24"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <p className="eyebrow">Visit Us</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Find Mirchi Point</h2>
          <div className="rule-flame mt-4" />

          <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-card p-4 sm:p-5">
            <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Address
              </p>
              <address className="mt-1.5 not-italic text-sm leading-relaxed text-foreground">
                {site.address}
              </address>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ActionButton
              href={directionsHref}
              external
              className="w-full sm:w-auto"
              icon={<PinIcon className="h-4 w-4" />}
            >
              Get Directions
            </ActionButton>
            <ActionButton
              href={telHref(site.phones[0])}
              variant="outline"
              className="w-full sm:w-auto"
              icon={<PhoneIcon className="h-4 w-4" />}
            >
              Call Now
            </ActionButton>
            <ActionButton
              href={whatsappHref(orderMessage())}
              external
              variant="whatsapp"
              className="w-full sm:w-auto"
              icon={<WhatsAppIcon className="h-4 w-4" />}
            >
              WhatsApp
            </ActionButton>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Opening hours to be confirmed by the restaurant.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="h-72 overflow-hidden rounded-lg border border-border sm:h-96 lg:h-full lg:min-h-[24rem]">
            <iframe
              title="Map showing Mirchi Point, Jail Road, Heerabad, Hyderabad"
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
