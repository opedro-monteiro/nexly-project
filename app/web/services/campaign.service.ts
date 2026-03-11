import { ENDPOINTS } from "@/constants/endpoints";
import { api } from "@/lib/http";
import type {
  CreateCampaignSchema,
  UpdateCampaignSchema,
} from "@/schemas/campaign.schema";
import type { Campaign, DispatchResult } from "@/types/api";

export const campaignService = {
  list: () => api.get<Campaign[]>(ENDPOINTS.CAMPAIGNS.LIST).then((r) => r.data),
  getById: (id: string) =>
    api.get<Campaign>(ENDPOINTS.CAMPAIGNS.GET(id)).then((r) => r.data),
  create: (data: CreateCampaignSchema) =>
    api.post<Campaign>(ENDPOINTS.CAMPAIGNS.CREATE, data).then((r) => r.data),
  update: (id: string, data: UpdateCampaignSchema) =>
    api.put<Campaign>(ENDPOINTS.CAMPAIGNS.UPDATE(id), data).then((r) => r.data),
  delete: (id: string) =>
    api.delete(ENDPOINTS.CAMPAIGNS.DELETE(id)).then((r) => r.data),
  dispatch: (id: string) =>
    api
      .post<DispatchResult>(ENDPOINTS.CAMPAIGNS.DISPATCH(id))
      .then((r) => r.data),
};
