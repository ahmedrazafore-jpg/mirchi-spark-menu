/**
 * Single source of truth for restaurant details.
 * Owner-editable: change values here and they update across the whole site.
 */

export const site = {
  name: "Mirchi Point",
  tagline: "Spicy Food • Great Mood",
  intro: "Good food. Bold flavours. Great mood.",
  address: "C929+7FX, Jail Rd, Heerabad, Hyderabad, Pakistan",
  area: "Heerabad, Hyderabad",
  phones: ["0315-3092566", "0311-3091035"],
  /** Number used for WhatsApp ordering (local format; converted to +92 below). */
  whatsappPhone: "0315-3092566",
  facebook: "https://www.facebook.com/share/1E1EtCQPij/",
  /** Opening hours are not confirmed yet — leave null until the owner provides them. */
  hours: null as string | null,
} as const;

/** 0315-3092566 -> 923153092566 */
export function toInternational(localNumber: string): string {
  const digits = localNumber.replace(/\D/g, "");
  return digits.startsWith("0") ? `92${digits.slice(1)}` : digits;
}

export function telHref(localNumber: string): string {
  return `tel:+${toInternational(localNumber)}`;
}

export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${toInternational(site.whatsappPhone)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function orderMessage(itemName?: string): string {
  return itemName
    ? `Assalamualaikum, I would like to order ${itemName} from ${site.name}.`
    : `Assalamualaikum, I would like to place an order from ${site.name}.`;
}

export const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  site.address,
)}`;

export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  site.address,
)}&output=embed`;

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Menu", href: "/#menu" },
  { label: "About", href: "/#about" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Location", href: "/#location" },
  { label: "Contact", href: "/#contact" },
] as const;
