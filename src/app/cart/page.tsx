"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTotal, couponCode, discount } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-[var(--muted-foreground)] mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-[var(--muted-foreground)] mb-6">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-semibold hover:opacity-90">
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart ({items.length} items)</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 bg-[var(--card)] border border-[var(--border)] rounded-2xl">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-[var(--secondary)] shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between">
                  <div>
                    <Link href={`/products/${item.slug}`} className="font-medium text-sm hover:text-gold-500 line-clamp-2">{item.name}</Link>
                    {item.variant && <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{item.variant}</p>}
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-[var(--muted-foreground)] hover:text-red-500 p-1"><X className="w-4 h-4" /></button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-[var(--border)] rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-[var(--secondary)]"><Minus className="w-3 h-3" /></button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-[var(--secondary)]"><Plus className="w-3 h-3" /></button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                    {item.originalPrice && <p className="text-xs text-[var(--muted-foreground)] line-through">{formatPrice(item.originalPrice * item.quantity)}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Subtotal</span><span>{formatPrice(getSubtotal())}</span></div>
            {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-{formatPrice(discount)}</span></div>}
            <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Shipping</span><span className="text-green-600">Free</span></div>
            <div className="border-t border-[var(--border)] pt-3 flex justify-between font-bold text-lg">
              <span>Total</span><span>{formatPrice(getTotal())}</span>
            </div>
          </div>

          {/* Coupon */}
          <div className="mt-4">
            <div className="flex gap-2">
              <input type="text" placeholder="Coupon code" defaultValue={couponCode ?? ""} className="flex-1 h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
              <button className="px-4 h-10 bg-[var(--secondary)] rounded-xl text-sm font-medium hover:bg-[var(--border)]">Apply</button>
            </div>
          </div>

          <Link href="/checkout" className="w-full flex items-center justify-center gap-2 h-12 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-semibold hover:opacity-90 transition-opacity mt-4">
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/products" className="w-full flex items-center justify-center gap-2 h-10 mt-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
