"use client";
import { Megaphone, Tag, Triangle, Users } from "lucide-react";
import { useGetDashboardKpis } from "../../hooks/use-get-dashboard-kpis";
import { KpiCard } from "./kpi-card";
import { KpiCardSkeleton } from "./kpi-card-skeleton";
import { SparklineChart } from "./sparkline-chart";

const aberturaData = [
  { value: 40 }, { value: 55 }, { value: 48 }, { value: 70 },
  { value: 63 }, { value: 80 }, { value: 72 },
];

const cliquesData = [
  { value: 18 }, { value: 30 }, { value: 22 }, { value: 35 },
  { value: 28 }, { value: 32 }, { value: 11 },
];

export function KPIs() {
  const { dashboardKpis, isLoading } = useGetDashboardKpis();

  if (isLoading) return <KpiCardSkeleton />;
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
      <KpiCard
        title="Campanhas"
        value={dashboardKpis?.totalCampaigns ?? 0}
        icon={<Megaphone className="h-4 w-4" />}
      />
      <KpiCard
        title="Clientes"
        value={dashboardKpis?.totalClients ?? 0}
        icon={<Users className="h-4 w-4" />}
      />
      <KpiCard
        title="Tags"
        value={dashboardKpis?.totalTags ?? 0}
        icon={<Tag className="h-4 w-4" />}
      />
      <KpiCard
        title="Taxa de Abertura"
        value={"72%"}
        icon={<Triangle className="h-4 w-4 text-green-500" />}
        sparkline={<SparklineChart data={aberturaData} color="var(--chart-2)" />}
      />
      <KpiCard
        title="Cliques Totais"
        value={"2.1k"}
        icon={<Triangle className="h-4 w-4 text-red-500 rotate-180" />}
        sparkline={<SparklineChart data={cliquesData} color="var(--chart-5)" />}
      />
    </div>
  );
}
