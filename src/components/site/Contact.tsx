import { orderMessage, site, telHref, whatsappHref } from "@/data/site";
import { ActionButton } from "./ActionButton";
import { Reveal } from "./Reveal";
import { FacebookIcon, PhoneIcon, WhatsAppIcon } from "./Icons";

export function Contact() {
  return (
    <section id="contact" className="border-t border-border/60 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="eyebrow">Get In Touch</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Contact Us</h2>
          <div className="rule-flame mt-4" />
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Call us for reservations and bulk orders, or send your order straight
            to our WhatsApp — we reply fast.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Reveal delay={80}>
            <div className="h-full rounded-lg border border-border bg-card p-5">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Phone
              </p>
              <ul className="mt-3 space-y-2">
                {site.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={telHref(phone)}
                      className="inline-flex items-center gap-2 text-lg font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      <PhoneIcon className="h-4 w-4 text-primary" />
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="flex h-full flex-col rounded-lg border border-border bg-card p-5">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Order &amp; Social
              </p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ActionButton
                  href={whatsappHref(orderMessage())}
                  external
                  variant="whatsapp"
                  size="sm"
                  icon={<WhatsAppIcon className="h-4 w-4" />}
                >
                  Order on WhatsApp
                </ActionButton>
                <ActionButton
                  href={site.facebook}
                  external
                  variant="outline"
                  size="sm"
                  icon={<FacebookIcon className="h-4 w-4" />}
                >
                  Facebook
                </ActionButton>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {site.address}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
