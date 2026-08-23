import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navLinks, orderMessage, whatsappHref } from "@/data/site";
import { Logo } from "./Logo";
import { ActionButton } from "./ActionButton";
import { CartIcon, CloseIcon, MenuIcon, WhatsAppIcon } from "./Icons";
import { useCart } from "@/context/cart";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count, setOpen: setCartOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/92 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-background/85 to-transparent",
      )}
    >
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-6",
          scrolled ? "h-14" : "h-16 sm:h-20",
        )}
      >
        <a href="/#home" className="shrink-0" aria-label="Mirchi Point home">
          <Logo showTagline={!scrolled} />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open cart (${count} items)`}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <CartIcon className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[0.6rem] font-bold text-primary-foreground">
                {count}
              </span>
            ) : null}
          </button>
          <ActionButton
            href={whatsappHref(orderMessage())}
            external
            size="sm"
            className="hidden sm:inline-flex"
            icon={<WhatsAppIcon className="h-4 w-4" />}
          >
            Order Now
          </ActionButton>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
          >
            {open ? <MenuCloseIcon /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-border bg-background lg:hidden"
      >
        <ul className="mx-auto flex w-full max-w-6xl flex-col px-4 py-2 sm:px-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block border-b border-border/60 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="py-4">
            <ActionButton
              href={whatsappHref(orderMessage())}
              external
              variant="whatsapp"
              className="w-full"
              onClick={() => setOpen(false)}
              icon={<WhatsAppIcon className="h-5 w-5" />}
            >
              Order on WhatsApp
            </ActionButton>
          </li>
        </ul>
      </div>
    </header>
  );
}

function MenuCloseIcon() {
  return <CloseIcon className="h-5 w-5" />;
}
