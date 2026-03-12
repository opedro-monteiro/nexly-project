"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Plus, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RequiredField } from "@/components/common/required-field";
import { createClientSchema, type CreateClientSchema } from "@/schemas/client.schema";
import type { Client } from "@/types/api";
import { maskPhone } from "@/utils/phone";
import { useCreateClient } from "../hooks/use-create-client";
import { useUpdateClient } from "../hooks/use-update-client";

type DialogMode = "create" | "edit" | "view" | null;

interface ClientDialogProps {
  mode: DialogMode;
  client?: Client;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const titles: Record<NonNullable<DialogMode>, string> = {
  create: "Novo Cliente",
  edit: "Editar Cliente",
  view: "Detalhes do Cliente",
};

export function ClientDialog({
  mode,
  client,
  open,
  onOpenChange,
}: ClientDialogProps) {
  const [tags, setTags] = useState<string[]>([]);
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

  const { createClient, isPending: isCreating } = useCreateClient();
  const { updateClient, isPending: isUpdating } = useUpdateClient();
  const isPending = isCreating || isUpdating;

  const isReadOnly = mode === "view";

  useEffect(() => {
    if (mode === "edit" || mode === "view") {
      if (client) {
        form.reset({
          name: client.name,
          email: client.email,
          phone: client.phone ?? "",
          tags: client.tags ?? [],
        });
        setTags(client.tags ?? []);
      }
    } else if (mode === "create") {
      form.reset({
        name: "",
        email: "",
        phone: "",
        tags: [],
      });
      setTags([]);
      setTagInput("");
    }
  }, [client, mode, form]);

  const addTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      const newTags = [...tags, trimmed];
      setTags(newTags);
      form.setValue("tags", newTags);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    form.setValue("tags", newTags);
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    if (mode === "create") {
      await createClient({ ...data, tags });
      onOpenChange(false);
    } else if (mode === "edit" && client) {
      await updateClient({ id: client.id, data: { ...data, tags } });
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
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nome <RequiredField />
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nome do cliente"
                      readOnly={isReadOnly}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    E-mail <RequiredField />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@exemplo.com"
                      readOnly={isReadOnly}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(11) 99999-9999"
                      readOnly={isReadOnly}
                      {...field}
                      onChange={(e) => {
                        field.onChange(maskPhone(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Tags</FormLabel>
              {!isReadOnly && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar tag e pressionar Enter"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                  />
                  <Button type="button" variant="outline" size="icon" onClick={addTag}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                      {tag}
                      {!isReadOnly && (
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 rounded-full hover:bg-muted p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
              )}
            </FormItem>

            {!isReadOnly && (
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {mode === "create" ? "Cadastrar" : "Salvar alterações"}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
