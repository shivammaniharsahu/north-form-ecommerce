import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getCollection } from "@/data/products";

const names: Record<string, { title: string; description: string }> = {
  "new-arrivals": { title: "New arrivals", description: "Fresh forms selected for the season ahead." },
  "everyday-carry": { title: "Everyday carry", description: "Objects that make leaving home feel effortless." },
  wear: { title: "Wear", description: "Easy pieces with quiet character." },
  living: { title: "Living", description: "Grounded forms for a calmer home." },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return { title: names[slug]?.title ?? "Collection" };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = names[slug];
  if (!collection) notFound();
  const items = getCollection(slug);
  return (
    <main>
      <header className="page-hero container"><p className="eyebrow">Collection · {items.length} objects</p><h1>{collection.title}.</h1><p>{collection.description}</p></header>
      <section className="section container"><div className="product-grid shop-grid">{items.map((product) => <ProductCard key={product.id} product={product} />)}</div></section>
    </main>
  );
}
