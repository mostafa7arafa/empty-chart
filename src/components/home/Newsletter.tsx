"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

export function Newsletter() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center bg-[var(--card)] border border-[var(--border)] rounded-[2rem] p-8 md:p-12"
        >
          <div className="w-16 h-16 bg-electric/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-electric" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Be The First To Know About New Deals
          </h2>
          <p className="text-[var(--muted-foreground)] mb-8 max-w-lg mx-auto">
            Subscribe for exclusive promotions, product launches, and seasonal discounts delivered to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3.5 rounded-xl bg-[var(--muted)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-electric/50 text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-electric hover:bg-electric-light text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors shrink-0"
            >
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="text-xs text-[var(--muted-foreground)] mt-4">
            No spam. Unsubscribe anytime. By subscribing you agree to our Privacy Policy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
