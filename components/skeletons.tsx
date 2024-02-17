import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonOverview() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[40px] w-full bg-primary" />
      <Skeleton className="h-[40px] w-full bg-primary" />
      <Skeleton className="h-[40px] w-full bg-primary" />
      <Skeleton className="h-[40px] w-full bg-primary" />
      <Skeleton className="h-[40px] w-full bg-primary" />
      <Skeleton className="h-[40px] w-full bg-primary" />
      <Skeleton className="h-[40px] w-full bg-primary" />
      <Skeleton className="h-[40px] w-full bg-primary" />
      <Skeleton className="h-[40px] w-full bg-primary" />
      <Skeleton className="h-[40px] w-full bg-primary" />
    </div>
  );
}

export function SkeletonScore() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[56px] w-full bg-primary" />
      <Skeleton className="h-[56px] w-full bg-primary" />
    </div>
  );
}
