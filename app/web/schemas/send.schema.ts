import { z } from "zod";

export const createSendSchema = z.object({
  clientId: z.uuid("clientId inválido"),
  campaignId: z.uuid("campaignId inválido"),
});

export const updateSendSchema = z.object({
  status: z.enum(["PENDING", "SENT", "FAILED"]).optional(),
  sentAt: z.iso
    .datetime({ error: "sentAt deve ser uma data ISO 8601 válida" })
    .optional(),
});

export type CreateSendSchema = z.infer<typeof createSendSchema>;
export type UpdateSendSchema = z.infer<typeof updateSendSchema>;
