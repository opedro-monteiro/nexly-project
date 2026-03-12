import { api } from "@/lib/http";
import { ENDPOINTS } from "@/constants/endpoints";
import type { DashboardKpi } from "@/types/api";

export interface KpisService {
  get(): Promise<DashboardKpi>;
}

class KpisServiceImpl implements KpisService {
  async get(): Promise<DashboardKpi> {
    const response = await api.get<DashboardKpi>(ENDPOINTS.DASHBOARD_KPIS.LIST);
    return response.data;
  }
}

export const makeKpisService = () => new KpisServiceImpl();
