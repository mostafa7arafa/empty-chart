"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { promotions } from "@/lib/data";

export function Promotions() {
  return (
    <section className="py-20 bg-[var(--muted)]">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Special Promotions</h2>
          <p className="text-[var(--muted-foreground)]">Limited-time offers you don&apos;t want to miss</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {promotions.map((promo, i) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href="#"
                className="group relative block overflow-hidden rounded-3xl h-64 md:h-72"
              >
                <Image
                  src={promo.image}
                  alt={promo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${promo.gradient} opacity-80`} />
                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{promo.title}</h3>
                  <p className="text-white/80 mb-4">{promo.subtitle}</p>
                  <span className="inline-flex items-center gap-2 font-medium group-hover:gap-3 transition-all">
                    {promo.cta} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
