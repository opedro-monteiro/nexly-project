import { z } from "zod";
import { Channel } from "../../enums";

export const campaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  message: z.string(),
  channel: z.enum(Channel),
  targetTags: z.array(z.string()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type Campaign = z.infer<typeof campaignSchema>;

export const createCampaignSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  message: z.string().min(1, "Mensagem é obrigatória"),
  channel: z.enum(Channel),
  targetTags: z.array(z.string()).default([]),
});
export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;

export const updateCampaignSchema = createCampaignSchema.partial();
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>;

export const campaignDataTableSchema = z.object({
  id: z.string(),
  name: z.string(),
  channel: z.enum(Channel),
  targetTags: z.array(z.string()),
  status: z.string(),
  sentAt: z.string().nullable(),
});
export type CampaignDataTable = z.infer<typeof campaignDataTableSchema>;

export const dispatchResultSchema = z.object({
  campaignId: z.string(),
  totalClients: z.number(),
  sends: z.array(
    z.object({
      clientId: z.string(),
      status: z.string(),
    })
  ),
});
export type DispatchResult = z.infer<typeof dispatchResultSchema>;
