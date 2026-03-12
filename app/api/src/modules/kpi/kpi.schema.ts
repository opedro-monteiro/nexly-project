import { z } from "zod";

export const kpiSchema = z.object({
  totalCampaigns: z.number(),
  totalClients: z.number(),
  totalTags: z.number(),
  topTags: z.array(
    z.object({
      tag: z.string(),
      count: z.number(),
    })
  ),
  totalSends: z.number(),
  clientsPerTag: z.array(
    z.object({
      tag: z.string(),
      count: z.number(),
    })
  ),
  sendsByStatus: z.object({
    sent: z.number(),
    failed: z.number(),
    pending: z.number(),
  }),
});

export type Kpi = z.infer<typeof kpiSchema>;
