"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Grid3X3, LayoutList, SlidersHorizontal } from "lucide-react";
import { bestSellers, categories } from "@/lib/data";
import { ProductCard } from "@/components/ui/ProductCard";

export default function ProductsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-[var(--muted-foreground)] mb-6">
        <span>Home</span> / <span className="text-[var(--foreground)] font-medium">All Products</span>
      </nav>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`${showFilters ? "block" : "hidden"} lg:block w-64 shrink-0`}>
          <div className="sticky top-32 space-y-6">
            <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Categories
              </h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button className="flex items-center justify-between w-full text-sm py-2 px-3 rounded-lg hover:bg-[var(--muted)] transition-colors text-left">
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span> {cat.name}
                      </span>
                      <span className="text-xs text-[var(--muted-foreground)]">{cat.productCount}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
              <h3 className="font-semibold mb-4">Price Range</h3>
              <div className="space-y-2">
                {["Under EGP 5,000", "5,000 - 15,000", "15,000 - 30,000", "30,000 - 50,000", "Over 50,000"].map((range) => (
                  <label key={range} className="flex items-center gap-2 text-sm cursor-pointer py-1">
                    <input type="checkbox" className="rounded border-[var(--border)] text-electric focus:ring-electric" />
                    {range}
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
              <h3 className="font-semibold mb-4">Brand</h3>
              <div className="space-y-2">
                {["Samsung", "LG", "Sharp", "Carrier", "Midea", "Beko"].map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer py-1">
                    <input type="checkbox" className="rounded border-[var(--border)] text-electric focus:ring-electric" />
                    {brand}
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-5">
              <h3 className="font-semibold mb-4">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 text-sm cursor-pointer py-1">
                    <input type="checkbox" className="rounded border-[var(--border)] text-electric focus:ring-electric" />
                    {rating}+ Stars
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 bg-[var(--card)] rounded-2xl border border-[var(--border)] p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--muted)] text-sm font-medium"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>
              <span className="text-sm text-[var(--muted-foreground)]">
                Showing <strong>{bestSellers.length}</strong> products
              </span>
            </div>
            <div className="flex items-center gap-2">
              <select className="text-sm bg-[var(--muted)] rounded-lg px-3 py-2 border-none outline-none">
                <option>Sort: Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
                <option>Rating</option>
              </select>
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-lg ${view === "grid" ? "bg-electric text-white" : "bg-[var(--muted)]"}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-lg ${view === "list" ? "bg-electric text-white" : "bg-[var(--muted)]"}`}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`grid ${view === "grid" ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"} gap-4 md:gap-6`}
          >
            {[...bestSellers, ...bestSellers].map((product, i) => (
              <ProductCard key={`${product.id}-${i}`} product={product} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
