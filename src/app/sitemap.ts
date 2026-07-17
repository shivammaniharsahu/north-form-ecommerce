import type { MetadataRoute } from "next";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://north-and-form.example";
  return [
    { url: base, priority: 1, changeFrequency: "weekly" },
    { url: `${base}/shop`, priority: 0.9, changeFrequency: "daily" },
    ...products.map((product) => ({ url: `${base}/products/${product.slug}`, priority: 0.8, changeFrequency: "weekly" as const })),
  ];
}
