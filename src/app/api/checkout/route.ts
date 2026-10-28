import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // TODO: create Stripe Checkout Session using STRIPE_SECRET_KEY
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const session = await stripe.checkout.sessions.create({...});
    return NextResponse.json({
      url: null,
      message: "Stripe not configured. Use COD checkout instead.",
      received: body,
    });
  } catch {
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
