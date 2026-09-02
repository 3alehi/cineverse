import Link from "next/link";
import { Logo } from "./logo";

const footerLinks = [
  { label: "Movies", href: "/movies" },
  { label: "TV Shows", href: "/tv" },
  { label: "Genres", href: "/genres" },
  { label: "Trending", href: "/trending" },
  { label: "Popular", href: "/popular" },
  { label: "Top Rated", href: "/top-rated" },
  { label: "Favorites", href: "/favorites" },
  { label: "Watched", href: "/watched" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border pb-24 md:pb-0">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <div className="space-y-2">
          <Logo />
          <p className="max-w-sm text-sm text-subtle-foreground">
            A discovery platform for movies and TV shows. Data provided by
            TMDB. Built for demonstration purposes.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
