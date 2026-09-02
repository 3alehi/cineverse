import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "children"> {
  options: SelectOption[];
  label: string;
}

export function Select({ options, label, className, id, ...props }: SelectProps) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="relative block">
        <select
          id={id}
          className={cn(
            "h-11 w-full appearance-none rounded-md border border-border-strong bg-surface px-3.5 pr-9 text-sm text-foreground",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle-foreground"
          aria-hidden="true"
        />
      </span>
    </label>
  );
}
