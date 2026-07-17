"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, LockKeyhole } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatCurrency } from "@/lib/format";

type RazorpayResponse = { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string };
type RazorpayOptions = { key: string; amount: number; currency: string; name: string; description: string; order_id: string; prefill: { name: string; email: string; contact: string }; theme: { color: string }; handler: (response: RazorpayResponse) => void };
declare global { interface Window { Razorpay: new (options: RazorpayOptions) => { open: () => void } } }

function loadRazorpay() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "busy" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(formData: FormData) {
    setStatus("busy");
    setMessage("");
    try {
      const response = await fetch("/api/payments/razorpay/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: items.map(({ product, quantity }) => ({ productId: product.id, quantity })) }) });
      const order = await response.json();
      if (!response.ok) throw new Error(order.error || "Could not start checkout.");
      if (order.demo) {
        await new Promise((resolve) => window.setTimeout(resolve, 650));
        clearCart();
        setStatus("success");
        setMessage(`Demo order ${order.receipt} placed successfully. Add Razorpay keys to accept a real payment.`);
        return;
      }
      if (!(await loadRazorpay())) throw new Error("Razorpay checkout could not load.");
      const checkout = new window.Razorpay({
        key: order.keyId, amount: order.amount, currency: order.currency, name: "North & Form", description: "Storefront order", order_id: order.id,
        prefill: { name: String(formData.get("name")), email: String(formData.get("email")), contact: String(formData.get("phone")) }, theme: { color: "#172019" },
        handler: async (payment) => {
          const verify = await fetch("/api/payments/razorpay/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payment) });
          if (!verify.ok) { setStatus("error"); setMessage("Payment received but verification failed. Contact support."); return; }
          clearCart(); setStatus("success"); setMessage(`Payment confirmed. Reference ${payment.razorpay_payment_id}.`);
        },
      });
      checkout.open();
      setStatus("idle");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Checkout failed.");
    }
  }

  if (!items.length && status !== "success") return <div className="checkout-empty"><p>Your bag is empty.</p><Link className="button button-dark" href="/shop">Return to shop</Link></div>;
  if (status === "success") return <div className="checkout-success"><Check size={30} /><h2>Order received.</h2><p>{message}</p><Link className="button button-dark" href="/shop">Continue shopping</Link></div>;

  return (
    <div className="checkout-grid">
      <form action={submit} className="checkout-form">
        <h2>Contact</h2><div className="form-grid"><label className="full">Email<input name="email" type="email" required autoComplete="email" /></label><label className="full">Full name<input name="name" required autoComplete="name" /></label><label>Phone<input name="phone" inputMode="tel" pattern="[0-9 +()-]{8,18}" required autoComplete="tel" /></label><label>Postal code<input name="postalCode" required autoComplete="postal-code" /></label><label className="full">Address<input name="address" required autoComplete="street-address" /></label><label>City<input name="city" required autoComplete="address-level2" /></label><label>State<input name="state" required autoComplete="address-level1" /></label></div>
        {message && <div className={`form-message ${status}`}>{message}</div>}
        <button className="button button-dark button-full" disabled={status === "busy"}><LockKeyhole size={15} />{status === "busy" ? "Preparing payment…" : `Pay ${formatCurrency(subtotal)}`}</button>
        <p className="secure-note">Payment details are collected by Razorpay and never touch this application.</p>
      </form>
      <aside className="checkout-summary"><h2>Your order</h2>{items.map(({ product, quantity }) => <div className="checkout-item" key={product.id}><span>{product.name}<small>Qty {quantity}</small></span><strong>{formatCurrency(product.price * quantity)}</strong></div>)}<div className="checkout-total"><span>Total</span><strong>{formatCurrency(subtotal)}</strong></div></aside>
    </div>
  );
}
