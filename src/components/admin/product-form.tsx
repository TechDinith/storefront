"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ImageUpload } from "@/components/ui/image-upload";

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  category: z.string().min(1),
  price: z.number().positive(),
  compareAtPrice: z.number().optional(),
  stock: z.number().int().min(0),
  image: z.string().url().optional().or(z.literal("")),
  color: z.string().optional(),
  size: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function ProductForm({ initial }: { initial?: Partial<FormValues> }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      category: "men",
      price: 0,
      compareAtPrice: undefined,
      stock: 0,
      image: "",
      color: "",
      size: "",
      ...initial,
    },
  });

  const onSubmit = async (_values: FormValues) => {
    void _values;
    setSaving(true);
    try {
      // TODO: persist to Firestore / Storage
      toast.success("Product saved (demo)");
      router.push("/admin/products");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label>Name</Label>
            <Input {...form.register("name")} />
            {form.formState.errors.name && <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>}
          </div>
          <div>
            <Label>Slug</Label>
            <Input {...form.register("slug")} />
          </div>
          <div>
            <Label>Category</Label>
            <Input {...form.register("category")} />
          </div>
          <div className="sm:col-span-2">
            <Label>Description</Label>
            <Textarea rows={4} {...form.register("description")} />
          </div>
          <div>
            <Label>Price</Label>
            <Input type="number" step="0.01" {...form.register("price", { valueAsNumber: true })} />
          </div>
          <div>
            <Label>Compare-at price</Label>
            <Input type="number" step="0.01" {...form.register("compareAtPrice", { valueAsNumber: true })} />
          </div>
          <div>
            <Label>Stock</Label>
            <Input type="number" {...form.register("stock", { valueAsNumber: true })} />
          </div>
          <div className="sm:col-span-2">
            <ImageUpload
              label="Image"
              /* eslint-disable-next-line react-hooks/incompatible-library */
              value={form.watch("image") as string}
              onChange={(url) => form.setValue("image", url, { shouldValidate: true })}
            />
          </div>
          <div>
            <Label>Variant color</Label>
            <Input {...form.register("color")} />
          </div>
          <div>
            <Label>Variant size</Label>
            <Input {...form.register("size")} />
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save product"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
