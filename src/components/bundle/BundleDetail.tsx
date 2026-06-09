"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Package } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice, calculateDiscount } from "@/lib/utils";

interface BundleData {
  id: string; name: string; slug: string; description: string;
  price: number; originalPrice: number;
  items: { id: string; quantity: number; product: { id: string; name: string; slug: string; price: number; brand: string; image: string } }[];
}

export function BundleDetail({ bundle }: { bundle: BundleData }) {
  const addToCart = useCartStore((s) => s.addItem);
  const discount = calculateDiscount(bundle.price, bundle.originalPrice);

  const handleAddBundle = () => {
    bundle.items.forEach((item) => {
      addToCart({
        id: item.product.id, productId: item.product.id, name: item.product.name, price: item.product.price,
        image: item.product.image, slug: item.product.slug, stock: 99, quantity: item.quantity,
      });
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-navy-900 to-navy-700 rounded-3xl p-8 text-white mb-8">
        <div className="flex items-center gap-2 mb-2"><Package className="w-5 h-5 text-gold-500" /> <span className="text-sm text-gold-500 font-medium">Bundle Deal</span></div>
        <h1 className="text-3xl font-bold mb-2">{bundle.name}</h1>
        <p className="text-white/70 mb-6">{bundle.description}</p>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-bold text-gold-500">{formatPrice(bundle.price)}</span>
          <span className="text-xl text-white/50 line-through">{formatPrice(bundle.originalPrice)}</span>
          <span className="px-3 py-1 bg-red-500 rounded-full text-sm font-bold">Save {discount}%</span>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">{bundle.items.length} Items Included</h2>
      <div className="space-y-4 mb-8">
        {bundle.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-[var(--secondary)] shrink-0">
              <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="80px" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-[var(--muted-foreground)]">{item.product.brand}</p>
              <Link href={`/products/${item.product.slug}`} className="font-medium text-sm hover:text-gold-500">{item.product.name}</Link>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">{formatPrice(item.product.price)}</p>
          </div>
        ))}
      </div>

      <button onClick={handleAddBundle} className="w-full flex items-center justify-center gap-2 h-14 bg-gold-500 text-navy-900 rounded-2xl font-bold text-lg hover:bg-gold-400 transition-colors">
        <ShoppingCart className="w-5 h-5" /> Add Entire Bundle to Cart — {formatPrice(bundle.price)}
      </button>
    </div>
  );
}
