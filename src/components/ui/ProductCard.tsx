"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { formatPrice, calculateInstallment } from "@/lib/utils";
import type { Product } from "@/lib/data";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group relative bg-[var(--card)] rounded-3xl border border-[var(--border)] overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-electric text-white text-xs font-bold rounded-full">
          {product.badge}
        </div>
      )}

      {/* Wishlist */}
      <button className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110">
        <Heart className="w-4 h-4" />
      </button>

      {/* Image */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-square relative overflow-hidden bg-[var(--muted)] p-6">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discount > 0 && (
            <div className="absolute bottom-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg">
              -{discount}%
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-5">
        <p className="text-xs text-electric font-medium mb-1">{product.brand}</p>
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-sm leading-snug mb-2 line-clamp-2 group-hover:text-electric transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-xs text-[var(--muted-foreground)]">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-electric">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-xs text-[var(--muted-foreground)] line-through">
                {formatPrice(product.originalPrice)}
              </p>
            )}
            {product.installment && (
              <p className="text-xs text-success mt-1">
                or {calculateInstallment(product.price, product.installment)}/mo
              </p>
            )}
          </div>
          <button className="w-10 h-10 bg-electric/10 hover:bg-electric hover:text-white text-electric rounded-xl flex items-center justify-center transition-all hover:scale-110">
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
