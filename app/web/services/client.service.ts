import { api } from "@/lib/http";
import { ENDPOINTS } from "@/constants/endpoints";
import type {
  CreateClientSchema,
  UpdateClientSchema,
} from "@/schemas/client.schema";
import type { Client, TagSummary } from "@/types/api";

export interface ClientService {
  list(): Promise<Client[]>;
  listTags(): Promise<TagSummary[]>;
  getById(id: string): Promise<Client>;
  create(data: CreateClientSchema): Promise<Client>;
  update(id: string, data: UpdateClientSchema): Promise<Client>;
  delete(id: string): Promise<void>;
}

class ClientServiceImpl implements ClientService {
  async list(): Promise<Client[]> {
    const response = await api.get<Client[]>(ENDPOINTS.CLIENTS.LIST);
    return response.data;
  }

  async listTags(): Promise<TagSummary[]> {
    const response = await api.get<TagSummary[]>(ENDPOINTS.CLIENTS.TAGS);
    return response.data;
  }

  async getById(id: string): Promise<Client> {
    const response = await api.get<Client>(ENDPOINTS.CLIENTS.GET(id));
    return response.data;
  }

  async create(data: CreateClientSchema): Promise<Client> {
    const response = await api.post<Client>(ENDPOINTS.CLIENTS.CREATE, data);
    return response.data;
  }

  async update(id: string, data: UpdateClientSchema): Promise<Client> {
    const response = await api.put<Client>(ENDPOINTS.CLIENTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(ENDPOINTS.CLIENTS.DELETE(id));
  }
}

export const makeClientService = () => new ClientServiceImpl();
