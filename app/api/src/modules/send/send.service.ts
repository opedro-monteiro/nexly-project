import { prisma } from "../../libs/prisma";
import type { CreateSendInput, UpdateSendInput } from "./send.schema";

export async function createSend(data: CreateSendInput) {
  return prisma.send.create({ data });
}

export async function listSends() {
  return prisma.send.findMany();
}

export async function getSendById(id: string) {
  return prisma.send.findUnique({ where: { id } });
}

export async function updateSend(id: string, data: UpdateSendInput) {
  return prisma.send.update({ where: { id }, data });
}

export async function deleteSend(id: string) {
  return prisma.send.delete({ where: { id } });
}
