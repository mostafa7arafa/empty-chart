"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, FolderTree, Layers, ShoppingCart, Users, Zap, Ticket, Star, Settings } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/categories", label: "Categories", icon: FolderTree },
  { href: "/admin/bundles", label: "Bundles", icon: Layers },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/deals", label: "Deals", icon: Zap },
  { href: "/admin/coupons", label: "Coupons", icon: Ticket },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <aside className="hidden md:flex w-60 flex-col border-r border-[var(--border)] bg-[var(--card)] p-4">
        <div className="mb-6">
          <h2 className="font-bold text-lg flex items-center gap-2">
            <div className="w-8 h-8 bg-navy-900 dark:bg-gold-500 rounded-lg flex items-center justify-center">
              <span className="text-white dark:text-navy-900 font-bold text-xs">EC</span>
            </div>
            Admin Panel
          </h2>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                pathname === item.href ? "bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 font-medium" : "text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--card)] border-t border-[var(--border)] px-2 py-1.5 z-50 flex overflow-x-auto scrollbar-hide">
        {navItems.slice(0, 5).map((item) => (
          <Link key={item.href} href={item.href} className={`flex flex-col items-center flex-1 py-1 text-xs gap-0.5 ${pathname === item.href ? "text-gold-500" : "text-[var(--muted-foreground)]"}`}>
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </div>

      <main className="flex-1 p-6 overflow-y-auto pb-20 md:pb-6">{children}</main>
    </div>
  );
}
