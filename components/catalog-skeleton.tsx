// app/catalog/components/catalog-skeleton.tsx
export function CatalogSkeleton() {
  return (
    <div className="space-y-8">
      {/* Filter Tabs Skeleton */}
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 w-24 bg-slate-200 rounded-lg animate-pulse" />
        ))}
      </div>

      {/* Search Bar Skeleton */}
      <div className="h-10 bg-slate-200 rounded-lg animate-pulse" />

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <div className="h-96 bg-slate-200 rounded-lg animate-pulse" />
        </div>

        {/* Cards Skeleton */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-slate-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
