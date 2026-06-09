import { prisma } from "@/lib/prisma";
import { Plus, Pencil, Trash2, Package } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Manage Bundles" };

export default async function AdminBundlesPage() {
  const bundles = await prisma.bundle.findMany({ include: { items: true }, orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Bundles</h1>
        <button className="flex items-center gap-1 text-sm px-4 py-2 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-medium">
          <Plus className="w-4 h-4" /> Create Bundle
        </button>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[var(--secondary)]">
            <tr>
              <th className="p-3 text-left font-medium">Bundle</th>
              <th className="p-3 text-left font-medium">Items</th>
              <th className="p-3 text-left font-medium">Price</th>
              <th className="p-3 text-left font-medium">Status</th>
              <th className="p-3 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {bundles.map((bundle) => (
              <tr key={bundle.id} className="hover:bg-[var(--secondary)]/50">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-gold-500" />
                    <div>
                      <p className="font-medium">{bundle.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)] truncate max-w-[200px]">{bundle.description}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3">{bundle.items.length} items</td>
                <td className="p-3">
                  <div>
                    <p className="font-medium">{formatPrice(bundle.price)}</p>
                    <p className="text-xs text-[var(--muted-foreground)] line-through">{formatPrice(bundle.originalPrice)}</p>
                  </div>
                </td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${bundle.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {bundle.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <button className="p-1.5 hover:bg-[var(--secondary)] rounded-lg"><Pencil className="w-3.5 h-3.5" /></button>
                    <button className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
