import { prisma } from "@/lib/prisma";
import { Plus, Pencil, Trash2, Zap } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Manage Deals" };

export default async function AdminDealsPage() {
  const deals = await prisma.flashDeal.findMany({
    include: { product: { select: { name: true } } },
    orderBy: { endDate: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Flash Deals</h1>
        <button className="flex items-center gap-1 text-sm px-4 py-2 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-medium">
          <Plus className="w-4 h-4" /> Create Deal
        </button>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--secondary)]">
            <tr>
              <th className="p-3 text-left font-medium">Product</th>
              <th className="p-3 text-left font-medium">Deal Price</th>
              <th className="p-3 text-left font-medium">Stock</th>
              <th className="p-3 text-left font-medium">End Date</th>
              <th className="p-3 text-left font-medium">Status</th>
              <th className="p-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {deals.map((deal) => {
              const isExpired = new Date(deal.endDate) < new Date();
              return (
                <tr key={deal.id} className="hover:bg-[var(--secondary)]/50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-gold-500" />
                      <span className="font-medium">{deal.product.name}</span>
                    </div>
                  </td>
                  <td className="p-3 font-medium text-gold-500">{formatPrice(deal.dealPrice)}</td>
                  <td className="p-3">{deal.sold}/{deal.stock}</td>
                  <td className="p-3 text-[var(--muted-foreground)]">{new Date(deal.endDate).toLocaleDateString()}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isExpired ? "bg-gray-100 text-gray-600" : deal.isActive ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {isExpired ? "Expired" : deal.isActive ? "Active" : "Inactive"}
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
