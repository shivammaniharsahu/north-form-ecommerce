import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductActions } from "@/components/product-actions";
import { ProductCard } from "@/components/product-card";
import { formatCurrency } from "@/lib/format";
import { getProduct, products } from "@/data/products";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return product ? { title: product.name, description: product.description } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.id !== product.id && (item.category === product.category || item.collection.some((collection) => product.collection.includes(collection)))).slice(0, 3);

  return (
    <main>
      <section className="product-detail container">
        <div className="product-gallery">
          {product.images.map((image, index) => <div className="product-gallery-item" key={image}><Image src={image} alt={`${product.name}${index ? ` view ${index + 1}` : ""}`} fill priority={index === 0} sizes="(max-width: 800px) 100vw, 55vw" /></div>)}
        </div>
        <div className="product-info">
          <p className="breadcrumbs"><Link href="/shop">Shop</Link> / {product.category}</p>
          {product.badge && <p className="eyebrow">{product.badge}</p>}
          <h1>{product.name}</h1>
          <p className="detail-price">{formatCurrency(product.price)} {product.compareAtPrice && <span className="compare-price">{formatCurrency(product.compareAtPrice)}</span>}</p>
          <p className="detail-description">{product.description}</p>
          <ProductActions product={product} />
        </div>
      </section>
      <section className="section container">
        <div className="section-heading"><p className="eyebrow">You may also like</p><h2>In good company.</h2></div>
        <div className="product-grid shop-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div>
      </section>
    </main>
  );
}
