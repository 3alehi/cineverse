import type { LucideIcon } from "lucide-react";
import {
  Bookmark,
  Clapperboard,
  Compass,
  Flame,
  Home,
  Search,
  Tv,
  User,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Movies", href: "/movies", icon: Clapperboard },
  { label: "TV Shows", href: "/tv", icon: Tv },
  { label: "Trending", href: "/trending", icon: Flame },
  { label: "Watchlist", href: "/watchlist", icon: Bookmark },
];

export const mobileNav: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Discover", href: "/movies", icon: Compass },
  { label: "Search", href: "/search", icon: Search },
  { label: "Watchlist", href: "/watchlist", icon: Bookmark },
  { label: "Profile", href: "/profile", icon: User },
];
