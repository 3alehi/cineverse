import { MediaGridSkeleton } from "./media-grid";

export function DualGridSkeleton({ firstTitle, secondTitle }: { firstTitle: string; secondTitle: string }) {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">{firstTitle}</h2>
        <MediaGridSkeleton count={12} />
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">{secondTitle}</h2>
        <MediaGridSkeleton count={12} />
      </section>
    </div>
  );
}
