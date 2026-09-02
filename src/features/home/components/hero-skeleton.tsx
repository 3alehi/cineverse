export function HeroSkeleton() {
  return (
    <section className="relative h-[62vh] min-h-[420px] w-full overflow-hidden sm:h-[68vh]">
      <div className="skeleton absolute inset-0" />
      <div className="relative flex h-full max-w-[1600px] flex-col justify-end px-6 pb-10 sm:pb-14 lg:px-10">
        <div className="max-w-xl space-y-4">
          <div className="skeleton h-4 w-40 rounded" />
          <div className="skeleton h-10 w-3/4 rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-2/3 rounded" />
          <div className="flex gap-3 pt-2">
            <div className="skeleton h-12 w-36 rounded-md" />
            <div className="skeleton h-12 w-36 rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
