import { cn } from "@/lib/utils";

/**
 * Temporary typographic Mirchi Point mark.
 * Replace with the official logo file (import it here) once supplied —
 * this is the only place the brand mark is defined.
 */
export function Logo({
  className,
  showTagline = true,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <ChiliMark className="h-8 w-8 shrink-0 text-primary" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg tracking-wide text-foreground sm:text-xl">
          Mirchi<span className="text-primary">Point</span>
        </span>
        {showTagline ? (
          <span className="mt-1 text-[0.55rem] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Spicy Food • Great Mood
          </span>
        ) : null}
      </span>
    </span>
  );
}

function ChiliMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className} focusable="false">
      <circle cx="24" cy="24" r="22" fill="currentColor" opacity="0.14" />
      <path
        d="M26.5 11.5c1.6-2.3 4.6-2.6 6.3-1.2.9.8 1 2.2.2 3-.7.7-1.7.7-2.4.2-.8-.6-1.9-.3-2.3.6"
        fill="none"
        stroke="var(--color-flame)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M27.4 14.4c2.6 4 3.2 9.6 1.1 14.4-2.2 5.1-6.9 8.4-12.2 9.1-1.5.2-2.6-1.2-2.1-2.6 1-2.9 1.7-5.1 3.5-8.3 2.4-4.4 5.6-9 9.7-12.6z"
        fill="currentColor"
      />
    </svg>
  );
}
