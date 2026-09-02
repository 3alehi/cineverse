export function MovieDetailsSkeleton() {
  return (
    <div className="pb-16">
      <div className="skeleton h-[46vh] min-h-[320px] w-full sm:h-[56vh]" />
      <div className="mx-auto -mt-24 max-w-[1600px] px-6 sm:-mt-32 lg:px-10">
        <div className="flex flex-col gap-8 sm:flex-row">
          <div className="skeleton mx-auto -mt-4 aspect-[2/3] w-40 shrink-0 rounded-xl sm:mx-0 sm:w-56" />
          <div className="flex-1 space-y-4 pt-2">
            <div className="skeleton h-9 w-2/3 rounded" />
            <div className="skeleton h-4 w-40 rounded" />
            <div className="flex gap-2">
              <div className="skeleton h-6 w-20 rounded-full" />
              <div className="skeleton h-6 w-20 rounded-full" />
            </div>
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-5/6 rounded" />
            <div className="skeleton h-11 w-48 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
