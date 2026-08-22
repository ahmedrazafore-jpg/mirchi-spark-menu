import { cn } from "@/lib/utils";
import logo from "@/assets/mirchi-point-logo.jpg.asset.json";

/** Official Mirchi Point circular logo mark. */
export function Logo({
  className,
  showTagline = true,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <img
        src={logo.url}
        alt="Mirchi Point logo"
        width={96}
        height={96}
        className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-primary/50 sm:h-12 sm:w-12"
      />
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
