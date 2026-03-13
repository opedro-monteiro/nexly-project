import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { makeClientService } from "@/services/client.service";
import { ApiError } from "@/lib/http";

const clientService = makeClientService();

export function useDeleteClient() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["delete-clients"],
    mutationFn: (id: string) => clientService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CLIENTS.LIST() });
      toast.success("Cliente excluído com sucesso!");
    },
    onError: (error) => {
      const message =
        error instanceof ApiError
          ? error.message
          : "Erro ao excluir cliente. Tente novamente.";
      toast.error(message);
    },
  });

  return { deleteClient: mutateAsync, isPending };
}
