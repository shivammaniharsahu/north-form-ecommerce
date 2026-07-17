import { NextResponse } from "next/server";
import { z } from "zod";
import { products } from "@/data/products";
import { getServerEnv } from "@/lib/env";

const bodySchema = z.object({ items: z.array(z.object({ productId: z.string(), quantity: z.number().int().min(1).max(10) })).min(1).max(25) });

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid cart." }, { status: 400 });

  let amount = 0;
  for (const item of parsed.data.items) {
    const product = products.find((entry) => entry.id === item.productId);
    if (!product) return NextResponse.json({ error: "A product is no longer available." }, { status: 409 });
    amount += product.price * item.quantity * 100;
  }

  const env = getServerEnv();
  const receipt = `nf_${crypto.randomUUID().replaceAll("-", "").slice(0, 20)}`;
  if (!env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    return NextResponse.json({ id: `order_demo_${receipt}`, amount, currency: "INR", receipt, demo: true });
  }

  const auth = btoa(`${env.NEXT_PUBLIC_RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`);
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
    body: JSON.stringify({ amount, currency: "INR", receipt, notes: { storefront: "north-form" } }),
    cache: "no-store",
  });
  if (!response.ok) return NextResponse.json({ error: "Payment provider could not create the order." }, { status: 502 });
  return NextResponse.json({ ...(await response.json()), keyId: env.NEXT_PUBLIC_RAZORPAY_KEY_ID, demo: false });
}
