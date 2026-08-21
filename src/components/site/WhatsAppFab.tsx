import { orderMessage, whatsappHref } from "@/data/site";
import { WhatsAppIcon } from "./Icons";

export function WhatsAppFab() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 px-4 py-3 backdrop-blur-md sm:hidden">
      <a
        href={whatsappHref(orderMessage())}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-whatsapp text-sm font-semibold uppercase tracking-[0.09em] text-flame-foreground transition-transform active:scale-[0.98]"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Order on WhatsApp
      </a>
    </div>
  );
}
