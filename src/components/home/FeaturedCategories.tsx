"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/data";
import { ArrowRight } from "lucide-react";

export function FeaturedCategories() {
  return (
    <section id="categories" className="py-20 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Shop by Category</h2>
            <p className="text-[var(--muted-foreground)]">Browse our carefully curated collections</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 text-electric font-medium hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/products?category=${cat.id}`}
                className="group relative block overflow-hidden rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <span className="text-2xl md:text-3xl mb-1 block">{cat.icon}</span>
                  <h3 className="text-white font-bold text-sm md:text-base">{cat.name}</h3>
                  <p className="text-white/70 text-xs mt-0.5">{cat.productCount} products</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
