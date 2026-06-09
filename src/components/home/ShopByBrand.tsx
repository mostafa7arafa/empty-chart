"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { brands } from "@/lib/data";

export function ShopByBrand() {
  return (
    <section className="py-20 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Shop by Brand</h2>
          <p className="text-[var(--muted-foreground)]">Authorized dealer for leading global brands</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/products?brand=${brand.id}`}
                className="group flex flex-col items-center justify-center p-6 md:p-8 bg-[var(--card)] rounded-2xl border border-[var(--border)] hover:shadow-lg hover:border-electric/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[var(--muted)] flex items-center justify-center mb-3 group-hover:bg-electric/10 transition-colors grayscale group-hover:grayscale-0">
                  <span className="text-2xl md:text-3xl font-bold text-[var(--muted-foreground)] group-hover:text-electric transition-colors">
                    {brand.name.slice(0, 2)}
                  </span>
                </div>
                <span className="text-sm font-medium text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                  {brand.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
