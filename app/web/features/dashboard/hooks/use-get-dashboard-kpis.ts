import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { makeKpisService } from "@/services/kpis.service";
import type { DashboardKpi } from "@/types/api";

type Options = Omit<UseQueryOptions<DashboardKpi>, "queryKey" | "queryFn">;

const kpisService = makeKpisService();

export function useGetDashboardKpis(options?: Options) {
  const { data, ...rest } = useQuery<DashboardKpi>({
    queryKey: QUERY_KEYS.DASHBOARD_KPIS.GET(),
    queryFn: () => kpisService.get(),
    refetchOnWindowFocus: false,
    throwOnError: true,
    ...options,
  });

  return {
    dashboardKpis: data,
    ...rest,
  };
}
