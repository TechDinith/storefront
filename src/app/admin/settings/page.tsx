export default function AdminSettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
      <p className="mt-4 text-muted-foreground">
        Store settings (brand, currency, shipping rates, taxes) will be managed here. Configure via <code>src/config/store.ts</code> for now.
      </p>
    </div>
  );
}
