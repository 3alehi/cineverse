"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface PaginationProps {
  page: number;
  totalPages: number;
  basePath: string;
}

const MAX_TMDB_PAGE = 500;

export function Pagination({ page, totalPages, basePath }: PaginationProps) {
  const searchParams = useSearchParams();
  const cappedTotal = Math.min(totalPages, MAX_TMDB_PAGE);
  if (cappedTotal <= 1) return null;

  const hrefFor = (targetPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(targetPage));
    return `${basePath}?${params.toString()}`;
  };

  const prevDisabled = page <= 1;
  const nextDisabled = page >= cappedTotal;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-4 pt-4"
    >
      <PaginationLink
        href={hrefFor(page - 1)}
        disabled={prevDisabled}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        Previous
      </PaginationLink>

      <span className="text-sm text-muted-foreground">
        Page <span className="font-medium text-foreground">{page}</span> of{" "}
        {cappedTotal}
      </span>

      <PaginationLink
        href={hrefFor(page + 1)}
        disabled={nextDisabled}
        aria-label="Next page"
      >
        Next
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </PaginationLink>
    </nav>
  );
}

function PaginationLink({
  href,
  disabled,
  children,
  ...props
}: React.ComponentProps<typeof Link> & { disabled: boolean }) {
  if (disabled) {
    return (
      <span
        className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-subtle-foreground opacity-50"
        aria-disabled="true"
      >
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-1.5 rounded-md border border-border-strong px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-hover"
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
