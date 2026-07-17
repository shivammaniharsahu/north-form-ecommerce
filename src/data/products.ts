import type { Product } from "@/types/commerce";

export const products: Product[] = [
  {
    id: "prod-carryall",
    slug: "solstice-carryall",
    name: "Solstice Carryall",
    category: "bags",
    collection: ["new-arrivals", "everyday-carry"],
    badge: "Bestseller",
    price: 6890,
    description: "A softly structured everyday bag with room for the essentials and the unexpected. Cut from supple full-grain leather with a cotton-twill interior.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=88",
    ],
    colors: [{ name: "Olive", value: "#596253" }, { name: "Cognac", value: "#8a4f32" }, { name: "Black", value: "#1e211f" }],
    details: ["Full-grain leather", "Cotton-twill lining", "Internal laptop sleeve", "38 × 30 × 14 cm"],
    featured: true,
  },
  {
    id: "prod-runner",
    slug: "forma-runner",
    name: "Forma Runner",
    category: "footwear",
    collection: ["new-arrivals", "wear"],
    badge: "New",
    price: 4990,
    description: "A low-profile everyday trainer balancing soft cushioning with a pared-back silhouette. Built for long city days.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=88",
    ],
    colors: [{ name: "Clay", value: "#a84c36" }, { name: "Chalk", value: "#d9d4c8" }, { name: "Ink", value: "#242624" }],
    details: ["Recycled mesh upper", "Natural rubber outsole", "Cork-blend footbed", "Fits true to size"],
    featured: true,
  },
  {
    id: "prod-watch",
    slug: "arc-dial-watch",
    name: "Arc Dial Watch",
    category: "accessories",
    collection: ["everyday-carry"],
    badge: "Limited",
    price: 12490,
    description: "A restrained 38 mm timepiece with a brushed steel case, domed mineral glass, and a vegetable-tanned leather strap.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=88",
    ],
    colors: [{ name: "Sand", value: "#bca47f" }, { name: "Forest", value: "#445548" }],
    details: ["38 mm brushed steel case", "Japanese quartz movement", "5 ATM water resistance", "Two-year warranty"],
    featured: true,
  },
  {
    id: "prod-headphones",
    slug: "cloudline-headphones",
    name: "Cloudline Headphones",
    category: "technology",
    collection: ["new-arrivals", "everyday-carry"],
    price: 8990,
    compareAtPrice: 10490,
    description: "Immersive sound without the visual noise. Soft-touch controls, focused listening, and 36 hours of battery life.",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=88",
    ],
    colors: [{ name: "Stone", value: "#b8b0a4" }, { name: "Graphite", value: "#353837" }],
    details: ["Adaptive noise cancellation", "36-hour battery", "USB-C fast charge", "Recycled aluminium frame"],
    featured: true,
  },
  {
    id: "prod-frames",
    slug: "meridian-frames",
    name: "Meridian Frames",
    category: "accessories",
    collection: ["wear", "new-arrivals"],
    badge: "New",
    price: 3290,
    description: "Lightweight frames shaped with a subtle architectural edge and fitted with full UV protection lenses.",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=88",
    ],
    colors: [{ name: "Tortoise", value: "#6a4d34" }, { name: "Black", value: "#252625" }],
    details: ["Plant-based acetate", "UV400 lenses", "Spring hinges", "Protective case included"],
  },
  {
    id: "prod-chair",
    slug: "terra-lounge-chair",
    name: "Terra Lounge Chair",
    category: "living",
    collection: ["living"],
    price: 28900,
    description: "An easy, grounded chair with a generous seat, tactile upholstery, and FSC-certified solid wood frame.",
    images: [
      "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=88",
    ],
    colors: [{ name: "Oak", value: "#ad8b62" }, { name: "Walnut", value: "#5c4335" }],
    details: ["FSC-certified solid wood", "Wool-blend upholstery", "Removable seat cushion", "Made to order in 3–4 weeks"],
  },
  {
    id: "prod-shirt",
    slug: "drift-linen-shirt",
    name: "Drift Linen Shirt",
    category: "apparel",
    collection: ["wear", "new-arrivals"],
    price: 3890,
    description: "A relaxed linen shirt washed for softness, with an easy collar and just enough structure for every day.",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=88",
    ],
    colors: [{ name: "White", value: "#eeeae0" }, { name: "Sky", value: "#95a7ad" }, { name: "Olive", value: "#6f7968" }],
    details: ["100% European flax linen", "Relaxed fit", "Shell buttons", "Machine washable"],
  },
  {
    id: "prod-vessel",
    slug: "ember-vessel",
    name: "Ember Vessel",
    category: "living",
    collection: ["living", "new-arrivals"],
    badge: "Small batch",
    price: 2190,
    description: "A hand-finished stoneware vessel with a quietly irregular surface. Equally at home holding stems or standing alone.",
    images: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=88",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=88",
    ],
    colors: [{ name: "Chalk", value: "#d7d0c2" }, { name: "Umber", value: "#6e5545" }],
    details: ["Wheel-thrown stoneware", "Food-safe glaze", "Hand finished", "Approx. 24 cm high"],
  },
];

export const featuredProducts = products.filter((product) => product.featured);

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getCollection(slug: string) {
  return products.filter((product) => product.collection.includes(slug));
}
