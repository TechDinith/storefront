import { ProductForm } from "@/components/admin/product-form";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">Edit product</h1>
      <p className="mt-1 text-sm text-muted-foreground">ID: {id}</p>
      <div className="mt-6">
        <ProductForm initial={{}} />
      </div>
    </div>
  );
}
