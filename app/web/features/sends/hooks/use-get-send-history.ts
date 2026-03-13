import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { makeSendService } from "@/services/send.service";
import type { SendHistoryItem } from "@/types/api";

type Options = Omit<UseQueryOptions<SendHistoryItem[]>, "queryKey" | "queryFn">;
const sendService = makeSendService();

export function useGetSendHistory(options?: Options) {
  const { data, ...rest } = useQuery<SendHistoryItem[]>({
    queryKey: QUERY_KEYS.SENDS.HISTORY(),
    queryFn: () => sendService.listHistory(),
    refetchOnWindowFocus: false,
    ...options,
  });
  return { history: data, ...rest };
}
