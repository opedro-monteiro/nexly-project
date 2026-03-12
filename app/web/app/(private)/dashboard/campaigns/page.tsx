import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getQueryClient } from "@/lib/react-query";
import { makeCampaignService } from "@/services/campaign.service";
import { DataTableCampaigns } from "@/features/campaigns/components/data-table";

const campaignService = makeCampaignService();

export default async function ListCampaignsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.CAMPAIGNS.LIST(),
    queryFn: campaignService.list,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="container mx-auto p-10 space-y-4">
        <DataTableCampaigns />
      </main>
    </HydrationBoundary>
  );
}
