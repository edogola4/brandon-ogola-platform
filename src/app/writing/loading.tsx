export default function Loading() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-12">
      <div className="h-9 w-32 bg-neutral-100 rounded animate-pulse" />
      <div className="mt-3 h-4 w-96 bg-neutral-100 rounded animate-pulse" />
      <div className="mt-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-neutral-200 rounded-lg p-5 animate-pulse">
            <div className="h-5 w-72 bg-neutral-100 rounded" />
            <div className="mt-2 h-4 w-full bg-neutral-100 rounded" />
            <div className="mt-3 flex gap-2">
              <div className="h-4 w-20 bg-neutral-100 rounded" />
              <div className="h-4 w-16 bg-neutral-100 rounded" />
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
