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
