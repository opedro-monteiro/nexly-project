# Send History Screen — Design Spec
**Date:** 2026-03-12
**Status:** Approved

## Overview

Tela de histórico de envios exibindo os registros de clientes que receberam mensagens via campanhas. Segue os mesmos padrões visuais e arquiteturais da tela de campanhas (`features/campaigns/`).

## Backend Changes

### `app/api/src/modules/send/send.service.ts`
- Atualizar `listSendHistory()` para incluir join com `client` (além do já existente com `campaign`)
- Adicionar `clientName: send.client.name` ao objeto de retorno

### `app/api/src/modules/send/send.schema.ts`
- Adicionar `clientName: z.string()` ao `sendHistoryItemSchema`

## Frontend Changes

### `types/api.ts`
- Adicionar interface `SendHistoryItem` com: `id`, `clientName`, `name` (campanha), `channel`, `status`, `sentAt`

### `constants/endpoints.ts`
- Adicionar `SENDS.HISTORY: API_VERSION.V1 + "/sends/history"`

### `constants/query-keys.ts`
- Adicionar `SENDS.HISTORY: () => ["sends-history"]`

### `services/send.service.ts` (novo arquivo)
- Interface `SendService` com método `listHistory(): Promise<SendHistoryItem[]>`
- Implementação `SendServiceImpl` chamando `GET /sends/history`
- Factory `makeSendService()`

### `features/sends/hooks/use-get-send-history.ts` (novo)
- `useQuery` com `QUERY_KEYS.SENDS.HISTORY()` e `sendService.listHistory()`
- Retorna `{ history, isLoading, ...rest }`

### `features/sends/hooks/use-sends-history-table.ts` (novo)
- Estado: `search` (string, debounced), `statusFilter` ("ALL" | SendStatus), `channelFilter` ("ALL" | Channel)
- Filtragem client-side sobre os dados retornados
- Retorna: dados filtrados + estados + setters

### `features/sends/components/data-table/columns.tsx` (novo)
- Colunas: clientName, name (campanha), status (Badge colorido), channel (Badge com ícone), sentAt
- Status badges: `PENDING` amarelo, `SENT` verde, `FAILED` vermelho
- Canal badges: igual ao de campaigns (EMAIL azul, WHATSAPP verde)

### `features/sends/components/data-table/index.tsx` (novo)
- Filtros: input de busca, select de status, select de canal
- Botão "Ir para Campanhas" (`/dashboard/campaigns`) usando `useRouter`
- Renderiza `<DataTable>` e `<DataTableSkeleton>` durante loading

### `app/(private)/dashboard/sends/page.tsx`
- Server Component com `prefetchQuery` (igual `campaigns/page.tsx`)
- Usa `HydrationBoundary` + `<DataTableSends />`

## Data Flow

```
page.tsx (Server)
  → prefetchQuery(SENDS.HISTORY)
  → HydrationBoundary
    → DataTableSends (Client)
      → use-sends-history-table
        → use-get-send-history (useQuery)
          → sendService.listHistory()
            → GET /api/v1/sends/history
```

## Columns & Filters

| Coluna | Campo | Tipo |
|---|---|---|
| Nome do Cliente | `clientName` | texto |
| Campanha | `name` | texto |
| Status | `status` | Badge: PENDING=amarelo, SENT=verde, FAILED=vermelho |
| Canal | `channel` | Badge com ícone |
| Data Enviada | `sentAt` | data pt-BR ou `—` |

Filtros: busca por cliente/campanha, status, canal. Botão de ação para `/dashboard/campaigns`.
