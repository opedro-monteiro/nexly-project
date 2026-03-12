import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetClients } from "./use-get-clients";

export function useClientsTable() {
  const router = useRouter();
  const { clients, isLoading } = useGetClients();
  const [search, setSearch] = useState("");

  const filtered = (clients ?? []).filter(
    (client) =>
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.email.toLowerCase().includes(search.toLowerCase()),
  );

  function handleNewClient() {
    router.push("/dashboard/clients/create");
  }

  return {
    clients: filtered,
    isLoading,
    search,
    setSearch,
    handleNewClient,
  };
}
