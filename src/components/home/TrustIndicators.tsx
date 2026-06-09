"use client";

import { motion } from "framer-motion";
import { Shield, Truck, CreditCard, RotateCcw, BadgeCheck, Percent } from "lucide-react";

const indicators = [
  { icon: Shield, label: "Official Warranty", desc: "100% genuine products" },
  { icon: Truck, label: "Nationwide Delivery", desc: "All 27 governorates" },
  { icon: CreditCard, label: "Secure Payments", desc: "SSL encrypted" },
  { icon: Percent, label: "Installment Plans", desc: "Up to 36 months" },
  { icon: RotateCcw, label: "Easy Returns", desc: "14-day guarantee" },
  { icon: BadgeCheck, label: "Verified Products", desc: "Authorized dealer" },
];

export function TrustIndicators() {
  return (
    <section className="py-8 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {indicators.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-[var(--muted)] transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-electric/10 flex items-center justify-center mb-3 group-hover:bg-electric/20 transition-colors">
                <item.icon className="w-6 h-6 text-electric" />
              </div>
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
