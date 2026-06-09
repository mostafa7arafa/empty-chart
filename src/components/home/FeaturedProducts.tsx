"use client";

import { ProductCard } from "@/components/ui/ProductCard";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number | null;
  image: string;
  brand: string;
  rating: number;
  reviewCount: number;
  badge: string | null;
  stock: number;
}

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p.id} {...p} />
      ))}
    </div>
  );
}
