"use client";

import { UserPlus } from "lucide-react";
import { DataTable } from "@/components/common/data-table";
import { DataTableSkeleton } from "@/components/common/data-table/data-table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { ClientDialog } from "../client-dialog";
import { useClientsTable } from "../../hooks/use-clients-table";
import { getClientColumns } from "./columns";

export function DataTableClients() {
  const {
    clients, isLoading,
    search, setSearch,
    dialogState, confirmState,
    handleCreate, handleEdit, handleView,
    handleDeleteConfirm,
    handleDialogClose, handleConfirmClose,
    handleDeleteSubmit,
    isDeleting,
  } = useClientsTable();

  const columns = getClientColumns({
    onEdit: handleEdit,
    onView: handleView,
    onDelete: handleDeleteConfirm,
  });

  if (isLoading) return <DataTableSkeleton />;

  return (
    <section className="space-y-4">
      <section className="flex justify-between items-center gap-4">
        <Input
          type="search"
          placeholder="Pesquisar por nome ou e-mail"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleCreate}>
          <UserPlus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </section>

      <DataTable columns={columns} data={clients} />

      <ClientDialog
        mode={dialogState.mode}
        client={dialogState.client}
        open={dialogState.mode !== null}
        onOpenChange={(open) => { if (!open) handleDialogClose(); }}
      />

      <ConfirmDialog
        open={confirmState.type === "delete"}
        onOpenChange={(open) => { if (!open) handleConfirmClose(); }}
        title="Excluir cliente"
        description={`Tem certeza que deseja excluir o cliente "${confirmState.client?.name}"? Esta ação não pode ser desfeita.`}
        confirmLabel="Excluir"
        variant="destructive"
        onConfirm={handleDeleteSubmit}
        isLoading={isDeleting}
      />
    </section>
  );
}
