import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetClients } from "./use-get-clients";
import { ROUTES } from "@/constants/routes";
import { useDebounce } from "@/hooks/use-debounce";

export function useClientsTable() {
  const router = useRouter();
  const { clients, isLoading } = useGetClients();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const filtered = (clients ?? []).filter(
    (client) =>
      client.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      client.email.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  function handleNewClient() {
    router.push(ROUTES.DASHBOARD.CLIENTS.CREATE);
  }

  return {
    clients: filtered,
    isLoading,
    search,
    setSearch,
    handleNewClient,
  };
}
