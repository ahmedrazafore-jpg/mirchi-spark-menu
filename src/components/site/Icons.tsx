type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.82c2.16 0 4.19.84 5.72 2.37a8.03 8.03 0 0 1 2.37 5.72c0 4.46-3.63 8.09-8.09 8.09a8.2 8.2 0 0 1-4.13-1.13l-.3-.18-3.13.82.84-3.05-.2-.31a8.05 8.05 0 0 1-1.23-4.29c0-4.45 3.63-8.08 8.15-8.04Zm-2.4 4.1c-.17 0-.45.06-.69.31-.24.25-.9.88-.9 2.14 0 1.26.92 2.48 1.05 2.65.13.17 1.79 2.83 4.4 3.85 2.17.85 2.61.68 3.08.64.47-.04 1.53-.62 1.75-1.23.22-.61.22-1.13.15-1.24-.06-.11-.24-.17-.5-.3-.26-.13-1.53-.76-1.77-.84-.24-.09-.41-.13-.59.13-.17.26-.67.84-.82 1.01-.15.18-.3.2-.56.07-.26-.13-1.09-.4-2.08-1.29-.77-.68-1.29-1.53-1.44-1.79-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.44.09-.17.04-.33-.02-.46-.06-.13-.57-1.4-.79-1.92-.2-.5-.4-.43-.56-.44l-.47-.01Z" />
    </svg>
  );
}

export function PhoneIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4 5.5C4 4.67 4.67 4 5.5 4h2.1c.66 0 1.24.43 1.43 1.06l.86 2.86a1.5 1.5 0 0 1-.42 1.52l-1.2 1.1a12.5 12.5 0 0 0 5.19 5.19l1.1-1.2a1.5 1.5 0 0 1 1.52-.42l2.86.86c.63.19 1.06.77 1.06 1.43v2.1c0 .83-.67 1.5-1.5 1.5C10.6 20 4 13.4 4 5.5Z" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.7V3.63A21 21 0 0 0 14.3 3.5c-2.4 0-4.05 1.47-4.05 4.16V9.9H7.5V13h2.75v8h3.25Z" />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M5 12h14m-5.5-5.5L19 12l-5.5 5.5" />
    </svg>
  );
}

export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...base}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}
