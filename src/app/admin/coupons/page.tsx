import { prisma } from "@/lib/prisma";
import { Plus, Pencil, Trash2, Ticket } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Manage Coupons" };

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({
    include: { _count: { select: { usages: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Coupons</h1>
        <button className="flex items-center gap-1 text-sm px-4 py-2 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-medium">
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--secondary)]">
            <tr>
              <th className="p-3 text-left font-medium">Code</th>
              <th className="p-3 text-left font-medium">Type</th>
              <th className="p-3 text-left font-medium">Value</th>
              <th className="p-3 text-left font-medium">Min Order</th>
              <th className="p-3 text-left font-medium">Usage</th>
              <th className="p-3 text-left font-medium">Expires</th>
              <th className="p-3 text-left font-medium">Status</th>
              <th className="p-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {coupons.map((coupon) => {
              const isExpired = coupon.endDate ? new Date(coupon.endDate) < new Date() : false;
              return (
                <tr key={coupon.id} className="hover:bg-[var(--secondary)]/50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-gold-500" />
                      <span className="font-mono font-bold">{coupon.code}</span>
                    </div>
                  </td>
                  <td className="p-3 capitalize">{coupon.type.toLowerCase()}</td>
                  <td className="p-3 font-medium">
                    {coupon.type === "PERCENTAGE" ? `${coupon.value}%` : formatPrice(coupon.value)}
                  </td>
                  <td className="p-3">{coupon.minOrder ? formatPrice(coupon.minOrder) : "—"}</td>
                  <td className="p-3">{coupon._count.usages}/{coupon.usageLimit ?? "∞"}</td>
                  <td className="p-3 text-[var(--muted-foreground)]">
                    {coupon.endDate ? new Date(coupon.endDate).toLocaleDateString() : "Never"}
                  </td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isExpired ? "bg-gray-100 text-gray-600" : coupon.isActive ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {isExpired ? "Expired" : coupon.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-[var(--secondary)] rounded-lg"><Pencil className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
