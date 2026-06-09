import Link from "next/link";
import { Search, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-navy-900 dark:text-gold-500 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="text-[var(--muted-foreground)] mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="flex items-center justify-center gap-2 h-11 px-6 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-medium hover:opacity-90">
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link href="/products" className="flex items-center justify-center gap-2 h-11 px-6 border border-[var(--border)] rounded-xl font-medium hover:bg-[var(--secondary)]">
            <Search className="w-4 h-4" /> Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
