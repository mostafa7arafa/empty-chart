import { prisma } from "@/lib/prisma";
import { Search, Eye, Ban } from "lucide-react";

export const metadata = { title: "Manage Customers" };

export default async function AdminCustomersPage() {
  const customers = await prisma.user.findMany({
    include: { _count: { select: { orders: true, reviews: true } } },
    orderBy: { createdAt: "desc" }, take: 20,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Customers</h1>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[var(--border)]">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
            <input type="text" placeholder="Search customers..." className="w-full h-10 pl-10 pr-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--secondary)] text-[var(--muted-foreground)]">
              <tr>
                <th className="p-3 text-left font-medium">Customer</th>
                <th className="p-3 text-left font-medium">Email</th>
                <th className="p-3 text-left font-medium">Orders</th>
                <th className="p-3 text-left font-medium">Reviews</th>
                <th className="p-3 text-left font-medium">Role</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {customers.map((user) => (
                <tr key={user.id} className="hover:bg-[var(--secondary)]/50">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-navy-900/10 rounded-full flex items-center justify-center text-xs font-bold">
                        {user.name?.charAt(0) ?? "?"}
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-[var(--muted-foreground)]">{user.email}</td>
                  <td className="p-3">{user._count.orders}</td>
                  <td className="p-3">{user._count.reviews}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${user.role === "ADMIN" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-600"}`}>{user.role}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-[var(--secondary)] rounded-lg"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg"><Ban className="w-3.5 h-3.5" /></button>
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
