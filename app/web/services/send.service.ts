import { ENDPOINTS } from "@/constants/endpoints";
import { api } from "@/lib/http";
import type { CreateSendSchema, UpdateSendSchema } from "@/schemas/send.schema";
import type { Send } from "@/types/api";

export const sendService = {
  list: () => api.get<Send[]>(ENDPOINTS.SENDS.LIST).then((r) => r.data),
  getById: (id: string) =>
    api.get<Send>(ENDPOINTS.SENDS.GET(id)).then((r) => r.data),
  create: (data: CreateSendSchema) =>
    api.post<Send>(ENDPOINTS.SENDS.CREATE, data).then((r) => r.data),
  update: (id: string, data: UpdateSendSchema) =>
    api.put<Send>(ENDPOINTS.SENDS.UPDATE(id), data).then((r) => r.data),
  delete: (id: string) =>
    api.delete(ENDPOINTS.SENDS.DELETE(id)).then((r) => r.data),
};
