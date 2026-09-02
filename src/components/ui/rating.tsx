import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatRating } from "@/lib/format";

interface RatingProps {
  value: number;
  voteCount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_STYLES = {
  sm: { icon: "h-3 w-3", text: "text-xs" },
  md: { icon: "h-4 w-4", text: "text-sm" },
  lg: { icon: "h-5 w-5", text: "text-base" },
};

export function Rating({ value, voteCount, size = "md", className }: RatingProps) {
  const styles = SIZE_STYLES[size];
  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      aria-label={`Rated ${formatRating(value)} out of 10`}
    >
      <Star
        className={cn(styles.icon, "fill-warning text-warning")}
        aria-hidden="true"
      />
      <span className={cn(styles.text, "font-semibold text-foreground")}>
        {formatRating(value)}
      </span>
      {voteCount !== undefined && (
        <span className={cn(styles.text, "text-subtle-foreground")}>
          ({voteCount >= 1000 ? `${(voteCount / 1000).toFixed(1)}k` : voteCount})
        </span>
      )}
    </span>
  );
}
