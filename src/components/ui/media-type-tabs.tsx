"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { cn } from "@/lib/cn";

interface TabOption {
  label: string;
  value: string;
}

interface MediaTypeTabsProps {
  basePath: string;
  paramKey: string;
  options: TabOption[];
  active: string;
}

/** URL-state-driven tab switcher, e.g. Trending's Today/This Week or media-type toggles. */
export function MediaTypeTabs({ basePath, paramKey, options, active }: MediaTypeTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setValue = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(paramKey, value);
    router.push(`${basePath}?${params.toString()}`);
  };

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setValue(option.value)}
          aria-pressed={active === option.value}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
            active === option.value
              ? "bg-accent-muted text-accent"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
