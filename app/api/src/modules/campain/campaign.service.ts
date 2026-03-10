import { SendStatus } from "../../enums";
import { prisma } from "../../libs/prisma";

import type {
  CreateCampaignInput,
  DispatchResult,
  UpdateCampaignInput,
} from "./campaign.schema";

export async function createCampaign(data: CreateCampaignInput) {
  return prisma.campaign.create({ data });
}

export async function listCampaigns() {
  return prisma.campaign.findMany();
}

export async function getCampaignById(id: string) {
  return prisma.campaign.findUnique({ where: { id } });
}

export async function updateCampaign(id: string, data: UpdateCampaignInput) {
  return prisma.campaign.update({ where: { id }, data });
}

export async function deleteCampaign(id: string) {
  return prisma.campaign.delete({ where: { id } });
}

export async function dispatchCampaign(id: string): Promise<DispatchResult> {
  const campaign = await prisma.campaign.findUnique({ where: { id } });
  if (!campaign) throw new Error("Campanha não encontrada");

  const clients = await prisma.client.findMany({
    where: {
      tags: { hasSome: campaign.targetTags },
    },
  });

  const sends = await Promise.all(
    clients.map((client) => {
      const failed = Math.random() < 0.1; // SIMULAR CASES
      return prisma.send.create({
        data: {
          clientId: client.id,
          campaignId: campaign.id,
          status: failed ? SendStatus.FAILED : SendStatus.SENT,
          sentAt: failed ? null : new Date(),
        },
      });
    })
  );

  return {
    campaignId: id,
    totalClients: clients.length,
    sends: sends.map((s) => ({ clientId: s.clientId, status: s.status })),
  };
}
