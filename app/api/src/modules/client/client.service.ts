import { prisma } from '../../libs/prisma'
import type { CreateClientInput, UpdateClientInput } from './client.schema'

export async function createClient(data: CreateClientInput) {
  return prisma.client.create({ data })
}

export async function listClients() {
  return prisma.client.findMany()
}

export async function getClientById(id: string) {
  return prisma.client.findUnique({ where: { id } })
}

export async function updateClient(id: string, data: UpdateClientInput) {
  return prisma.client.update({ where: { id }, data })
}

export async function deleteClient(id: string) {
  return prisma.client.delete({ where: { id } })
}

export async function listTagSummaries() {
  const clients = await prisma.client.findMany({ select: { tags: true } })

  const countMap = new Map<string, number>()
  for (const { tags } of clients) {
    for (const tag of tags) {
      countMap.set(tag, (countMap.get(tag) ?? 0) + 1)
    }
  }

  return Array.from(countMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
}
