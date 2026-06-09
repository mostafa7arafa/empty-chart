"use client";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addToCart = useCartStore((s) => s.addItem);

  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-[var(--card)] border border-[var(--border)] rounded-2xl">
        <Heart className="w-12 h-12 text-[var(--muted-foreground)] mx-auto mb-3" />
        <p className="font-medium mb-1">Your wishlist is empty</p>
        <Link href="/products" className="text-sm text-gold-500 hover:underline">Browse Products</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">Wishlist ({items.length})</h2>
        <button onClick={clearWishlist} className="text-sm text-red-500 hover:underline">Clear All</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.productId} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 flex gap-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[var(--secondary)] shrink-0">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/products/${item.slug}`} className="font-medium text-sm hover:text-gold-500 line-clamp-1">{item.name}</Link>
              <p className="font-bold text-sm mt-1">{formatPrice(item.price)}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => { addToCart({ id: item.productId, productId: item.productId, name: item.name, price: item.price, image: item.image, slug: item.slug, stock: 99, quantity: 1 }); removeItem(item.productId); }}
                  className="flex items-center gap-1 text-xs px-3 py-1.5 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-lg font-medium"
                >
                  <ShoppingCart className="w-3 h-3" /> Add to Cart
                </button>
                <button onClick={() => removeItem(item.productId)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
