"use client";

import { useGetDashboardKpis } from "../../hooks/use-get-dashboard-kpis";
import { CampaignMetricsChart } from "./campaign-metrics-chart";
import { CampaignFunnelChart } from "./campaign-funnel-chart";
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
    <div className="flex flex-col gap-4">
      <h2 className="text-xl">Metricas de Desempenho</h2>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <CampaignMetricsChart />
        <CampaignFunnelChart />
      </section>
    </div>
  );
}
