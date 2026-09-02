import { cn } from "@/lib/cn";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "outline";
}

const VARIANT_STYLES: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-surface-hover text-foreground",
  accent: "bg-accent-muted text-accent",
  outline: "border border-border-strong text-muted-foreground",
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        VARIANT_STYLES[variant],
        className
      )}
      {...props}
    />
  );
}
