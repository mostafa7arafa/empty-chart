"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ui/ProductCard";
import { Grid3X3, List, SlidersHorizontal, ChevronLeft, ChevronRight, X } from "lucide-react";

interface Product {
  id: string; name: string; slug: string; price: number; originalPrice: number | null;
  image: string; brand: string; brandSlug: string; category: string; categorySlug: string;
  rating: number; reviewCount: number; badge: string | null; stock: number;
}

interface FilterOption { slug: string; name: string; count?: number; }

interface Props {
  products: Product[];
  categories: FilterOption[];
  brands: FilterOption[];
  total: number;
  page: number;
  pageSize: number;
  currentSort: string;
  currentCategory?: string;
  currentBrand?: string;
  title?: string;
}

export function ProductCatalog({ products, categories, brands, total, page, pageSize, currentSort, currentCategory, currentBrand, title }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [listView, setListView] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const totalPages = Math.ceil(total / pageSize);

  const updateParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "rating", label: "Best Rated" },
    { value: "popular", label: "Most Popular" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{title ?? "All Products"}</h1>
          <p className="text-sm text-[var(--muted-foreground)]">{total} products found</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setFiltersOpen(!filtersOpen)} className="md:hidden flex items-center gap-1 px-3 py-2 border border-[var(--border)] rounded-xl text-sm">
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
          <div className="hidden sm:flex items-center gap-1 border border-[var(--border)] rounded-xl p-1">
            <button onClick={() => setListView(false)} className={`p-1.5 rounded-lg ${!listView ? "bg-[var(--secondary)]" : ""}`}>
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button onClick={() => setListView(true)} className={`p-1.5 rounded-lg ${listView ? "bg-[var(--secondary)]" : ""}`}>
              <List className="w-4 h-4" />
            </button>
          </div>
          <select
            value={currentSort}
            onChange={(e) => updateParams("sort", e.target.value)}
            className="h-9 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)] text-[var(--foreground)]"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {(currentCategory || currentBrand) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {currentCategory && (
            <span className="flex items-center gap-1 px-3 py-1 bg-gold-500/10 text-gold-600 rounded-full text-sm">
              {categories.find((c) => c.slug === currentCategory)?.name}
              <button onClick={() => updateParams("category", null)}><X className="w-3 h-3" /></button>
            </span>
          )}
          {currentBrand && (
            <span className="flex items-center gap-1 px-3 py-1 bg-gold-500/10 text-gold-600 rounded-full text-sm">
              {brands.find((b) => b.slug === currentBrand)?.name}
              <button onClick={() => updateParams("brand", null)}><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className={`${filtersOpen ? "fixed inset-0 z-50 bg-[var(--background)] p-4 overflow-y-auto" : "hidden"} md:block md:static md:w-60 shrink-0`}>
          {filtersOpen && (
            <div className="flex justify-between items-center mb-4 md:hidden">
              <h2 className="font-bold text-lg">Filters</h2>
              <button onClick={() => setFiltersOpen(false)}><X className="w-5 h-5" /></button>
            </div>
          )}

          {/* Categories */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-3">Categories</h3>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => { updateParams("category", currentCategory === cat.slug ? null : cat.slug); setFiltersOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentCategory === cat.slug ? "bg-gold-500/10 text-gold-600 font-medium" : "hover:bg-[var(--secondary)]"}`}
                >
                  {cat.name} {cat.count !== undefined && <span className="text-[var(--muted-foreground)]">({cat.count})</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-3">Brands</h3>
            <div className="space-y-1">
              {brands.map((br) => (
                <button
                  key={br.slug}
                  onClick={() => { updateParams("brand", currentBrand === br.slug ? null : br.slug); setFiltersOpen(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${currentBrand === br.slug ? "bg-gold-500/10 text-gold-600 font-medium" : "hover:bg-[var(--secondary)]"}`}
                >
                  {br.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Filters */}
          <div className="space-y-2">
            <button onClick={() => updateParams("inStock", searchParams.get("inStock") === "true" ? null : "true")} className={`w-full text-left px-3 py-2 rounded-lg text-sm border ${searchParams.get("inStock") === "true" ? "border-gold-500 bg-gold-500/10" : "border-[var(--border)]"}`}>
              In Stock Only
            </button>
            <button onClick={() => updateParams("onSale", searchParams.get("onSale") === "true" ? null : "true")} className={`w-full text-left px-3 py-2 rounded-lg text-sm border ${searchParams.get("onSale") === "true" ? "border-gold-500 bg-gold-500/10" : "border-[var(--border)]"}`}>
              On Sale
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <h3 className="font-bold text-lg mb-2">No products found</h3>
              <p className="text-[var(--muted-foreground)]">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <>
              <div className={listView ? "space-y-4" : "grid grid-cols-2 lg:grid-cols-3 gap-4"}>
                {products.map((p) => (
                  <ProductCard key={p.id} {...p} listView={listView} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => updateParams("page", String(page - 1))}
                    disabled={page <= 1}
                    className="p-2 rounded-lg border border-[var(--border)] disabled:opacity-50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, page - 3), page + 2).map((p) => (
                    <button
                      key={p}
                      onClick={() => updateParams("page", String(p))}
                      className={`w-9 h-9 rounded-lg text-sm font-medium ${p === page ? "bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900" : "border border-[var(--border)] hover:bg-[var(--secondary)]"}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => updateParams("page", String(page + 1))}
                    disabled={page >= totalPages}
                    className="p-2 rounded-lg border border-[var(--border)] disabled:opacity-50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
