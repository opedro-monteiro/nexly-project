import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { makeClientService } from "@/services/client.service";
import type { Client } from "@/types/api";

type Options = Omit<UseQueryOptions<Client[]>, "queryKey" | "queryFn">;

const clientService = makeClientService();

export function useGetClients(options?: Options) {
  const { data, ...rest } = useQuery<Client[]>({
    queryKey: QUERY_KEYS.CLIENTS.LIST(),
    queryFn: () => clientService.list(),
    refetchOnWindowFocus: false,
    ...options,
  });

  return {
    clients: data,
    ...rest,
  };
}
