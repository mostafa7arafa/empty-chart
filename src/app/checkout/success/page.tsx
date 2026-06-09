import { randomBytes } from "crypto";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export default function CheckoutSuccessPage() {
  const orderNumber = `EC-${randomBytes(4).toString("hex").toUpperCase()}`;

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
      <p className="text-[var(--muted-foreground)] mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <div className="bg-[var(--secondary)] rounded-2xl p-6 mb-6 text-left">
        <div className="flex items-center gap-3 mb-4">
          <Package className="w-5 h-5 text-gold-500" />
          <div>
            <p className="text-sm text-[var(--muted-foreground)]">Order Number</p>
            <p className="font-bold text-lg">{orderNumber}</p>
          </div>
        </div>
        <p className="text-sm text-[var(--muted-foreground)]">
          A confirmation email has been sent. You can track your order using the order number.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/track-order" className="flex-1 flex items-center justify-center gap-2 h-12 border border-[var(--border)] rounded-xl font-medium hover:bg-[var(--secondary)]">
          Track Order
        </Link>
        <Link href="/products" className="flex-1 flex items-center justify-center gap-2 h-12 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-medium hover:opacity-90">
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
