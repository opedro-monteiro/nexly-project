import { api } from "@/lib/http";
import { ENDPOINTS } from "@/constants/endpoints";
import type { CreateSendSchema, UpdateSendSchema } from "@/schemas/send.schema";
import type { Send } from "@/types/api";

export interface SendService {
  list(): Promise<Send[]>;
  getById(id: string): Promise<Send>;
  create(data: CreateSendSchema): Promise<Send>;
  update(id: string, data: UpdateSendSchema): Promise<Send>;
  delete(id: string): Promise<void>;
}

class SendServiceImpl implements SendService {
  async list(): Promise<Send[]> {
    const response = await api.get<Send[]>(ENDPOINTS.SENDS.LIST);
    return response.data;
  }

  async getById(id: string): Promise<Send> {
    const response = await api.get<Send>(ENDPOINTS.SENDS.GET(id));
    return response.data;
  }

  async create(data: CreateSendSchema): Promise<Send> {
    const response = await api.post<Send>(ENDPOINTS.SENDS.CREATE, data);
    return response.data;
  }

  async update(id: string, data: UpdateSendSchema): Promise<Send> {
    const response = await api.put<Send>(ENDPOINTS.SENDS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(ENDPOINTS.SENDS.DELETE(id));
  }
}

export const makeSendService = () => new SendServiceImpl();
