export function CardSkeleton() {
  return (
    <div className="glass rounded-2xl p-4 space-y-4">
      <div className="skeleton h-40 w-full" />
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-4 w-1/2" />
    </div>
  );
}

export function ListSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
