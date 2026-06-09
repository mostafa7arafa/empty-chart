"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { bestSellers } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";

export function AIRecommendations() {
  const recommended = bestSellers.slice(0, 4);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric to-purple-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold">Recommended For Your Home</h2>
              <p className="text-[var(--muted-foreground)]">Curated picks based on popular choices and seasonal trends</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {recommended.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
