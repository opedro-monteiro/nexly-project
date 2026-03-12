import { QUERY_KEYS } from "@/constants/query-keys";
import { makeCampaignService } from "@/services/campaign.service";
import type { DispatchedResult } from "@/types/api";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type Options = Omit<
  UseQueryOptions<DispatchedResult[]>,
  "queryKey" | "queryFn"
>;

const campaigService = makeCampaignService();

export function useGetDispatched(options?: Options) {
  const { data, ...rest } = useQuery<DispatchedResult[]>({
    queryKey: QUERY_KEYS.CAMPAIGNS.DISPATCHED(),
    queryFn: () => campaigService.dispatched(),
    refetchOnWindowFocus: false,
    throwOnError: true,
    ...options,
  });

  return {
    dispatchedData: data,
    ...rest,
  };
}
