"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { bestSellers } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";

export function BestSellers() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Best Sellers</h2>
            <p className="text-[var(--muted-foreground)]">Our most popular products loved by customers</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 text-electric font-medium hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bestSellers.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
