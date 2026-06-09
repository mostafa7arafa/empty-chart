"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Check your email</h1>
          <p className="text-[var(--muted-foreground)] mb-6">We sent a password reset link to your email address.</p>
          <Link href="/auth/login" className="text-gold-500 font-medium hover:underline">Back to Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Reset Password</h1>
          <p className="text-[var(--muted-foreground)] text-sm mt-1">Enter your email to receive a reset link</p>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
                <input type="email" placeholder="you@example.com" className="w-full h-11 pl-10 pr-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" required />
              </div>
            </div>
            <button type="submit" className="w-full h-11 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-semibold hover:opacity-90">
              Send Reset Link
            </button>
          </form>
        </div>

        <Link href="/auth/login" className="flex items-center justify-center gap-2 text-sm text-[var(--muted-foreground)] mt-4 hover:text-[var(--foreground)]">
          <ArrowLeft className="w-4 h-4" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
