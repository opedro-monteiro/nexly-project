"use client";

import { useGetDashboardKpis } from "../../hooks/use-get-dashboard-kpis";
import { ClientsPerTagChart } from "./clients-per-tag-chart";
import { SendsByStatusChart } from "./sends-by-status-chart";
import { Skeleton } from "@/components/ui/skeleton";

export function ChartsSection() {
  const { dashboardKpis, isLoading } = useGetDashboardKpis();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Skeleton className="h-[320px] w-full rounded-xl" />
        <Skeleton className="h-[320px] w-full rounded-xl" />
      </div>
    );
  }

  if (!dashboardKpis) return null;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <ClientsPerTagChart data={dashboardKpis.clientsPerTag} />
      <SendsByStatusChart data={dashboardKpis.sendsByStatus} />
    </div>
  );
}
