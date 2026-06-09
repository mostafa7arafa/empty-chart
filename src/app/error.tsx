"use client";

import Link from "next/link";
import { RefreshCw, Home } from "lucide-react";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-red-500 mb-4">500</h1>
        <h2 className="text-2xl font-bold mb-2">Something Went Wrong</h2>
        <p className="text-[var(--muted-foreground)] mb-8">An unexpected error occurred. Please try again.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={reset} className="flex items-center justify-center gap-2 h-11 px-6 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-medium hover:opacity-90">
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <Link href="/" className="flex items-center justify-center gap-2 h-11 px-6 border border-[var(--border)] rounded-xl font-medium hover:bg-[var(--secondary)]">
            <Home className="w-4 h-4" /> Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
