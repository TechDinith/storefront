import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // TODO: verify webhook signature with STRIPE_WEBHOOK_SECRET
  // const sig = req.headers.get("stripe-signature");
  // const event = stripe.webhooks.constructEvent(body, sig, secret);
  const body = await req.text();
  return NextResponse.json({ received: true, bytes: body.length });
}
