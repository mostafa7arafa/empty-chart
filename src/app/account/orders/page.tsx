import { Package } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "My Orders" };

export default function OrdersPage() {
  const orders = [
    { id: "EC-2025-001", date: "Jun 5, 2025", total: 15999, status: "Delivered", items: 3 },
    { id: "EC-2025-002", date: "Jun 8, 2025", total: 8500, status: "Shipped", items: 1 },
    { id: "EC-2025-003", date: "Jun 9, 2025", total: 24999, status: "Processing", items: 2 },
  ];

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Order History</h2>
      {orders.length === 0 ? (
        <div className="text-center py-16 bg-[var(--card)] border border-[var(--border)] rounded-2xl">
          <Package className="w-12 h-12 text-[var(--muted-foreground)] mx-auto mb-3" />
          <p className="font-medium mb-1">No orders yet</p>
          <Link href="/products" className="text-sm text-gold-500 hover:underline">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link key={order.id} href={`/account/orders/${order.id}`} className="block bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm">{order.id}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  order.status === "Delivered" ? "bg-green-100 text-green-700" :
                  order.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>{order.status}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-[var(--muted-foreground)]">
                <span>{order.date} · {order.items} items</span>
                <span className="font-medium text-[var(--foreground)]">EGP {order.total.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
