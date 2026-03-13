# Send History Screen Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar a tela de histórico de envios com tabela filtrável mostrando cliente, campanha, status, canal e data enviada.

**Architecture:** Feature isolada em `features/sends/` espelhando o padrão de `features/campaigns/`. Backend corrigido para incluir `clientName` no endpoint `/sends/history`. Server Component com prefetch no Next.js + React Query hydration.

**Tech Stack:** Next.js 16 App Router, React Query (`@tanstack/react-query`), shadcn/ui, TanStack Table, TypeScript, Prisma (backend), Fastify (backend).

---

## Chunk 1: Backend fix — incluir clientName no histórico

### Task 1: Atualizar `send.service.ts` (API) para incluir client

**Files:**
- Modify: `app/api/src/modules/send/send.service.ts`

- [ ] **Step 1: Atualizar `listSendHistory` para incluir join com `client`**

```typescript
export async function listSendHistory() {
  const sends = await prisma.send.findMany({
    include: { campaign: true, client: true },
    orderBy: { createdAt: "desc" },
  });

  return sends.map((send) => ({
    id: send.id,
    clientName: send.client.name,
    name: send.campaign.name,
    channel: send.campaign.channel,
    targetTags: send.campaign.targetTags,
    status: send.status,
    sentAt: send.sentAt?.toISOString() ?? null,
  }));
}
```

- [ ] **Step 2: Commit**

```bash
git add app/api/src/modules/send/send.service.ts
git commit -m "fix: include clientName in listSendHistory response"
```

### Task 2: Atualizar `sendHistoryItemSchema` no backend

**Files:**
- Modify: `app/api/src/modules/send/send.schema.ts`

- [ ] **Step 1: Adicionar `clientName` ao schema**

Substituir:
```typescript
export const sendHistoryItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  channel: z.string(),
  targetTags: z.array(z.string()),
  status: z.string(),
  sentAt: z.string().nullable(),
})
```

Por:
```typescript
export const sendHistoryItemSchema = z.object({
  id: z.string(),
  clientName: z.string(),
  name: z.string(),
  channel: z.string(),
  targetTags: z.array(z.string()),
  status: z.string(),
  sentAt: z.string().nullable(),
})
export type SendHistoryItem = z.infer<typeof sendHistoryItemSchema>
```

- [ ] **Step 2: Commit**

```bash
git add app/api/src/modules/send/send.schema.ts
git commit -m "fix: add clientName to sendHistoryItemSchema"
```

---

## Chunk 2: Frontend — types, constants e service

### Task 3: Adicionar `SendHistoryItem` em `types/api.ts`

**Files:**
- Modify: `app/web/types/api.ts`

- [ ] **Step 1: Adicionar interface `SendHistoryItem`**

Adicionar ao final do arquivo:
```typescript
export interface SendHistoryItem {
  id: string;
  clientName: string;
  name: string;
  channel: Channel;
  targetTags: string[];
  status: SendStatus;
  sentAt: string | null;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/web/types/api.ts
git commit -m "feat: add SendHistoryItem type"
```

### Task 4: Adicionar endpoint `SENDS.HISTORY` em `constants/endpoints.ts`

**Files:**
- Modify: `app/web/constants/endpoints.ts`

- [ ] **Step 1: Adicionar `HISTORY` ao bloco `SENDS`**

```typescript
SENDS: {
  LIST: API_VERSION.V1 + "/sends",
  HISTORY: API_VERSION.V1 + "/sends/history",
  CREATE: API_VERSION.V1 + "/sends",
  GET: (id: string) => API_VERSION.V1 + `/sends/${id}`,
  UPDATE: (id: string) => API_VERSION.V1 + `/sends/${id}`,
  DELETE: (id: string) => API_VERSION.V1 + `/sends/${id}`,
},
```

- [ ] **Step 2: Adicionar `HISTORY` ao bloco `SENDS` em `constants/query-keys.ts`**

```typescript
SENDS: {
  LIST: () => ["sends"],
  HISTORY: () => ["sends-history"],
  CREATE: () => ["create-sends"],
  GET: (id: string) => ["sends", id],
  UPDATE: (id: string) => ["update-sends", id],
  DELETE: (id: string) => ["delete-sends", id],
},
```

- [ ] **Step 3: Commit**

```bash
git add app/web/constants/endpoints.ts app/web/constants/query-keys.ts
git commit -m "feat: add SENDS.HISTORY endpoint and query key"
```

### Task 5: Criar `services/send.service.ts`

**Files:**
- Create: `app/web/services/send.service.ts`

- [ ] **Step 1: Criar o service**

```typescript
import { api } from "@/lib/http";
import { ENDPOINTS } from "@/constants/endpoints";
import type { SendHistoryItem } from "@/types/api";

export interface SendService {
  listHistory(): Promise<SendHistoryItem[]>;
}

class SendServiceImpl implements SendService {
  async listHistory(): Promise<SendHistoryItem[]> {
    const response = await api.get<SendHistoryItem[]>(ENDPOINTS.SENDS.HISTORY);
    return response.data;
  }
}

export const makeSendService = () => new SendServiceImpl();
```

- [ ] **Step 2: Commit**

```bash
git add app/web/services/send.service.ts
git commit -m "feat: create send service with listHistory method"
```

---

## Chunk 3: Frontend — hooks da feature sends

### Task 6: Criar `features/sends/hooks/use-get-send-history.ts`

**Files:**
- Create: `app/web/features/sends/hooks/use-get-send-history.ts`

- [ ] **Step 1: Criar o hook**

```typescript
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { makeSendService } from "@/services/send.service";
import type { SendHistoryItem } from "@/types/api";

type Options = Omit<UseQueryOptions<SendHistoryItem[]>, "queryKey" | "queryFn">;
const sendService = makeSendService();

export function useGetSendHistory(options?: Options) {
  const { data, ...rest } = useQuery<SendHistoryItem[]>({
    queryKey: QUERY_KEYS.SENDS.HISTORY(),
    queryFn: () => sendService.listHistory(),
    refetchOnWindowFocus: false,
    ...options,
  });
  return { history: data, ...rest };
}
```

- [ ] **Step 2: Commit**

```bash
git add app/web/features/sends/hooks/use-get-send-history.ts
git commit -m "feat: add useGetSendHistory hook"
```

### Task 7: Criar `features/sends/hooks/use-sends-history-table.ts`

**Files:**
- Create: `app/web/features/sends/hooks/use-sends-history-table.ts`

- [ ] **Step 1: Criar o hook de tabela com filtros**

```typescript
import { useState } from "react";
import { useGetSendHistory } from "./use-get-send-history";
import { useDebounce } from "@/hooks/use-debounce";
import type { Channel, SendStatus } from "@/types/api";

export function useSendsHistoryTable() {
  const { history, isLoading } = useGetSendHistory();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [statusFilter, setStatusFilter] = useState<SendStatus | "ALL">("ALL");
  const [channelFilter, setChannelFilter] = useState<Channel | "ALL">("ALL");

  const filteredHistory = (history ?? []).filter((item) => {
    const matchesSearch =
      item.clientName.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || item.status === statusFilter;

    const matchesChannel =
      channelFilter === "ALL" || item.channel === channelFilter;

    return matchesSearch && matchesStatus && matchesChannel;
  });

  return {
    history: filteredHistory,
    isLoading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    channelFilter,
    setChannelFilter,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add app/web/features/sends/hooks/use-sends-history-table.ts
git commit -m "feat: add useSendsHistoryTable hook with filters"
```

---

## Chunk 4: Frontend — componentes da tabela

### Task 8: Criar `features/sends/components/data-table/columns.tsx`

**Files:**
- Create: `app/web/features/sends/components/data-table/columns.tsx`

- [ ] **Step 1: Criar as colunas**

```typescript
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SendHistoryItem, Channel, SendStatus } from "@/types/api";
import { FaWhatsapp } from "react-icons/fa";

function StatusBadge({ status }: { status: SendStatus }) {
  if (status === "SENT") {
    return <Badge className="bg-green-600 text-white border-0">Enviado</Badge>;
  }
  if (status === "FAILED") {
    return <Badge className="bg-red-600 text-white border-0">Falhou</Badge>;
  }
  return (
    <Badge className="bg-yellow-500 text-white border-0">Pendente</Badge>
  );
}

function ChannelBadge({ channel }: { channel: Channel }) {
  if (channel === "EMAIL") {
    return (
      <Badge variant="outline" className="text-blue-600 border-blue-600 gap-1">
        <Mail className="h-3 w-3" />
        E-mail
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-green-600 border-green-600 gap-1">
      <FaWhatsapp className="h-3 w-3" />
      WhatsApp
    </Badge>
  );
}

export function getSendHistoryColumns(): ColumnDef<SendHistoryItem>[] {
  return [
    {
      accessorKey: "clientName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Campanha <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
    },
    {
      accessorKey: "channel",
      header: "Canal",
      cell: ({ row }) => <ChannelBadge channel={row.getValue("channel")} />,
    },
    {
      accessorKey: "sentAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          className="-ml-3 h-8"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data Enviada <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const sentAt: string | null = row.getValue("sentAt");
        if (!sentAt) return <span className="text-muted-foreground">—</span>;
        return new Date(sentAt).toLocaleDateString("pt-BR");
      },
    },
  ];
}
```

- [ ] **Step 2: Commit**

```bash
git add app/web/features/sends/components/data-table/columns.tsx
git commit -m "feat: add send history table columns"
```

### Task 9: Criar `features/sends/components/data-table/index.tsx`

**Files:**
- Create: `app/web/features/sends/components/data-table/index.tsx`

- [ ] **Step 1: Criar o componente de tabela com filtros e botão de ação**

```typescript
"use client";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { DataTable } from "@/components/common/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSendsHistoryTable } from "../../hooks/use-sends-history-table";
import { getSendHistoryColumns } from "./columns";
import type { Channel, SendStatus } from "@/types/api";

export function DataTableSendsHistory() {
  const router = useRouter();
  const {
    history,
    isLoading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    channelFilter,
    setChannelFilter,
  } = useSendsHistoryTable();

  const columns = getSendHistoryColumns();

  if (isLoading) return <DataTableSkeleton />;

  return (
    <section className="space-y-4">
      <section className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Pesquisar por cliente ou campanha..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v as SendStatus | "ALL")}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos os status</SelectItem>
              <SelectItem value="PENDING">Pendente</SelectItem>
              <SelectItem value="SENT">Enviado</SelectItem>
              <SelectItem value="FAILED">Falhou</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={channelFilter}
            onValueChange={(v) => setChannelFilter(v as Channel | "ALL")}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Canal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Todos os canais</SelectItem>
              <SelectItem value="EMAIL">E-mail</SelectItem>
              <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push("/dashboard/campaigns")}
        >
          <Send className="mr-2 h-4 w-4" />
          Ir para Campanhas
        </Button>
      </section>

      <DataTable columns={columns} data={history} />
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/web/features/sends/components/data-table/index.tsx
git commit -m "feat: add DataTableSendsHistory component"
```

---

## Chunk 5: Frontend — page e wiring final

### Task 10: Criar/atualizar `app/(private)/dashboard/sends/page.tsx`

**Files:**
- Create/Modify: `app/web/app/(private)/dashboard/sends/page.tsx`

- [ ] **Step 1: Criar a page com prefetch (Server Component)**

```typescript
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getQueryClient } from "@/lib/react-query";
import { makeSendService } from "@/services/send.service";
import { DataTableSendsHistory } from "@/features/sends/components/data-table";

const sendService = makeSendService();

export default async function SendsHistoryPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.SENDS.HISTORY(),
    queryFn: sendService.listHistory,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="container mx-auto p-10 space-y-4">
        <DataTableSendsHistory />
      </main>
    </HydrationBoundary>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/web/app/(private)/dashboard/sends/page.tsx
git commit -m "feat: add sends history page with SSR prefetch"
```

### Task 11: Verificar lint e build

- [ ] **Step 1: Rodar lint no web**

```bash
cd app/web && npm run lint
```
Esperado: sem erros.

- [ ] **Step 2: Commit final se tiver ajustes**

```bash
git add -A
git commit -m "fix: lint fixes for sends history feature"
```
