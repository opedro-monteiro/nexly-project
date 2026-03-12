import { SendStatus } from "../../enums";
import { prisma } from "../../libs/prisma";
import type { Kpi } from "./kpi.schema";

export async function getKpis(): Promise<Kpi> {
  const [totalCampaigns, totalClients, clients, totalSends, sends, campaigns] =
    await Promise.all([
      prisma.campaign.count(),
      prisma.client.count(),
      prisma.client.findMany({ select: { tags: true } }),
      prisma.send.count(),
      prisma.send.groupBy({ by: ["status"], _count: { status: true } }),
      prisma.campaign.findMany({
        select: { targetTags: true },
        where: { sends: { some: {} } },
      }),
    ]);

  // Unique tags across all clients
  const allClientTags = clients.flatMap((c) => c.tags);
  const uniqueTags = new Set(allClientTags);
  const totalTags = uniqueTags.size;

  // Clients per tag (top 10 for pie chart)
  const clientTagCounts = new Map<string, number>();
  for (const tag of allClientTags) {
    clientTagCounts.set(tag, (clientTagCounts.get(tag) ?? 0) + 1);
  }
  const clientsPerTag = Array.from(clientTagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Top tags used in dispatched campaigns (weighted by usage)
  const campaignTagCounts = new Map<string, number>();
  for (const campaign of campaigns) {
    for (const tag of campaign.targetTags) {
      campaignTagCounts.set(tag, (campaignTagCounts.get(tag) ?? 0) + 1);
    }
  }
  const topTags = Array.from(campaignTagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Sends by status
  const sendsByStatus = { sent: 0, failed: 0, pending: 0 };
  for (const group of sends) {
    if (group.status === SendStatus.SENT) sendsByStatus.sent = group._count.status;
    else if (group.status === SendStatus.FAILED) sendsByStatus.failed = group._count.status;
    else if (group.status === SendStatus.PENDING) sendsByStatus.pending = group._count.status;
  }

  return {
    totalCampaigns,
    totalClients,
    totalTags,
    topTags,
    totalSends,
    clientsPerTag,
    sendsByStatus,
  };
}
