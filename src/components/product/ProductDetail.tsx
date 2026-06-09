"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingCart, Minus, Plus, Share2, Shield, Truck, RotateCcw, ChevronRight, ThumbsUp } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { ProductCard } from "@/components/ui/ProductCard";
import { formatPrice, calculateDiscount } from "@/lib/utils";

interface Review {
  id: string; rating: number; title: string | null; comment: string;
  userName: string; isVerified: boolean; helpful: number; createdAt: string; photos: string[];
}

interface ProductData {
  id: string; name: string; slug: string; description: string; sku: string;
  price: number; originalPrice: number | null;
  brand: { name: string; slug: string };
  category: { name: string; slug: string };
  images: { url: string; alt: string }[];
  variants: { id: string; name: string; value: string; price: number | null; stock: number }[];
  specs: { name: string; value: string }[];
  rating: number; reviewCount: number; stock: number;
  badge: string | null; warranty: string | null;
  reviews: Review[];
  questions: { id: string; question: string; answer: string | null; askedBy: string }[];
}

interface RelatedProduct {
  id: string; name: string; slug: string; price: number; originalPrice: number | null;
  image: string; brand: string; rating: number; reviewCount: number; badge: string | null; stock: number;
}

export function ProductDetail({ product, relatedProducts }: { product: ProductData; relatedProducts: RelatedProduct[] }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews" | "qa">("description");
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);
  const addToCart = useCartStore((s) => s.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice ? calculateDiscount(product.price, product.originalPrice) : 0;

  const currentPrice = selectedVariant
    ? product.variants.find((v) => v.id === selectedVariant)?.price ?? product.price
    : product.price;

  const variantGroups = product.variants.reduce<Record<string, typeof product.variants>>((acc, v) => {
    if (!acc[v.name]) acc[v.name] = [];
    acc[v.name].push(v);
    return acc;
  }, {});

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      productId: product.id,
      name: product.name,
      price: currentPrice,
      originalPrice: product.originalPrice ?? undefined,
      image: product.images[0]?.url ?? "",
      slug: product.slug,
      stock: product.stock,
      variant: selectedVariant ? product.variants.find((v) => v.id === selectedVariant)?.value : undefined,
      quantity,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-6">
        <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/products" className="hover:text-[var(--foreground)]">Products</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/categories/${product.category.slug}`} className="hover:text-[var(--foreground)]">{product.category.name}</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-[var(--foreground)] font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--secondary)] mb-4">
            {product.images[selectedImage] && (
              <Image src={product.images[selectedImage].url} alt={product.images[selectedImage].alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
            )}
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-semibold bg-gold-500 text-navy-900">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm font-semibold bg-red-500 text-white">
                -{discount}%
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setSelectedImage(i)} className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 ${i === selectedImage ? "border-gold-500" : "border-transparent"}`}>
                  <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-2">
            <Link href={`/products?brand=${product.brand.slug}`} className="hover:text-gold-500">{product.brand.name}</Link>
            <span>|</span>
            <span>SKU: {product.sku}</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-3">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "fill-gold-500 text-gold-500" : "text-gray-300"}`} />)}</div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-[var(--muted-foreground)]">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">{formatPrice(currentPrice)}</span>
            {product.originalPrice && <span className="text-lg text-[var(--muted-foreground)] line-through">{formatPrice(product.originalPrice)}</span>}
            {discount > 0 && <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-sm font-medium">Save {formatPrice(product.originalPrice! - product.price)}</span>}
          </div>

          {/* Variants */}
          {Object.entries(variantGroups).map(([name, variants]) => (
            <div key={name} className="mb-4">
              <h3 className="text-sm font-medium mb-2">{name}</h3>
              <div className="flex flex-wrap gap-2">
                {variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v.id === selectedVariant ? null : v.id)}
                    className={`px-4 py-2 rounded-xl border text-sm font-medium transition-all ${
                      v.id === selectedVariant
                        ? "border-gold-500 bg-gold-500/10 text-gold-600"
                        : "border-[var(--border)] hover:border-gold-500"
                    } ${v.stock === 0 ? "opacity-50 line-through" : ""}`}
                    disabled={v.stock === 0}
                  >
                    {v.value} {v.price && `- ${formatPrice(v.price)}`}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity & Actions */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-[var(--border)] rounded-xl">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-[var(--secondary)] rounded-l-xl"><Minus className="w-4 h-4" /></button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-3 hover:bg-[var(--secondary)] rounded-r-xl"><Plus className="w-4 h-4" /></button>
            </div>
            <span className="text-sm text-[var(--muted-foreground)]">{product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}</span>
          </div>

          <div className="flex gap-3 mb-6">
            <button onClick={handleAddToCart} disabled={product.stock === 0} className="flex-1 flex items-center justify-center gap-2 h-12 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
            <button
              onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist({ productId: product.id, name: product.name, price: product.price, originalPrice: product.originalPrice ?? undefined, image: product.images[0]?.url ?? "", slug: product.slug, brand: product.brand.name, rating: product.rating })}
              className={`h-12 w-12 flex items-center justify-center rounded-xl border ${inWishlist ? "bg-red-50 border-red-200 text-red-500" : "border-[var(--border)] hover:bg-[var(--secondary)]"}`}
            >
              <Heart className={`w-5 h-5 ${inWishlist ? "fill-red-500" : ""}`} />
            </button>
            <button className="h-12 w-12 flex items-center justify-center rounded-xl border border-[var(--border)] hover:bg-[var(--secondary)]">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Trust */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-[var(--secondary)] rounded-2xl">
            {[
              { icon: Truck, label: "Free Delivery", desc: "On orders over EGP 500" },
              { icon: Shield, label: product.warranty ?? "Warranty", desc: "Manufacturer warranty" },
              { icon: RotateCcw, label: "Easy Returns", desc: "14-day return policy" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <item.icon className="w-5 h-5 text-gold-500 mx-auto mb-1" />
                <p className="text-xs font-medium">{item.label}</p>
                <p className="text-[10px] text-[var(--muted-foreground)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-12">
        <div className="flex border-b border-[var(--border)] mb-6 overflow-x-auto scrollbar-hide">
          {(["description", "specs", "reviews", "qa"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab ? "border-gold-500 text-gold-500" : "border-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {tab === "description" ? "Description" : tab === "specs" ? "Specifications" : tab === "reviews" ? `Reviews (${product.reviewCount})` : "Q&A"}
            </button>
          ))}
        </div>

        {activeTab === "description" && (
          <div className="prose max-w-none text-[var(--foreground)]">
            <p className="text-[var(--muted-foreground)] whitespace-pre-wrap">{product.description}</p>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="max-w-2xl">
            {product.specs.map((spec, i) => (
              <div key={spec.name} className={`flex py-3 ${i < product.specs.length - 1 ? "border-b border-[var(--border)]" : ""}`}>
                <span className="w-1/3 text-sm text-[var(--muted-foreground)]">{spec.name}</span>
                <span className="w-2/3 text-sm font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            {/* Rating Summary */}
            <div className="flex items-center gap-8 mb-8 p-6 bg-[var(--secondary)] rounded-2xl">
              <div className="text-center">
                <p className="text-4xl font-bold">{product.rating}</p>
                <div className="flex gap-0.5 mt-1">{[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${s <= Math.round(product.rating) ? "fill-gold-500 text-gold-500" : "text-gray-300"}`} />)}</div>
                <p className="text-sm text-[var(--muted-foreground)] mt-1">{product.reviewCount} reviews</p>
              </div>
            </div>

            {/* Review List */}
            <div className="space-y-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="border-b border-[var(--border)] pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= review.rating ? "fill-gold-500 text-gold-500" : "text-gray-300"}`} />)}</div>
                      {review.isVerified && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>}
                    </div>
                    <span className="text-xs text-[var(--muted-foreground)]">{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                  {review.title && <h4 className="font-medium mb-1">{review.title}</h4>}
                  <p className="text-sm text-[var(--muted-foreground)] mb-2">{review.comment}</p>
                  {review.photos.length > 0 && (
                    <div className="flex gap-2 mb-2">
                      {review.photos.map((p, i) => (
                        <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image src={p} alt="Review photo" fill className="object-cover" sizes="64px" />
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-xs text-[var(--muted-foreground)]">
                    <span className="font-medium text-[var(--foreground)]">{review.userName}</span>
                    <button className="flex items-center gap-1 hover:text-gold-500"><ThumbsUp className="w-3 h-3" /> Helpful ({review.helpful})</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "qa" && (
          <div className="space-y-4">
            {product.questions.length === 0 ? (
              <p className="text-center py-8 text-[var(--muted-foreground)]">No questions yet. Be the first to ask!</p>
            ) : (
              product.questions.map((q) => (
                <div key={q.id} className="border border-[var(--border)] rounded-xl p-4">
                  <p className="font-medium text-sm">Q: {q.question}</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">Asked by {q.askedBy}</p>
                  {q.answer && <p className="text-sm mt-2 pl-4 border-l-2 border-gold-500">A: {q.answer}</p>}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
