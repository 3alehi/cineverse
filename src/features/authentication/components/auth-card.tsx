import Link from "next/link";
import { Logo } from "@/components/layout/logo";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: { text: string; linkLabel: string; href: string };
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm space-y-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <Logo />
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold text-foreground">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-6 shadow-[var(--shadow-elevated)]">
          {children}
        </div>

        {footer && (
          <p className="text-center text-sm text-muted-foreground">
            {footer.text}{" "}
            <Link href={footer.href} className="font-medium text-accent hover:text-accent-hover">
              {footer.linkLabel}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
