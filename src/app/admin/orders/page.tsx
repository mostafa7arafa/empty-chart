import { prisma } from "@/lib/prisma";
import { Eye, Search } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Manage Orders" };

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: { user: { select: { name: true, email: true } }, items: true },
    orderBy: { createdAt: "desc" }, take: 20,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Orders</h1>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[var(--border)] flex gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input type="text" placeholder="Search orders..." className="w-full h-10 pl-10 pr-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
          </div>
          <select className="h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]">
            <option>All Status</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--secondary)] text-[var(--muted-foreground)]">
              <tr>
                <th className="p-3 text-left font-medium">Order #</th>
                <th className="p-3 text-left font-medium">Customer</th>
                <th className="p-3 text-left font-medium">Items</th>
                <th className="p-3 text-left font-medium">Total</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Payment</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {orders.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center text-[var(--muted-foreground)]">No orders yet</td></tr>
              ) : orders.map((order) => (
                <tr key={order.id} className="hover:bg-[var(--secondary)]/50">
                  <td className="p-3 font-medium">{order.orderNumber}</td>
                  <td className="p-3">
                    <p>{order.user?.name ?? "Guest"}</p>
                    <p className="text-xs text-[var(--muted-foreground)]">{order.user?.email ?? order.guestEmail}</p>
                  </td>
                  <td className="p-3">{order.items.length}</td>
                  <td className="p-3 font-medium">{formatPrice(order.total)}</td>
                  <td className="p-3">
                    <select defaultValue={order.status} className="text-xs px-2 py-1 border border-[var(--border)] rounded-lg bg-[var(--background)]">
                      <option value="PENDING">Pending</option>
                      <option value="PROCESSING">Processing</option>
                      <option value="SHIPPED">Shipped</option>
                      <option value="DELIVERED">Delivered</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <span className={`text-xs ${order.paymentStatus === "PAID" ? "text-green-600" : "text-yellow-600"}`}>{order.paymentStatus}</span>
                  </td>
                  <td className="p-3">
                    <button className="p-1.5 hover:bg-[var(--secondary)] rounded-lg"><Eye className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
