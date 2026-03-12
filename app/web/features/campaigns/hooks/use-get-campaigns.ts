import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { makeCampaignService } from "@/services/campaign.service";
import type { Campaign } from "@/types/api";

type Options = Omit<UseQueryOptions<Campaign[]>, "queryKey" | "queryFn">;
const campaignService = makeCampaignService();

export function useGetCampaigns(options?: Options) {
  const { data, ...rest } = useQuery<Campaign[]>({
    queryKey: QUERY_KEYS.CAMPAIGNS.LIST(),
    queryFn: () => campaignService.list(),
    refetchOnWindowFocus: false,
    ...options,
  });
  return { campaigns: data, ...rest };
}
