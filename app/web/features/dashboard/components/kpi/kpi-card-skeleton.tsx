import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface KpiCardSkeletonProps {
  className?: string;
}

export function KpiCardSkeleton({ className }: Readonly<KpiCardSkeletonProps>) {
  const array = ["totalCampaigns", "totalClients", "totalTags", "totalSends"];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {array.map((value) => (
        <Card size="sm" className={cn("gap-3", className)} key={value}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-7 w-16 rounded-md" />
            <Skeleton className="mt-1 h-3 w-32 rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
