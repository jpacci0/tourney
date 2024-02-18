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
      <Skeleton className="h-[56px] w-full bg-primary border-b-2" />
      <Skeleton className="h-[56px] w-full bg-primary border-b-2" />
    </div>
  );
}

export function SkeletonLeaderboard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[56px] w-full bg-primary border-b-2" />
      <Skeleton className="h-[56px] w-full bg-primary border-b-2" />
      <Skeleton className="h-[56px] w-full bg-primary border-b-2" />
      <Skeleton className="h-[56px] w-full bg-primary border-b-2" />
      <Skeleton className="h-[56px] w-full bg-primary border-b-2" />
      <Skeleton className="h-[56px] w-full bg-primary border-b-2" />
      <Skeleton className="h-[56px] w-full bg-primary border-b-2" />
      <Skeleton className="h-[56px] w-full bg-primary border-b-2" />
    </div>
  );
}

export function SkeletonRules() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[24px] w-full bg-gray-500" />
      <Skeleton className="h-[24px] w-full bg-gray-500" />
      <Skeleton className="h-[24px] w-full bg-gray-500" />
      <Skeleton className="h-[24px] w-full bg-gray-500" />
      <Skeleton className="h-[24px] w-full bg-gray-500" />
      <Skeleton className="h-[24px] w-full bg-gray-500" />
      <Skeleton className="h-[24px] w-full bg-gray-500" />
      <Skeleton className="h-[24px] w-full bg-gray-500" />
    </div>
  );
}

export function SkeletonRosters() {
  return (
    <div className="grid gap-2 grid-cols-1 md:text-left md:grid-cols-2 xl:grid-cols-3">
      <div className="flex flex-col">
        <Skeleton className="h-[28px] w-full bg-orange-800 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
      </div>
      <div className="flex flex-col">
        <Skeleton className="h-[28px] w-full bg-orange-800 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
      </div>
      <div className="flex flex-col">
        <Skeleton className="h-[28px] w-full bg-orange-800 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
      </div>
      <div className="flex flex-col">
        <Skeleton className="h-[28px] w-full bg-orange-800 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
      </div>
      <div className="flex flex-col">
        <Skeleton className="h-[28px] w-full bg-orange-800 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
      </div>
      <div className="flex flex-col">
        <Skeleton className="h-[28px] w-full bg-orange-800 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
        <Skeleton className="h-[24px] w-1/2 bg-gray-500 mb-1" />
      </div>
    </div>
  );
}

export function SkeletonMyteam() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-[28px] w-1/2 bg-orange-800 mb-1" />
      <Skeleton className="h-[24px] w-1/3 bg-gray-500 mb-1" />
      <Skeleton className="h-[24px] w-1/3 bg-gray-500 mb-1" />
      <Skeleton className="h-[24px] w-1/3 bg-gray-500 mb-1" />
    </div>
  );
}

export function SkeletonCreateTeam() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-[24px] w-[80px] bg-orange-800 mb-1" />
      <Skeleton className="h-[40px] w-full bg-primary mb-1" />
      <Skeleton className="h-[24px] w-[80px] bg-orange-800 mb-1" />
    </div>
  );
}

export function SkeletonJoinTeam() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-[24px] w-[80px] bg-orange-800 mb-1" />
      <Skeleton className="h-[40px] w-full bg-primary mb-1" />
      <Skeleton className="h-[24px] w-[80px] bg-orange-800 mb-1" />
    </div>
  );
}
