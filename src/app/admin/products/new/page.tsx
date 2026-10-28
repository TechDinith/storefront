import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">New product</h1>
      <div className="mt-6">
        <ProductForm />
      </div>
    </div>
  );
}
