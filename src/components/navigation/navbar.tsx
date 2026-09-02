"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, User } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { primaryNav } from "@/config/navigation";
import { cn } from "@/lib/cn";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 hidden border-b border-border bg-background/85 backdrop-blur md:block">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-6 px-6 lg:px-10">
        <Logo />

        <nav aria-label="Primary" className="flex items-center gap-1">
          {primaryNav.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <form
          onSubmit={handleSearchSubmit}
          className="ml-auto flex max-w-xs flex-1 items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 focus-within:border-border-strong"
          role="search"
        >
          <Search className="h-4 w-4 shrink-0 text-subtle-foreground" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, shows, people..."
            aria-label="Search movies, TV shows, and people"
            className="w-full bg-transparent text-sm text-foreground placeholder:text-subtle-foreground focus:outline-none"
          />
        </form>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/profile"
            aria-label="Profile"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-strong text-muted-foreground transition-colors hover:text-foreground"
          >
            <User className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}
