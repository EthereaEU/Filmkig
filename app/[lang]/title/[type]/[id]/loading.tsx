export default function TitleLoading() {
  return (
    <div>
      <div className="skeleton h-44 w-full sm:h-64 lg:h-80" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-10">
          <div className="-mt-20 w-36 shrink-0 sm:-mt-24 sm:w-52 lg:w-60">
            <div className="skeleton aspect-[2/3] w-full rounded-xl ring-1 ring-line" />
          </div>
          <div className="flex-1 pt-2">
            <div className="skeleton h-3 w-16 rounded" />
            <div className="mt-3 skeleton h-9 w-2/3 max-w-md rounded-lg" />
            <div className="mt-4 skeleton h-4 w-48 rounded" />
            <div className="mt-5 space-y-2">
              <div className="skeleton h-4 w-full max-w-xl rounded" />
              <div className="skeleton h-4 w-full max-w-lg rounded" />
              <div className="skeleton h-4 w-2/3 max-w-md rounded" />
            </div>
            <div className="mt-6 flex gap-2.5">
              <div className="skeleton h-10 w-40 rounded-full" />
              <div className="skeleton h-10 w-24 rounded-full" />
            </div>
          </div>
        </div>
        <div className="mt-12">
          <div className="skeleton h-7 w-64 rounded-lg" />
          <div className="mt-5 flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-9 w-24 rounded-full" />
            ))}
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-16 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
