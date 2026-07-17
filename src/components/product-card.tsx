"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types/commerce";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addItem } = useCart();

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
          <Image className="product-image product-image-primary" src={product.images[0]} alt={product.name} fill priority={priority} sizes="(max-width: 520px) 100vw, (max-width: 1050px) 50vw, 25vw" />
          <Image className="product-image product-image-secondary" src={product.images[1]} alt="" fill sizes="(max-width: 520px) 100vw, (max-width: 1050px) 50vw, 25vw" />
        </Link>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className="quick-add" onClick={() => addItem(product)} aria-label={`Quick add ${product.name}`} title="Quick add"><Plus size={19} /></button>
      </div>
      <div className="product-meta">
        <div>
          <Link href={`/products/${product.slug}`}><h3 className="product-name">{product.name}</h3></Link>
          <p className="product-category">{product.category}</p>
        </div>
        <p className="product-price">
          {formatCurrency(product.price)}
          {product.compareAtPrice && <span className="compare-price">{formatCurrency(product.compareAtPrice)}</span>}
        </p>
      </div>
    </article>
  );
}
