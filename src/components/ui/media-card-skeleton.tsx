export function MediaCardSkeleton() {
  return (
    <div className="w-full">
      <div className="skeleton aspect-[2/3] w-full rounded-lg" />
      <div className="mt-2 space-y-1.5">
        <div className="skeleton h-3.5 w-4/5 rounded" />
        <div className="skeleton h-3 w-1/3 rounded" />
      </div>
    </div>
  );
}
