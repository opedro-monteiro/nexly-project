import { z } from "zod";

export const createCampaignSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  message: z.string().min(1, "Mensagem é obrigatória"),
  channel: z.enum(["EMAIL", "WHATSAPP"]),
  targetTags: z.array(z.string()).optional(),
});

export const updateCampaignSchema = createCampaignSchema.partial();

export type CreateCampaignSchema = z.infer<typeof createCampaignSchema>;
export type UpdateCampaignSchema = z.infer<typeof updateCampaignSchema>;
