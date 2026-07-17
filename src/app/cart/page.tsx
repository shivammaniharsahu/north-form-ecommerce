import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart-page-client";

export const metadata: Metadata = { title: "Your bag" };

export default function CartPage() {
  return <main><header className="page-hero container"><p className="eyebrow">Your selection</p><h1>Shopping bag.</h1></header><section className="section container cart-page"><CartPageClient /></section></main>;
}
