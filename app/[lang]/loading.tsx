export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="skeleton h-8 w-56 rounded-lg" />
      <div className="mt-3 skeleton h-4 w-80 max-w-full rounded" />
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i}>
            <div className="skeleton aspect-[2/3] rounded-xl" />
            <div className="mt-2 skeleton h-4 w-3/4 rounded" />
            <div className="mt-1.5 skeleton h-3 w-1/2 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
