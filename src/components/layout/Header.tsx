"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Heart, User, Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/data";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass">
      {/* Top bar */}
      <div className="bg-midnight text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <span>🚚 Free delivery on orders over EGP 5,000</span>
          <div className="hidden md:flex items-center gap-4">
            <span>📞 16XXX</span>
            <span>🏪 Find a Store</span>
            <span>العربية</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-electric rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:inline">
              Empty<span className="text-electric">Chart</span>
            </span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="What are you looking for today?"
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[var(--muted)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-electric/50 transition-all text-sm"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-[var(--muted)] transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link href="#" className="p-2.5 rounded-xl hover:bg-[var(--muted)] transition-colors hidden sm:flex">
              <Heart className="w-5 h-5" />
            </Link>
            <Link href="#" className="p-2.5 rounded-xl hover:bg-[var(--muted)] transition-colors hidden sm:flex">
              <User className="w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="relative p-2.5 rounded-xl hover:bg-[var(--muted)] transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-electric text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                3
              </span>
            </Link>
            <button
              className="p-2.5 rounded-xl hover:bg-[var(--muted)] transition-colors md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-[var(--border)] hidden md:block">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1 py-2 text-sm">
            <li
              className="relative"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors font-medium">
                All Categories <ChevronDown className="w-4 h-4" />
              </button>
              {megaMenuOpen && (
                <div className="absolute top-full left-0 w-[600px] glass rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-3 z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.id}`}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)] transition-colors"
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{cat.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{cat.productCount} products</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </li>
            {["Deals", "Best Sellers", "New Arrivals", "Brands", "Smart Home"].map((item) => (
              <li key={item}>
                <Link
                  href="#"
                  className="px-3 py-2 rounded-lg hover:bg-[var(--muted)] transition-colors block"
                >
                  {item}
                </Link>
              </li>
            ))}
            <li className="ml-auto">
              <Link href="#" className="px-3 py-2 rounded-lg bg-electric/10 text-electric font-medium block">
                🔥 Summer Sale
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={cn("md:hidden border-t border-[var(--border)] glass")}>
          <div className="px-4 py-3">
            <div className="relative mb-3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-[var(--muted)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-electric/50 text-sm"
              />
            </div>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products?category=${cat.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[var(--muted)] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <span>{cat.icon}</span>
                    <span className="text-sm font-medium">{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
