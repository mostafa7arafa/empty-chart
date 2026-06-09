"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { reviews } from "@/lib/data";

export function CustomerReviews() {
  return (
    <section className="py-20 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">What Our Customers Say</h2>
          <p className="text-[var(--muted-foreground)]">Real experiences from verified buyers</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[var(--card)] rounded-3xl p-6 border border-[var(--border)] hover:shadow-lg transition-shadow"
            >
              <Quote className="w-8 h-8 text-electric/30 mb-4" />
              <p className="text-sm leading-relaxed mb-4 line-clamp-4">{review.text}</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${idx < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src={review.avatar} alt={review.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{review.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{review.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
