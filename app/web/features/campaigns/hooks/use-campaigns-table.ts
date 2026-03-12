import { useState } from "react";
import { Campaign, Channel } from "@/types/api";
import { useGetCampaigns } from "./use-get-campaigns";
import { useDeleteCampaign } from "./use-delete-campaign";
import { useDispatchCampaign } from "./use-dispatch-campaign";
import { useDebounce } from "@/hooks/use-debounce";

type DialogMode = "create" | "edit" | "view" | null;
type DialogState = { mode: DialogMode; campaign?: Campaign };

type ConfirmType = "delete" | "dispatch" | null;
type ConfirmState = { type: ConfirmType; campaign?: Campaign };

export function useCampaignsTable() {
  const { campaigns, isLoading } = useGetCampaigns();
  const { deleteCampaign, isPending: isDeleting } = useDeleteCampaign();
  const { dispatchCampaign, isPending: isDispatching } = useDispatchCampaign();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const [channelFilter, setChannelFilter] = useState<Channel | "ALL">("ALL");

  const [dialogState, setDialogState] = useState<DialogState>({
    mode: null,
  });

  const [confirmState, setConfirmState] = useState<ConfirmState>({
    type: null,
  });

  const filteredCampaigns = (campaigns ?? []).filter((campaign) => {
    const matchesSearch = campaign.name
      .toLowerCase()
      .includes(debouncedSearch.toLowerCase());

    const matchesChannel =
      channelFilter === "ALL" || campaign.channel === channelFilter;

    return matchesSearch && matchesChannel;
  });

  function handleCreate() {
    setDialogState({ mode: "create" });
  }

  function handleEdit(campaign: Campaign) {
    setDialogState({ mode: "edit", campaign });
  }

  function handleView(campaign: Campaign) {
    setDialogState({ mode: "view", campaign });
  }

  function handleDeleteConfirm(campaign: Campaign) {
    setConfirmState({ type: "delete", campaign });
  }

  function handleDispatchConfirm(campaign: Campaign) {
    setConfirmState({ type: "dispatch", campaign });
  }

  function handleDialogClose() {
    setDialogState({ mode: null });
  }

  function handleConfirmClose() {
    setConfirmState({ type: null });
  }

  async function handleDeleteSubmit() {
    if (!confirmState.campaign) return;

    try {
      await deleteCampaign(confirmState.campaign.id);
      handleConfirmClose();
    } catch {
      // Error handling is done by the hook's onError toast
    }
  }

  async function handleDispatchSubmit() {
    if (!confirmState.campaign) return;

    try {
      await dispatchCampaign(confirmState.campaign.id);
      handleConfirmClose();
    } catch {
      // Error handling is done by the hook's onError toast
    }
  }

  return {
    campaigns: filteredCampaigns,
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
  };
}
