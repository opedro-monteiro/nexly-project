"use client";
import { Clock, Plus } from "lucide-react";
import { DataTable } from "@/components/common/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CampaignDialog } from "@/features/campaigns/components/campaign-dialog";
import { useCampaignsTable } from "../../hooks/use-campaigns-table";
import { getCampaignColumns } from "./columns";
import type { Channel } from "@/types/api";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

export function DataTableCampaigns() {
  const {
    campaigns,
    isLoading,
    search,
    setSearch,
    channelFilter,
    setChannelFilter,
    dialogState,
    confirmState,
    handleCreate,
    handleEdit,
    handleView,
    handleDeleteConfirm,
    handleDispatchConfirm,
    handleDialogClose,
    handleConfirmClose,
    handleDeleteSubmit,
    handleDispatchSubmit,
    isDeleting,
    isDispatching,
  } = useCampaignsTable();

  const columns = getCampaignColumns({
    onEdit: handleEdit,
    onView: handleView,
    onDelete: handleDeleteConfirm,
    onDispatch: handleDispatchConfirm,
  });

  if (isLoading) return <DataTableSkeleton />;

  return (
    <section className="space-y-4">
      <section className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Input
            type="search"
            placeholder="Pesquisar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
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
        <section className="space-x-2">
          <Link href={ROUTES.DASHBOARD.SENDS.ROOT}>
            <Button onClick={handleCreate} variant={"secondary"}>
              <Clock className="mr-2 h-4 w-4" />
              Ir para Histórico
            </Button>
          </Link>

          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Campanha
          </Button>
        </section>
      </section>

      <DataTable columns={columns} data={campaigns} />

      <CampaignDialog
        mode={dialogState.mode}
        campaign={dialogState.campaign}
        open={dialogState.mode !== null}
        onOpenChange={(open) => {
          if (!open) handleDialogClose();
        }}
      />

      <ConfirmDialog
        open={confirmState.type === "delete"}
        onOpenChange={(open) => {
          if (!open) handleConfirmClose();
        }}
        title="Excluir campanha"
        description={`Tem certeza que deseja excluir a campanha "${confirmState.campaign?.name}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        variant="destructive"
        onConfirm={handleDeleteSubmit}
        isLoading={isDeleting}
      />

      <ConfirmDialog
        open={confirmState.type === "dispatch"}
        onOpenChange={(open) => {
          if (!open) handleConfirmClose();
        }}
        title="Disparar campanha"
        description={`Deseja disparar a campanha "${confirmState.campaign?.name}" para todos os clientes com as tags alvo?`}
        confirmLabel="Disparar"
        onConfirm={handleDispatchSubmit}
        isLoading={isDispatching}
      />
    </section>
  );
}
