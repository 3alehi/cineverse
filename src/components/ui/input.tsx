import { forwardRef } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        aria-invalid={error || undefined}
        className={cn(
          "h-11 w-full rounded-md border bg-surface px-3.5 text-sm text-foreground placeholder:text-subtle-foreground",
          "transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-error" : "border-border-strong focus:border-accent",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
