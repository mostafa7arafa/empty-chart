"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [tracked, setTracked] = useState(false);

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Track Your Order</h1>
        <p className="text-[var(--muted-foreground)]">Enter your order number and email to check the status</p>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 mb-8">
        <form onSubmit={(e) => { e.preventDefault(); setTracked(true); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Order Number</label>
            <input type="text" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} placeholder="EC-XXXXX" className="w-full h-11 px-4 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full h-11 px-4 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" required />
          </div>
          <button type="submit" className="w-full h-11 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-semibold hover:opacity-90 flex items-center justify-center gap-2">
            <Search className="w-4 h-4" /> Track Order
          </button>
        </form>
      </div>

      {tracked && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-6 h-6 text-gold-500" />
            <div>
              <p className="font-bold">Order #{orderNumber || "EC-DEMO123"}</p>
              <p className="text-sm text-[var(--muted-foreground)]">Estimated delivery: 3-5 business days</p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              { icon: CheckCircle, label: "Order Placed", date: "Jun 8, 2025 - 10:30 AM", done: true },
              { icon: CheckCircle, label: "Order Confirmed", date: "Jun 8, 2025 - 11:00 AM", done: true },
              { icon: Truck, label: "Shipped", date: "Jun 9, 2025 - 2:00 PM", done: true },
              { icon: Clock, label: "Out for Delivery", date: "Expected today", done: false },
              { icon: Package, label: "Delivered", date: "", done: false },
            ].map((step, i) => (
              <div key={step.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <step.icon className={`w-6 h-6 ${step.done ? "text-green-500" : "text-gray-300"}`} />
                  {i < 4 && <div className={`w-0.5 h-8 ${step.done ? "bg-green-500" : "bg-gray-200"}`} />}
                </div>
                <div className="pb-4">
                  <p className={`font-medium text-sm ${step.done ? "" : "text-[var(--muted-foreground)]"}`}>{step.label}</p>
                  {step.date && <p className="text-xs text-[var(--muted-foreground)]">{step.date}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
