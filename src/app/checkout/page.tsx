import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout-client";

export const metadata: Metadata = { title: "Secure checkout" };

export default function CheckoutPage() {
  return <main className="container section checkout-page"><p className="eyebrow">Secure checkout</p><h1>Where should we send it?</h1><CheckoutClient /></main>;
}
