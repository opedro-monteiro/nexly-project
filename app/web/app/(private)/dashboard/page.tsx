import { QUERY_KEYS } from "@/constants/query-keys";
import { DataTableCampaigns } from "@/features/campaign/components/data-table";
import { ChartsSection } from "@/features/dashboard/components/charts/charts-section";
import { KPIs } from "@/features/dashboard/components/kpi/kpi-section";
import { getQueryClient } from "@/lib/react-query";
import { makeCampaignService } from "@/services/campaign.service";
import { makeKpisService } from "@/services/kpis.service";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const kpisService = makeKpisService();
const campaignsService = makeCampaignService();

export default async function DashboardPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.DASHBOARD_KPIS.GET(),
    queryFn: kpisService.get,
  });

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.CAMPAIGNS.DISPATCHED(),
    queryFn: campaignsService.dispatched,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="container mx-auto p-10 space-y-4">
        <KPIs />
        <ChartsSection />
        <DataTableCampaigns />
      </main>
    </HydrationBoundary>
  );
}
