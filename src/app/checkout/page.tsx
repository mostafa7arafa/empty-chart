"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/stores/cart-store";
import { formatPrice } from "@/lib/utils";
import { Check, ChevronRight, MapPin, Truck, CreditCard, ShoppingBag } from "lucide-react";

const steps = [
  { id: 1, label: "Address", icon: MapPin },
  { id: 2, label: "Shipping", icon: Truck },
  { id: 3, label: "Payment", icon: CreditCard },
  { id: 4, label: "Review", icon: Check },
];

export default function CheckoutPage() {
  const { items, getSubtotal, getTotal } = useCartStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", phone: "", address: "", city: "", state: "", zip: "",
    shippingMethod: "standard", paymentMethod: "cod",
  });

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 text-[var(--muted-foreground)] mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <Link href="/products" className="text-gold-500 hover:underline">Continue Shopping</Link>
      </div>
    );
  }

  const updateField = (key: string, value: string) => setFormData((f) => ({ ...f, [key]: value }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <button
              onClick={() => step > s.id && setStep(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                step === s.id ? "bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900" :
                step > s.id ? "bg-green-100 text-green-700" :
                "bg-[var(--secondary)] text-[var(--muted-foreground)]"
              }`}
            >
              {step > s.id ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < steps.length - 1 && <ChevronRight className="w-4 h-4 mx-2 text-[var(--muted-foreground)]" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Delivery Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "firstName", label: "First Name", type: "text" },
                  { key: "lastName", label: "Last Name", type: "text" },
                  { key: "email", label: "Email", type: "email" },
                  { key: "phone", label: "Phone", type: "tel" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium mb-1">{f.label}</label>
                    <input
                      type={f.type}
                      value={formData[f.key as keyof typeof formData]}
                      onChange={(e) => updateField(f.key, e.target.value)}
                      className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]"
                  />
                </div>
                {[
                  { key: "city", label: "City" },
                  { key: "state", label: "State/Province" },
                  { key: "zip", label: "ZIP Code" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium mb-1">{f.label}</label>
                    <input
                      type="text"
                      value={formData[f.key as keyof typeof formData]}
                      onChange={(e) => updateField(f.key, e.target.value)}
                      className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]"
                    />
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="mt-6 w-full h-12 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-semibold hover:opacity-90">
                Continue to Shipping
              </button>
            </div>
          )}

          {/* Step 2: Shipping */}
          {step === 2 && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Shipping Method</h2>
              <div className="space-y-3">
                {[
                  { id: "standard", label: "Standard Shipping", desc: "5-7 business days", price: "Free" },
                  { id: "express", label: "Express Shipping", desc: "2-3 business days", price: "EGP 50" },
                  { id: "sameday", label: "Same Day (Cairo only)", desc: "Today", price: "EGP 100" },
                ].map((m) => (
                  <label key={m.id} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${formData.shippingMethod === m.id ? "border-gold-500 bg-gold-500/5" : "border-[var(--border)]"}`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="shipping" value={m.id} checked={formData.shippingMethod === m.id} onChange={() => updateField("shippingMethod", m.id)} className="accent-gold-500" />
                      <div>
                        <p className="font-medium text-sm">{m.label}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{m.desc}</p>
                      </div>
                    </div>
                    <span className="font-medium text-sm">{m.price}</span>
                  </label>
                ))}
              </div>
              <button onClick={() => setStep(3)} className="mt-6 w-full h-12 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-semibold hover:opacity-90">
                Continue to Payment
              </button>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { id: "cod", label: "Cash on Delivery", desc: "Pay when you receive your order" },
                  { id: "card", label: "Credit/Debit Card", desc: "Visa, Mastercard, etc." },
                  { id: "wallet", label: "Mobile Wallet", desc: "Vodafone Cash, Fawry, etc." },
                ].map((m) => (
                  <label key={m.id} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === m.id ? "border-gold-500 bg-gold-500/5" : "border-[var(--border)]"}`}>
                    <input type="radio" name="payment" value={m.id} checked={formData.paymentMethod === m.id} onChange={() => updateField("paymentMethod", m.id)} className="accent-gold-500" />
                    <div>
                      <p className="font-medium text-sm">{m.label}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <button onClick={() => setStep(4)} className="mt-6 w-full h-12 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-semibold hover:opacity-90">
                Review Order
              </button>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Review Your Order</h2>
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-[var(--secondary)] rounded-xl">
                  <h3 className="font-medium text-sm mb-1">Delivery Address</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{formData.firstName} {formData.lastName}, {formData.address}, {formData.city} {formData.zip}</p>
                </div>
                <div className="p-4 bg-[var(--secondary)] rounded-xl">
                  <h3 className="font-medium text-sm mb-1">Shipping</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{formData.shippingMethod === "standard" ? "Standard (5-7 days)" : formData.shippingMethod === "express" ? "Express (2-3 days)" : "Same Day"}</p>
                </div>
                <div className="p-4 bg-[var(--secondary)] rounded-xl">
                  <h3 className="font-medium text-sm mb-1">Payment</h3>
                  <p className="text-sm text-[var(--muted-foreground)]">{formData.paymentMethod === "cod" ? "Cash on Delivery" : formData.paymentMethod === "card" ? "Credit/Debit Card" : "Mobile Wallet"}</p>
                </div>
              </div>
              <div className="space-y-2 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 py-2">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[var(--secondary)] shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-sm">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <Link href="/checkout/success" className="block w-full h-12 bg-gold-500 text-navy-900 rounded-xl font-bold text-center leading-[3rem] hover:bg-gold-400 transition-colors">
                Place Order — {formatPrice(getTotal())}
              </Link>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-[var(--muted-foreground)] truncate mr-2">{item.name} x{item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm border-t border-[var(--border)] pt-4">
            <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Subtotal</span><span>{formatPrice(getSubtotal())}</span></div>
            <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Shipping</span><span className="text-green-600">Free</span></div>
            <div className="flex justify-between font-bold text-lg border-t border-[var(--border)] pt-2">
              <span>Total</span><span>{formatPrice(getTotal())}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
