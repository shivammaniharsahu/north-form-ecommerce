"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatCurrency } from "@/lib/format";

export function CartPageClient() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (!items.length) {
    return (
      <div className="empty-cart cart-page">
        <div><ShoppingBag size={44} strokeWidth={1.2} /><h3>Your bag is empty.</h3><p>There is plenty worth considering in the current edit.</p><Link className="button button-dark" href="/shop">Explore the shop</Link></div>
      </div>
    );
  }

  return (
    <div className="cart-page-grid">
      <div>
        {items.map(({ product, quantity }) => (
          <article className="cart-line" key={product.id}>
            <Link className="cart-line-image" href={`/products/${product.slug}`}><Image src={product.images[0]} alt={product.name} fill sizes="110px" /></Link>
            <div><Link href={`/products/${product.slug}`}><h3>{product.name}</h3></Link><p>{product.category}</p><div className="quantity-controls"><button onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Decrease"><Minus size={12} /></button><span>{quantity}</span><button onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Increase"><Plus size={12} /></button></div><br /><button className="remove-link" onClick={() => removeItem(product.id)}>Remove</button></div>
            <div className="cart-line-price">{formatCurrency(product.price * quantity)}</div>
          </article>
        ))}
      </div>
      <aside className="order-card">
        <h2>Order summary</h2>
        <div className="summary-row"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
        <div className="summary-row"><span>Delivery</span><span>{subtotal >= 3500 ? "Complimentary" : "Calculated next"}</span></div>
        <div className="summary-row"><strong>Total</strong><strong>{formatCurrency(subtotal)}</strong></div>
        <Link className="button button-dark button-full" href="/checkout">Continue to secure checkout</Link>
        <p className="cart-note">Your order total is recalculated securely before Razorpay opens.</p>
      </aside>
    </div>
  );
}
