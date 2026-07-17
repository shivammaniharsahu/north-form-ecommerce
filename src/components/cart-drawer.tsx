"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatCurrency } from "@/lib/format";

export function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, updateQuantity, removeItem } = useCart();

  return (
    <div className={`cart-overlay ${isOpen ? "open" : ""}`} aria-hidden={!isOpen} onMouseDown={(event) => event.target === event.currentTarget && closeCart()}>
      <aside className="cart-drawer" aria-label="Shopping bag">
        <div className="cart-drawer-header">
          <h2>Your bag ({items.length})</h2>
          <button className="icon-button" onClick={closeCart} aria-label="Close cart"><X size={20} /></button>
        </div>
        {items.length === 0 ? (
          <div className="empty-cart">
            <div>
              <ShoppingBag size={38} strokeWidth={1.3} />
              <h3>Your bag is waiting.</h3>
              <p>Add something considered for your everyday.</p>
              <Link className="button button-dark" href="/shop" onClick={closeCart}>Browse the edit</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(({ product, quantity }) => (
                <article className="cart-line" key={product.id}>
                  <Link className="cart-line-image" href={`/products/${product.slug}`} onClick={closeCart}>
                    <Image src={product.images[0]} alt={product.name} fill sizes="84px" />
                  </Link>
                  <div>
                    <Link href={`/products/${product.slug}`} onClick={closeCart}><h3>{product.name}</h3></Link>
                    <p>{product.category}</p>
                    <div className="quantity-controls" aria-label={`Quantity for ${product.name}`}>
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Decrease quantity"><Minus size={12} /></button>
                      <span>{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Increase quantity"><Plus size={12} /></button>
                    </div>
                    <br />
                    <button className="remove-link" onClick={() => removeItem(product.id)}>Remove</button>
                  </div>
                  <div className="cart-line-price">{formatCurrency(product.price * quantity)}</div>
                </article>
              ))}
            </div>
            <div className="cart-summary">
              <div className="summary-row"><span>Estimated subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
              <p className="cart-note">Shipping and taxes are calculated securely at checkout.</p>
              <Link className="button button-dark button-full" href="/cart" onClick={closeCart}>Review bag</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
