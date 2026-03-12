import { useState } from "react";
import { Client } from "@/types/api";
import { useGetClients } from "./use-get-clients";
import { useDeleteClient } from "./use-delete-client";
import { useDebounce } from "@/hooks/use-debounce";

type DialogMode = "create" | "edit" | "view" | null;
type DialogState = { mode: DialogMode; client?: Client };

type ConfirmType = "delete" | null;
type ConfirmState = { type: ConfirmType; client?: Client };

export function useClientsTable() {
  const { clients, isLoading } = useGetClients();
  const { deleteClient, isPending: isDeleting } = useDeleteClient();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [dialogState, setDialogState] = useState<DialogState>({ mode: null });
  const [confirmState, setConfirmState] = useState<ConfirmState>({ type: null });

  const filteredClients = (clients ?? []).filter((client) => {
    const q = debouncedSearch.toLowerCase();
    return (
      client.name.toLowerCase().includes(q) ||
      client.email.toLowerCase().includes(q)
    );
  });

  function handleCreate() {
    setDialogState({ mode: "create" });
  }

  function handleEdit(client: Client) {
    setDialogState({ mode: "edit", client });
  }

  function handleView(client: Client) {
    setDialogState({ mode: "view", client });
  }

  function handleDeleteConfirm(client: Client) {
    setConfirmState({ type: "delete", client });
  }

  function handleDialogClose() {
    setDialogState({ mode: null });
  }

  function handleConfirmClose() {
    setConfirmState({ type: null });
  }

  async function handleDeleteSubmit() {
    if (!confirmState.client) return;

    try {
      await deleteClient(confirmState.client.id);
      handleConfirmClose();
    } catch {
      // Error handling is done by the hook's onError toast
    }
  }

  return {
    clients: filteredClients,
    isLoading,
    search,
    setSearch,
    dialogState,
    confirmState,
    handleCreate,
    handleEdit,
    handleView,
    handleDeleteConfirm,
    handleDialogClose,
    handleConfirmClose,
    handleDeleteSubmit,
    isDeleting,
  };
}
