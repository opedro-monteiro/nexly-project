import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { makeClientService } from "@/services/client.service";
import type { UpdateClientSchema } from "@/schemas/client.schema";

const clientService = makeClientService();

export function useUpdateClient() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["update-clients"],
    mutationFn: ({ id, data }: { id: string; data: UpdateClientSchema }) =>
      clientService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS.LIST() });
      toast.success("Cliente atualizado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar cliente. Tente novamente.");
    },
  });

  return { updateClient: mutateAsync, isPending };
}
