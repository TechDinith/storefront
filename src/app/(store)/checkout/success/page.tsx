import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  // searchParams not strictly needed but kept for future
  void searchParams;
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <CheckCircle2 className="mx-auto size-16 text-green-500" />
      <h1 className="mt-4 text-3xl font-bold">Thank you for your order!</h1>
      <p className="mt-2 text-muted-foreground">
        Your order has been placed. A confirmation email will be sent shortly.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button asChild>
          <Link href="/account/orders">View orders</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/products">Continue shopping</Link>
        </Button>
      </div>
    </div>
  );
}
