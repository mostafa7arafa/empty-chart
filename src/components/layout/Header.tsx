"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import {
  Search, ShoppingCart, Heart, User, Menu, X, Sun, Moon,
  ChevronDown, Phone, MapPin
} from "lucide-react";

const categories = [
  { name: "Air Conditioners", slug: "air-conditioners" },
  { name: "Refrigerators", slug: "refrigerators" },
  { name: "Washing Machines", slug: "washing-machines" },
  { name: "TVs & Entertainment", slug: "tvs-entertainment" },
  { name: "Kitchen Appliances", slug: "kitchen-appliances" },
  { name: "Smart Home", slug: "smart-home" },
  { name: "Small Appliances", slug: "small-appliances" },
  { name: "Audio Systems", slug: "audio-systems" },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const cartItemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement Bar */}
      {announcementVisible && (
        <div className="bg-navy-900 text-gold-500 text-sm py-2 px-4 text-center relative">
          <span>🎉 Summer Sale! Up to 50% off on selected items. Free shipping on orders over EGP 500!</span>
          <button
            onClick={() => setAnnouncementVisible(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            aria-label="Dismiss announcement"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Bar */}
      <div className="bg-[var(--secondary)] border-b border-[var(--border)] hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-9 text-xs text-[var(--muted-foreground)]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +20 123 456 7890</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Cairo, Egypt</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/track-order" className="hover:text-[var(--foreground)] transition-colors">Track Order</Link>
            <Link href="/faq" className="hover:text-[var(--foreground)] transition-colors">Help & FAQ</Link>
            <button onClick={toggleTheme} className="flex items-center gap-1 hover:text-[var(--foreground)] transition-colors">
              {theme === "dark" ? <Sun className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
              {theme === "dark" ? "Light" : "Dark"} Mode
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className={`bg-[var(--background)] transition-shadow ${scrolled ? "shadow-lg" : "shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-navy-900 dark:bg-gold-500 rounded-xl flex items-center justify-center">
              <span className="text-white dark:text-navy-900 font-bold text-lg">EC</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg leading-tight text-[var(--foreground)]">Empty Chart</h1>
              <p className="text-[10px] text-[var(--muted-foreground)] leading-tight">Pro</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block">
            <form action="/search" method="GET" className="relative">
              <input
                type="text"
                name="q"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands, categories..."
                className="w-full h-10 pl-4 pr-10 rounded-xl border border-[var(--border)] bg-[var(--secondary)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 text-[var(--foreground)]"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-gold-500">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 hover:bg-[var(--secondary)] rounded-lg">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={toggleTheme} className="md:hidden p-2 hover:bg-[var(--secondary)] rounded-lg">
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link href="/account/wishlist" className="relative p-2 hover:bg-[var(--secondary)] rounded-lg hidden sm:flex">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold-500 text-navy-900 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative p-2 hover:bg-[var(--secondary)] rounded-lg">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-gold-500 text-navy-900 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link href="/auth/login" className="hidden sm:flex items-center gap-2 px-3 py-2 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
              <User className="w-4 h-4" />
              <span className="hidden lg:inline">Account</span>
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-[var(--secondary)] rounded-lg">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden px-4 pb-3">
            <form action="/search" method="GET" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Search products..."
                className="w-full h-10 pl-4 pr-10 rounded-xl border border-[var(--border)] bg-[var(--secondary)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                autoFocus
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Navigation */}
        <nav className="hidden md:block border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-6 h-11 text-sm">
            <div className="relative group">
              <button className="flex items-center gap-1 font-medium hover:text-gold-500 transition-colors">
                Categories <ChevronDown className="w-3 h-3" />
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl p-2 min-w-[220px]">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categories/${cat.slug}`}
                      className="block px-3 py-2 rounded-lg hover:bg-[var(--secondary)] text-sm transition-colors"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/products" className="hover:text-gold-500 transition-colors">All Products</Link>
            <Link href="/deals" className="hover:text-gold-500 transition-colors text-red-500 font-medium">Flash Deals 🔥</Link>
            <Link href="/bundles" className="hover:text-gold-500 transition-colors">Bundles</Link>
            <Link href="/brands" className="hover:text-gold-500 transition-colors">Brands</Link>
            <Link href="/about" className="hover:text-gold-500 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-gold-500 transition-colors">Contact</Link>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--background)] border-t border-[var(--border)] shadow-xl">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <Link href="/products" className="block px-3 py-2 rounded-lg hover:bg-[var(--secondary)]" onClick={() => setMobileMenuOpen(false)}>All Products</Link>
            <Link href="/deals" className="block px-3 py-2 rounded-lg hover:bg-[var(--secondary)] text-red-500 font-medium" onClick={() => setMobileMenuOpen(false)}>Flash Deals 🔥</Link>
            <Link href="/bundles" className="block px-3 py-2 rounded-lg hover:bg-[var(--secondary)]" onClick={() => setMobileMenuOpen(false)}>Bundles</Link>
            <Link href="/brands" className="block px-3 py-2 rounded-lg hover:bg-[var(--secondary)]" onClick={() => setMobileMenuOpen(false)}>Brands</Link>
            <div className="border-t border-[var(--border)] pt-2 mt-2">
              <p className="px-3 py-1 text-xs font-medium text-[var(--muted-foreground)] uppercase">Categories</p>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="block px-3 py-2 rounded-lg hover:bg-[var(--secondary)] text-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-[var(--border)] pt-2 mt-2">
              <Link href="/account/wishlist" className="block px-3 py-2 rounded-lg hover:bg-[var(--secondary)]" onClick={() => setMobileMenuOpen(false)}>Wishlist ({wishlistCount})</Link>
              <Link href="/auth/login" className="block px-3 py-2 rounded-lg hover:bg-[var(--secondary)]" onClick={() => setMobileMenuOpen(false)}>Sign In / Register</Link>
              <Link href="/track-order" className="block px-3 py-2 rounded-lg hover:bg-[var(--secondary)]" onClick={() => setMobileMenuOpen(false)}>Track Order</Link>
              <Link href="/faq" className="block px-3 py-2 rounded-lg hover:bg-[var(--secondary)]" onClick={() => setMobileMenuOpen(false)}>Help & FAQ</Link>
              <Link href="/about" className="block px-3 py-2 rounded-lg hover:bg-[var(--secondary)]" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/contact" className="block px-3 py-2 rounded-lg hover:bg-[var(--secondary)]" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
