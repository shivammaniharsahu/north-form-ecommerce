export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  collection: string[];
  badge?: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  images: [string, string, ...string[]];
  colors: { name: string; value: string }[];
  details: string[];
  featured?: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
