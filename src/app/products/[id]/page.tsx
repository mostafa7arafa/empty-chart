"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star, Heart, ShoppingCart, Truck, Shield, RotateCcw,
  Minus, Plus, ChevronRight, Share2
} from "lucide-react";
import { productDetails, bestSellers } from "@/lib/data";
import { formatPrice, calculateInstallment } from "@/lib/utils";
import { ProductCard } from "@/components/ui/ProductCard";

export default function ProductPage() {
  const product = productDetails;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "reviews" | "faq">("specs");

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--muted-foreground)] mb-6 flex items-center gap-1">
        <Link href="/" className="hover:text-electric">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/products" className="hover:text-electric">Products</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[var(--foreground)] font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="sticky top-32">
            <div className="aspect-square relative rounded-3xl overflow-hidden bg-[var(--muted)] mb-4">
              <Image
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1.5 bg-electric text-white text-sm font-bold rounded-full">
                  {product.badge}
                </div>
              )}
              {discount > 0 && (
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full">
                  -{discount}%
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square relative rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === i ? "border-electric" : "border-[var(--border)] hover:border-electric/50"}`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <p className="text-electric font-medium mb-1">{product.brand}</p>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">{product.name}</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-[var(--muted-foreground)]">({product.reviews} reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-[var(--muted)] rounded-2xl p-6">
            <div className="flex items-end gap-3 mb-2">
              <span className="text-3xl md:text-4xl font-bold text-electric">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-[var(--muted-foreground)] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            {product.installment && (
              <p className="text-success font-medium">
                or {calculateInstallment(product.price, product.installment)}/month for {product.installment} months
              </p>
            )}
            <p className="text-xs text-[var(--muted-foreground)] mt-1">Inclusive of VAT</p>
          </div>

          {/* Description */}
          <p className="text-[var(--muted-foreground)] leading-relaxed">{product.description}</p>

          {/* Quantity & Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-[var(--border)] rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-[var(--muted)] transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-5 py-3 font-medium text-center min-w-[3rem]">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-[var(--muted)] transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-electric hover:bg-electric-light text-white rounded-2xl font-semibold transition-all hover:shadow-lg hover:shadow-electric/30">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button className="w-14 h-14 border border-[var(--border)] rounded-2xl flex items-center justify-center hover:bg-[var(--muted)] transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="w-14 h-14 border border-[var(--border)] rounded-2xl flex items-center justify-center hover:bg-[var(--muted)] transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Truck, label: "Free Delivery", desc: "2-4 business days" },
              { icon: Shield, label: "2 Year Warranty", desc: "Official Samsung" },
              { icon: RotateCcw, label: "Easy Returns", desc: "14-day policy" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center text-center p-3 bg-[var(--muted)] rounded-xl">
                <item.icon className="w-5 h-5 text-electric mb-1" />
                <p className="text-xs font-semibold">{item.label}</p>
                <p className="text-[10px] text-[var(--muted-foreground)]">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-t border-[var(--border)] pt-6">
            <div className="flex gap-1 mb-6 bg-[var(--muted)] rounded-xl p-1">
              {(["specs", "reviews", "faq"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all capitalize ${
                    activeTab === tab ? "bg-[var(--card)] shadow-sm" : "hover:bg-[var(--card)]/50"
                  }`}
                >
                  {tab === "specs" ? "Specifications" : tab === "reviews" ? `Reviews (${product.reviews})` : "FAQs"}
                </button>
              ))}
            </div>

            {activeTab === "specs" && product.specs && (
              <div className="space-y-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-[var(--border)] last:border-0">
                    <span className="text-sm text-[var(--muted-foreground)]">{key}</span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="text-center py-8">
                  <p className="text-4xl font-bold mb-1">{product.rating}</p>
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)]">Based on {product.reviews} reviews</p>
                </div>
              </div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-4">
                {[
                  { q: "What is included in the box?", a: "TV unit, remote control, power cable, user manual, and wall mount screws." },
                  { q: "Does this TV support HDR?", a: "Yes, it supports HDR10+ for enhanced contrast and color accuracy." },
                  { q: "Can I mount it on the wall?", a: "Yes, it's VESA compatible (200x200mm). Wall mount bracket sold separately." },
                ].map((faq) => (
                  <details key={faq.q} className="group border border-[var(--border)] rounded-xl">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-sm">
                      {faq.q}
                      <ChevronRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="px-4 pb-4 text-sm text-[var(--muted-foreground)]">{faq.a}</p>
                  </details>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      <section className="mt-20">
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
