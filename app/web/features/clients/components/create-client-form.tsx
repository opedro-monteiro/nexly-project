"use client";

import { X, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreateClientForm } from "../hooks/use-create-client-form";

export function CreateClientForm() {
  const {
    form,
    isPending,
    tags,
    tagInput,
    setTagInput,
    addTag,
    removeTag,
    handleTagKeyDown,
    onSubmit,
  } = useCreateClientForm();

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Novo Cliente</CardTitle>
        <CardDescription>Preencha os dados para cadastrar um novo cliente.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do cliente" {...field} />
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
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@exemplo.com" {...field} />
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
                    <Input placeholder="(11) 99999-9999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Tags</FormLabel>
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
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 rounded-full hover:bg-muted p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </FormItem>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => history.back()}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Cadastrar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
