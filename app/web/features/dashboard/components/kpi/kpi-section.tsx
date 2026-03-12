"use client";
import { Megaphone, Send, Tag, Users } from "lucide-react";
import { useGetDashboardKpis } from "../../hooks/use-get-dashboard-kpis";
import { KpiCard } from "./kpi-card";
import { KpiCardSkeleton } from "./kpi-card-skeleton";

export function KPIs() {
  const { dashboardKpis, isLoading } = useGetDashboardKpis();

  if (isLoading) return <KpiCardSkeleton />;
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <KpiCard
        title="Campanhas"
        value={dashboardKpis?.totalCampaigns ?? 0}
        icon={<Megaphone className="h-4 w-4" />}
        description="Total de campanhas cadastradas"
      />
      <KpiCard
        title="Clientes"
        value={dashboardKpis?.totalClients ?? 0}
        icon={<Users className="h-4 w-4" />}
        description="Total de clientes cadastrados"
      />
      <KpiCard
        title="Tags"
        value={dashboardKpis?.totalTags ?? 0}
        icon={<Tag className="h-4 w-4" />}
        description="Total de tags cadastradas"
      />
      <KpiCard
        title="Envios"
        value={dashboardKpis?.totalSends ?? 0}
        icon={<Send className="h-4 w-4" />}
        description="Total de envios"
      />
    </div>
  );
}
