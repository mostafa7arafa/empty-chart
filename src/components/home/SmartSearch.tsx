"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, TrendingUp, Clock } from "lucide-react";

const trending = ["Samsung TV 65\"", "Air Conditioner 2.25 HP", "Washing Machine 9kg", "Air Fryer"];
const popularCategories = ["Smart TVs", "Split ACs", "Refrigerators", "Kitchen Appliances"];

export function SmartSearch() {
  const [focused, setFocused] = useState(false);

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 text-electric text-sm font-medium mb-3">
            <Sparkles className="w-4 h-4" />
            AI-Powered Search
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Find exactly what you need</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className={`relative rounded-3xl border-2 transition-all duration-300 ${focused ? "border-electric shadow-xl shadow-electric/10" : "border-[var(--border)]"} bg-[var(--card)]`}>
            <div className="flex items-center px-6 py-5">
              <Search className="w-6 h-6 text-[var(--muted-foreground)] mr-4" />
              <input
                type="text"
                placeholder="What are you looking for today?"
                className="flex-1 bg-transparent outline-none text-lg placeholder:text-[var(--muted-foreground)]"
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
              />
              <button className="px-6 py-2.5 bg-electric text-white rounded-xl font-medium hover:bg-electric-light transition-colors">
                Search
              </button>
            </div>

            {focused && (
              <div className="border-t border-[var(--border)] p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] mb-3">
                      <TrendingUp className="w-4 h-4" />
                      Trending Searches
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trending.map((term) => (
                        <button
                          key={term}
                          className="px-3 py-1.5 bg-[var(--muted)] rounded-lg text-sm hover:bg-electric/10 hover:text-electric transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] mb-3">
                      <Clock className="w-4 h-4" />
                      Popular Categories
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {popularCategories.map((cat) => (
                        <button
                          key={cat}
                          className="px-3 py-1.5 bg-[var(--muted)] rounded-lg text-sm hover:bg-electric/10 hover:text-electric transition-colors"
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
