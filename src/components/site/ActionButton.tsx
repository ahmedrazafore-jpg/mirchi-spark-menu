import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "whatsapp" | "outline" | "ghost";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-flame hover:text-flame-foreground shadow-[0_10px_30px_-14px_var(--color-primary)]",
  whatsapp: "bg-whatsapp text-flame-foreground hover:brightness-110",
  outline:
    "border border-border bg-transparent text-foreground hover:border-primary hover:text-primary",
  ghost: "bg-surface-2 text-foreground hover:bg-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.8rem]",
  md: "h-12 px-6 text-sm",
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  external?: boolean;
};

export function ActionButton({
  variant = "primary",
  size = "md",
  icon,
  external,
  className,
  children,
  ...props
}: Props) {
  return (
    <a
      {...props}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold uppercase tracking-[0.09em] transition-all duration-200 active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}
