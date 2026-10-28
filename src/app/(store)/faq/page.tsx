export const metadata = { title: "FAQ" };

const faqs = [
  { q: "How long does shipping take?", a: "Standard shipping takes 3–5 business days." },
  { q: "What is your return policy?", a: "30 days, unused items in original packaging." },
  { q: "Do you ship internationally?", a: "Yes, to most countries." },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Frequently asked questions</h1>
      <div className="mt-8 space-y-6">
        {faqs.map((f) => (
          <div key={f.q}>
            <h3 className="font-semibold">{f.q}</h3>
            <p className="mt-1 text-muted-foreground">{f.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
