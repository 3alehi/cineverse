"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border border-border-strong bg-surface-hover transition-colors duration-200",
        className
      )}
    >
      <span
        className={cn(
          "absolute flex h-6 w-6 items-center justify-center rounded-full bg-surface-elevated shadow-sm transition-transform duration-200 ease-out",
          isDark ? "translate-x-1" : "translate-x-7"
        )}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
        )}
      </span>
    </button>
  );
}
