import { prisma } from "@/lib/prisma";
import Image from "next/image";
import { Plus, Search, Pencil, Trash2, Upload } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Manage Products" };

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { brand: true, category: true, images: { take: 1 } },
    orderBy: { createdAt: "desc" }, take: 20,
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 text-sm px-4 py-2 border border-[var(--border)] rounded-xl hover:bg-[var(--secondary)]">
            <Upload className="w-4 h-4" /> Import CSV
          </button>
          <button className="flex items-center gap-1 text-sm px-4 py-2 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-medium">
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[var(--border)]">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input type="text" placeholder="Search products..." className="w-full h-10 pl-10 pr-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--secondary)] text-[var(--muted-foreground)]">
              <tr>
                <th className="p-3 text-left font-medium">Product</th>
                <th className="p-3 text-left font-medium">Category</th>
                <th className="p-3 text-left font-medium">Price</th>
                <th className="p-3 text-left font-medium">Stock</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-[var(--secondary)]/50">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-[var(--secondary)] shrink-0 relative">
                        {product.images[0] && <Image src={product.images[0].url} alt="" fill className="object-cover" sizes="40px" />}
                      </div>
                      <div>
                        <p className="font-medium truncate max-w-[200px]">{product.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)]">{product.brand.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-[var(--muted-foreground)]">{product.category.name}</td>
                  <td className="p-3 font-medium">{formatPrice(product.price)}</td>
                  <td className="p-3">
                    <span className={`${product.stock < 10 ? "text-red-500" : ""}`}>{product.stock}</span>
                  </td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${product.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {product.isActive ? "Active" : "Inactive"}
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
    </div>
  );
}
