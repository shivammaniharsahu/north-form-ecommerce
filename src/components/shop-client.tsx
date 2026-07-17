"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/types/commerce";

const categories = ["all", "bags", "footwear", "accessories", "technology", "apparel", "living"];

export function ShopClient({ products }: { products: Product[] }) {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("featured");

  const visible = useMemo(() => {
    const filtered = category === "all" ? [...products] : products.filter((product) => product.category === category);
    if (sort === "low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high") filtered.sort((a, b) => b.price - a.price);
    if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));
    return filtered;
  }, [category, sort, products]);

  return (
    <>
      <div className="shop-toolbar">
        <div className="filter-list" aria-label="Filter products">
          {categories.map((item) => (
            <button className={`filter-chip ${category === item ? "active" : ""}`} key={item} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
        <select className="sort-select" value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products">
          <option value="featured">Featured</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
          <option value="name">Name</option>
        </select>
      </div>
      <div className="product-grid shop-grid">
        {visible.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
      <p className="shop-count">Showing {visible.length} considered objects</p>
    </>
  );
}
