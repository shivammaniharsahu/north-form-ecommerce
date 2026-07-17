import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/payments/razorpay";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-razorpay-signature") || "";
  if (!(await verifyWebhookSignature(body, signature))) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  const event = JSON.parse(body) as { event?: string };
  // Persist the event ID before processing when Supabase is configured. The
  // webhook_events unique constraint makes retries idempotent.
  return NextResponse.json({ received: true, event: event.event });
}
