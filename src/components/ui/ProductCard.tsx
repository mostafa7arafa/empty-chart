"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { formatPrice, calculateDiscount } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  brand: string;
  rating: number;
  reviewCount: number;
  badge?: string | null;
  stock: number;
  listView?: boolean;
}

export function ProductCard({
  id, name, slug, price, originalPrice, image, brand, rating, reviewCount, badge, stock, listView,
}: ProductCardProps) {
  const addToCart = useCartStore((s) => s.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(id);
  const discount = originalPrice ? calculateDiscount(price, originalPrice) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, productId: id, name, price, originalPrice: originalPrice ?? undefined, image, slug, stock });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ productId: id, name, price, originalPrice: originalPrice ?? undefined, image, slug, brand, rating });
    }
  };

  if (listView) {
    return (
      <Link href={`/products/${slug}`} className="group flex gap-4 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4 hover:shadow-lg transition-all">
        <div className="relative w-40 h-40 shrink-0 rounded-xl overflow-hidden bg-[var(--secondary)]">
          <Image src={image} alt={name} fill className="object-cover group-hover:scale-105 transition-transform" sizes="160px" />
          {badge && (
            <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium ${
              badge === "Best Seller" ? "bg-gold-500 text-navy-900" :
              badge === "New" ? "bg-green-500 text-white" :
              badge === "Sale" || badge === "Deal" ? "bg-red-500 text-white" :
              "bg-navy-900 text-white"
            }`}>{badge}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[var(--muted-foreground)]">{brand}</p>
          <h3 className="font-medium text-sm mt-1 line-clamp-2 group-hover:text-gold-500 transition-colors">{name}</h3>
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-3 h-3 fill-gold-500 text-gold-500" />
            <span className="text-xs font-medium">{rating}</span>
            <span className="text-xs text-[var(--muted-foreground)]">({reviewCount})</span>
          </div>
          <div className="mt-2">
            <span className="font-bold text-lg">{formatPrice(price)}</span>
            {originalPrice && (
              <>
                <span className="text-sm text-[var(--muted-foreground)] line-through ml-2">{formatPrice(originalPrice)}</span>
                <span className="text-xs text-red-500 font-medium ml-2">-{discount}%</span>
              </>
            )}
          </div>
          <div className="flex gap-2 mt-3">
            <button onClick={handleAddToCart} className="flex items-center gap-1 px-4 py-2 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </button>
            <button onClick={handleToggleWishlist} className={`p-2 rounded-xl border ${inWishlist ? "bg-red-50 border-red-200 text-red-500" : "border-[var(--border)] hover:bg-[var(--secondary)]"}`}>
              <Heart className={`w-4 h-4 ${inWishlist ? "fill-red-500" : ""}`} />
            </button>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/products/${slug}`} className="group bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden hover:shadow-xl transition-all">
      <div className="relative aspect-square bg-[var(--secondary)] overflow-hidden">
        <Image src={image} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
        {badge && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
            badge === "Best Seller" ? "bg-gold-500 text-navy-900" :
            badge === "New" ? "bg-green-500 text-white" :
            badge === "Sale" || badge === "Deal" ? "bg-red-500 text-white" :
            badge === "Premium" ? "bg-purple-500 text-white" :
            badge === "Low Stock" ? "bg-orange-500 text-white" :
            "bg-navy-900 text-white"
          }`}>{badge}{discount > 0 && badge === "Sale" ? ` -${discount}%` : ""}</span>
        )}
        {discount > 0 && badge !== "Sale" && badge !== "Deal" && (
          <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500 text-white">-{discount}%</span>
        )}
        {stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-black px-4 py-2 rounded-full font-medium text-sm">Out of Stock</span>
          </div>
        )}
        {stock > 0 && stock <= 5 && (
          <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Only {stock} left</span>
        )}
        {/* Hover actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button onClick={handleToggleWishlist} className={`p-2.5 rounded-full shadow-lg transition-all ${inWishlist ? "bg-red-500 text-white" : "bg-white text-navy-900 hover:bg-gold-500"}`}>
            <Heart className={`w-4 h-4 ${inWishlist ? "fill-white" : ""}`} />
          </button>
          <button className="p-2.5 bg-white text-navy-900 rounded-full shadow-lg hover:bg-gold-500 transition-all">
            <Eye className="w-4 h-4" />
          </button>
          <button onClick={handleAddToCart} className="p-2.5 bg-white text-navy-900 rounded-full shadow-lg hover:bg-gold-500 transition-all">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wide">{brand}</p>
        <h3 className="font-medium text-sm mt-1 line-clamp-2 min-h-[2.5rem] group-hover:text-gold-500 transition-colors">{name}</h3>
        <div className="flex items-center gap-1 mt-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className={`w-3 h-3 ${star <= Math.round(rating) ? "fill-gold-500 text-gold-500" : "text-gray-300"}`} />
            ))}
          </div>
          <span className="text-xs text-[var(--muted-foreground)]">({reviewCount})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold text-lg">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-sm text-[var(--muted-foreground)] line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
