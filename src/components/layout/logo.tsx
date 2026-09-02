import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-foreground"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-sm text-accent-foreground">
        C
      </span>
      CineVerse
    </Link>
  );
}
