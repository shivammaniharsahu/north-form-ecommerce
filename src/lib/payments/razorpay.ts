import { getServerEnv } from "@/lib/env";

function fromHex(value: string) {
  if (!/^[0-9a-f]+$/i.test(value) || value.length % 2 !== 0) return null;
  return Uint8Array.from(value.match(/.{2}/g) ?? [], (byte) => Number.parseInt(byte, 16));
}

async function verifyHmac(message: string, signature: string, secret: string) {
  const signatureBytes = fromHex(signature);
  if (!signatureBytes) return false;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["verify"]);
  return crypto.subtle.verify("HMAC", key, signatureBytes, encoder.encode(message));
}

export async function verifyPaymentSignature(orderId: string, paymentId: string, signature: string) {
  const { RAZORPAY_KEY_SECRET } = getServerEnv();
  if (!RAZORPAY_KEY_SECRET) return false;
  return verifyHmac(`${orderId}|${paymentId}`, signature, RAZORPAY_KEY_SECRET);
}

export async function verifyWebhookSignature(body: string, signature: string) {
  const { RAZORPAY_WEBHOOK_SECRET } = getServerEnv();
  if (!RAZORPAY_WEBHOOK_SECRET) return false;
  return verifyHmac(body, signature, RAZORPAY_WEBHOOK_SECRET);
}
