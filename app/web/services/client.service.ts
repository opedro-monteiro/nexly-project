import { ENDPOINTS } from "@/constants/endpoints";
import { api } from "@/lib/http";
import type {
  CreateClientSchema,
  UpdateClientSchema,
} from "@/schemas/client.schema";
import type { Client, TagSummary } from "@/types/api";

export const clientService = {
  list: () => api.get<Client[]>(ENDPOINTS.CLIENTS.LIST).then((r) => r.data),
  listTags: () =>
    api.get<TagSummary[]>(ENDPOINTS.CLIENTS.TAGS).then((r) => r.data),
  getById: (id: string) =>
    api.get<Client>(ENDPOINTS.CLIENTS.GET(id)).then((r) => r.data),
  create: (data: CreateClientSchema) =>
    api.post<Client>(ENDPOINTS.CLIENTS.CREATE, data).then((r) => r.data),
  update: (id: string, data: UpdateClientSchema) =>
    api.put<Client>(ENDPOINTS.CLIENTS.UPDATE(id), data).then((r) => r.data),
  delete: (id: string) =>
    api.delete(ENDPOINTS.CLIENTS.DELETE(id)).then((r) => r.data),
};
