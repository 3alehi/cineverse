import type { Metadata } from "next";
import { FavoritesContent } from "@/features/favorites/components/favorites-content";

export const metadata: Metadata = {
  title: "Favorites",
  description: "Your favorite movies and TV shows.",
};

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6 px-6 py-8 lg:px-10">
      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Favorites</h1>
      <FavoritesContent />
    </div>
  );
}
