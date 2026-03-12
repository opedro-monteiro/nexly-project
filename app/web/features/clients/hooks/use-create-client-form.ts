import { useState, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createClientSchema, type CreateClientSchema } from "@/schemas/client.schema";
import { useCreateClient } from "./use-create-client";

export function useCreateClientForm() {
  const router = useRouter();
  const { createClient, isPending } = useCreateClient();
  const [tagInput, setTagInput] = useState("");

  const form = useForm<CreateClientSchema>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      tags: [],
    },
  });

  const tags = form.watch("tags") ?? [];

  function addTag() {
    const trimmed = tagInput.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    form.setValue("tags", [...tags, trimmed]);
    setTagInput("");
  }

  function removeTag(tag: string) {
    form.setValue(
      "tags",
      tags.filter((t) => t !== tag),
    );
  }

  function handleTagKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  }

  async function onSubmit(data: CreateClientSchema) {
    await createClient(data);
    router.push("/dashboard");
  }

  return {
    form,
    isPending,
    tags,
    tagInput,
    setTagInput,
    addTag,
    removeTag,
    handleTagKeyDown,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
