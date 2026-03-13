import { SendStatus } from "../../enums";
import { prisma } from "../../libs/prisma";

import type {
  CreateCampaignInput,
  DispatchResult,
  UpdateCampaignInput,
} from "./campaign.schema";

export async function createCampaign(data: CreateCampaignInput) {
  return prisma.campaign.create({
    data: {
      ...data,
      targetTags: data.targetTags?.map((tag) => tag.toUpperCase()) ?? [],
    },
  });
}

export async function listCampaigns() {
  return prisma.campaign.findMany();
}

export async function getCampaignById(id: string) {
  return prisma.campaign.findUnique({ where: { id } });
}

export async function updateCampaign(id: string, data: UpdateCampaignInput) {
  return prisma.campaign.update({
    where: { id },
    data: {
      ...data,
      ...(data.targetTags && {
        targetTags: data.targetTags.map((tag) => tag.toUpperCase()),
      }),
    },
  });
}

export async function deleteCampaign(id: string) {
  return prisma.campaign.delete({ where: { id } });
}

export async function listDispatchedCampaigns() {
  const campaigns = await prisma.campaign.findMany({
    where: {
      sends: { some: {} },
    },
    include: {
      sends: {
        orderBy: { sentAt: "desc" },
      },
    },
  });

  return campaigns.map((campaign) => {
    const latestSend = campaign.sends[0];
    const sentCount = campaign.sends.length;
    const failedCount = campaign.sends.filter(
      (s) => s.status === SendStatus.FAILED,
    ).length;

    let status: string;
    if (failedCount === 0) {
      status = "SENT";
    } else if (failedCount === sentCount) {
      status = "FAILED";
    } else {
      status = "PARTIAL";
    }

    return {
      id: campaign.id,
      name: campaign.name,
      channel: campaign.channel,
      targetTags: campaign.targetTags,
      status,
      sentAt: latestSend?.sentAt?.toISOString() ?? null,
    };
  });
}

export async function dispatchCampaign(id: string): Promise<DispatchResult> {
  const campaign = await prisma.campaign.findUnique({ where: { id } });
  if (!campaign) throw new Error("Campanha não encontrada");

  const clients = await prisma.client.findMany({
    where: {
      tags: { hasSome: campaign.targetTags },
    },
  });

  if (!clients)
    throw new Error("Não foram encontrados clientes com as tags da campanha");

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
    }),
  );

  return {
    campaignId: id,
    totalClients: clients.length,
    sends: sends.map((s) => ({ clientId: s.clientId, status: s.status })),
  };
}
