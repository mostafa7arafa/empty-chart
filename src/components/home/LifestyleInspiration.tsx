"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { lifestyleArticles } from "@/lib/data";

export function LifestyleInspiration() {
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
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Lifestyle & Inspiration</h2>
            <p className="text-[var(--muted-foreground)]">Expert guides to help you make the right choice</p>
          </div>
          <Link href="#" className="hidden md:flex items-center gap-2 text-electric font-medium hover:gap-3 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {lifestyleArticles.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Link href="#" className="block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 dark:bg-black/70 backdrop-blur-sm rounded-full text-xs font-medium">
                    {article.category}
                  </div>
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-electric transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mb-2">
                  {article.excerpt}
                </p>
                <span className="text-xs text-[var(--muted-foreground)]">{article.readTime}</span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
