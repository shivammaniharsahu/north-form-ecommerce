import type { Metadata } from "next";
import { ShopClient } from "@/components/shop-client";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Shop all" };

export default function ShopPage() {
  return (
    <main>
      <header className="page-hero container">
        <p className="eyebrow">All objects · {products.length} pieces</p>
        <h1>The full edit.</h1>
        <p>Useful, tactile, and quietly expressive pieces for what you carry, wear, hear, and live with.</p>
      </header>
      <section className="section container"><ShopClient products={products} /></section>
    </main>
  );
}
