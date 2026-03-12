import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { makeClientService } from "@/services/client.service";
import type { CreateClientSchema } from "@/schemas/client.schema";

const clientService = makeClientService();

export function useCreateClient() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: QUERY_KEYS.CLIENTS.CREATE(),
    mutationFn: (data: CreateClientSchema) => clientService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS.LIST() });
      toast.success("Cliente cadastrado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao cadastrar cliente. Tente novamente.");
    },
  });

  return { createClient: mutateAsync, isPending };
}
