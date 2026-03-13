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
