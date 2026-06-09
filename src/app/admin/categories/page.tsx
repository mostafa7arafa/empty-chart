import { prisma } from "@/lib/prisma";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const metadata = { title: "Manage Categories" };

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button className="flex items-center gap-1 text-sm px-4 py-2 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-medium">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <h3 className="font-bold text-sm">{cat.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">{cat.productCount} products</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${cat.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                {cat.isActive ? "Active" : "Inactive"}
              </span>
            </div>
            {cat.description && <p className="text-xs text-[var(--muted-foreground)] mb-3 line-clamp-2">{cat.description}</p>}
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1 text-xs py-2 border border-[var(--border)] rounded-lg hover:bg-[var(--secondary)]">
                <Pencil className="w-3 h-3" /> Edit
              </button>
              <button className="flex items-center justify-center gap-1 text-xs py-2 px-3 text-red-500 hover:bg-red-50 rounded-lg">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
