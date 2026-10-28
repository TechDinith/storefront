export const metadata = { title: "Shipping" };

export default function ShippingPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Shipping</h1>
      <div className="mt-6 space-y-4 text-muted-foreground">
        <p>Free shipping on orders over $50. Standard delivery 3–5 business days.</p>
        <p>Express options available at checkout.</p>
      </div>
    </div>
  );
}
