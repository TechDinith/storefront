export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
      <div className="mt-6 space-y-4 text-muted-foreground">
        <p>By using this store, you agree to these terms. This is a portfolio template; replace with your legal terms.</p>
        <h2 className="text-xl font-semibold text-foreground">Orders & payment</h2>
        <p>Orders are confirmed upon payment authorization. Prices may change without notice.</p>
        <h2 className="text-xl font-semibold text-foreground">Returns</h2>
        <p>See our Returns policy for details.</p>
      </div>
    </div>
  );
}
