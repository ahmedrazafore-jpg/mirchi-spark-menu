import { directionsHref, navLinks, site, telHref } from "@/data/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/60 pb-28 pt-12 sm:pb-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {site.tagline}. Fast food, BBQ, rolls and Chinese in {site.area}.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Explore
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-foreground/80 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Visit &amp; Call
          </p>
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-sm leading-relaxed text-foreground/80 transition-colors hover:text-primary"
          >
            {site.address}
          </a>
          <ul className="mt-2 space-y-1 text-sm">
            {site.phones.map((phone) => (
              <li key={phone}>
                <a
                  href={telHref(phone)}
                  className="text-foreground/80 transition-colors hover:text-primary"
                >
                  {phone}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6">
        <p className="border-t border-border/60 pt-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {site.name}, {site.area}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
