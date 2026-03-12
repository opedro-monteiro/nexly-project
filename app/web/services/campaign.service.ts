import { api } from "@/lib/http";
import { ENDPOINTS } from "@/constants/endpoints";
import type {
  CreateCampaignSchema,
  UpdateCampaignSchema,
} from "@/schemas/campaign.schema";
import type { Campaign, DispatchedResult, DispatchResult } from "@/types/api";

export interface CampaignService {
  list(): Promise<Campaign[]>;
  getById(id: string): Promise<Campaign>;
  create(data: CreateCampaignSchema): Promise<Campaign>;
  update(id: string, data: UpdateCampaignSchema): Promise<Campaign>;
  delete(id: string): Promise<void>;
  dispatch(id: string): Promise<DispatchResult>;
  dispatched(): Promise<DispatchedResult[]>;
}

class CampaignServiceImpl implements CampaignService {
  async list(): Promise<Campaign[]> {
    const response = await api.get<Campaign[]>(ENDPOINTS.CAMPAIGNS.LIST);
    return response.data;
  }

  async getById(id: string): Promise<Campaign> {
    const response = await api.get<Campaign>(ENDPOINTS.CAMPAIGNS.GET(id));
    return response.data;
  }

  async create(data: CreateCampaignSchema): Promise<Campaign> {
    const response = await api.post<Campaign>(ENDPOINTS.CAMPAIGNS.CREATE, data);
    return response.data;
  }

  async update(id: string, data: UpdateCampaignSchema): Promise<Campaign> {
    const response = await api.put<Campaign>(
      ENDPOINTS.CAMPAIGNS.UPDATE(id),
      data,
    );
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(ENDPOINTS.CAMPAIGNS.DELETE(id));
  }

  async dispatch(id: string): Promise<DispatchResult> {
    const response = await api.post<DispatchResult>(
      ENDPOINTS.CAMPAIGNS.DISPATCH(id),
    );
    return response.data;
  }

  async dispatched(): Promise<DispatchedResult[]> {
    const response = await api.get<DispatchedResult[]>(
      ENDPOINTS.CAMPAIGNS.DISPATCHED(),
    );
    return response.data;
  }
}

export const makeCampaignService = () => new CampaignServiceImpl();
