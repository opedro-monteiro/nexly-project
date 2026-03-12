"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createCampaignSchema, type CreateCampaignSchema } from "@/schemas/campaign.schema";
import type { Campaign } from "@/types/api";
import { useCreateCampaign } from "../hooks/use-create-campaign";
import { useUpdateCampaign } from "../hooks/use-update-campaign";
import { CampaignForm } from "./campaign-form";

type DialogMode = "create" | "edit" | "view" | null;

interface CampaignDialogProps {
  mode: DialogMode;
  campaign?: Campaign;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const titles: Record<NonNullable<DialogMode>, string> = {
  create: "Nova Campanha",
  edit: "Editar Campanha",
  view: "Detalhes da Campanha",
};

export function CampaignDialog({
  mode,
  campaign,
  open,
  onOpenChange,
}: CampaignDialogProps) {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const form = useForm<CreateCampaignSchema>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      name: "",
      message: "",
      channel: "EMAIL",
      targetTags: [],
    },
  });

  const { createCampaign, isPending: isCreating } = useCreateCampaign();
  const { updateCampaign, isPending: isUpdating } = useUpdateCampaign();
  const isPending = isCreating || isUpdating;

  useEffect(() => {
    if (mode === "edit" || mode === "view") {
      if (campaign) {
        form.reset({
          name: campaign.name,
          message: campaign.message,
          channel: campaign.channel,
          targetTags: campaign.targetTags,
        });
        setTags(campaign.targetTags ?? []);
      }
    } else if (mode === "create") {
      form.reset({
        name: "",
        message: "",
        channel: "EMAIL",
        targetTags: [],
      });
      setTags([]);
      setTagInput("");
    }
  }, [campaign, mode, form]);

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      const newTags = [...tags, trimmed];
      setTags(newTags);
      form.setValue("targetTags", newTags);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    form.setValue("targetTags", newTags);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    if (mode === "create") {
      await createCampaign({ ...data, targetTags: tags });
      onOpenChange(false);
    } else if (mode === "edit" && campaign) {
      await updateCampaign({ id: campaign.id, data: { ...data, targetTags: tags } });
      onOpenChange(false);
    }
  });

  if (!mode) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{titles[mode]}</DialogTitle>
        </DialogHeader>
        <CampaignForm
          form={form}
          onSubmit={handleSubmit}
          isPending={isPending}
          isReadOnly={mode === "view"}
          tags={tags}
          tagInput={tagInput}
          setTagInput={setTagInput}
          addTag={addTag}
          removeTag={removeTag}
          handleTagKeyDown={handleTagKeyDown}
          submitLabel={mode === "create" ? "Cadastrar" : "Salvar alterações"}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
