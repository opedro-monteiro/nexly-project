import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { QUERY_KEYS } from "@/constants/query-keys";
import { makeCampaignService } from "@/services/campaign.service";
import type { CreateCampaignSchema } from "@/schemas/campaign.schema";

const campaignService = makeCampaignService();

export function useCreateCampaign() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: QUERY_KEYS.CAMPAIGNS.CREATE(),
    mutationFn: (data: CreateCampaignSchema) => campaignService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CAMPAIGNS.LIST() });
      toast.success("Campanha criada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar campanha. Tente novamente.");
    },
  });
  return { createCampaign: mutateAsync, isPending };
}
