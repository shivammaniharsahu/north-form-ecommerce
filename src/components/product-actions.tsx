"use client";

import { Check, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import type { Product } from "@/types/commerce";

export function ProductActions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0].name);

  return (
    <>
      <div className="option-group">
        <div className="option-label"><span>Colour</span><span>{selectedColor}</span></div>
        <div className="swatches">
          {product.colors.map((color) => (
            <button key={color.name} className={`swatch ${selectedColor === color.name ? "active" : ""}`} style={{ background: color.value }} onClick={() => setSelectedColor(color.name)} aria-label={`Choose ${color.name}`} />
          ))}
        </div>
      </div>
      <button className="button button-dark button-full" onClick={() => addItem(product)}>Add to bag</button>
      <div className="detail-benefits">
        <div><Truck size={17} /> Free delivery over ₹3,500</div>
        <div><ShieldCheck size={17} /> 30-day easy returns</div>
      </div>
      <ul className="detail-list">
        {product.details.map((detail) => <li key={detail}><Check size={15} /> {detail}</li>)}
      </ul>
    </>
  );
}
