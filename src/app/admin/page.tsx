import { prisma } from "@/lib/prisma";
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, ArrowUpRight } from "lucide-react";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboardPage() {
  const [productCount, orderCount, userCount, categoryCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.category.count(),
  ]);

  const stats = [
    { label: "Total Revenue", value: "EGP 1,250,000", icon: DollarSign, change: "+12.5%", color: "bg-green-100 text-green-700" },
    { label: "Total Orders", value: orderCount.toString(), icon: ShoppingCart, change: "+8.2%", color: "bg-blue-100 text-blue-700" },
    { label: "Total Customers", value: userCount.toString(), icon: Users, change: "+15.3%", color: "bg-purple-100 text-purple-700" },
    { label: "Total Products", value: productCount.toString(), icon: Package, change: `${categoryCount} categories`, color: "bg-orange-100 text-orange-700" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <span className="text-sm text-[var(--muted-foreground)]">Last updated: just now</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-[var(--muted-foreground)]">{stat.label}</span>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3" /> {stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Recent Orders</h2>
            <a href="/admin/orders" className="text-xs text-gold-500 flex items-center gap-1">View All <ArrowUpRight className="w-3 h-3" /></a>
          </div>
          <div className="space-y-3">
            {[
              { id: "EC-001", customer: "Ahmed M.", total: "EGP 15,999", status: "Processing" },
              { id: "EC-002", customer: "Sara K.", total: "EGP 8,500", status: "Shipped" },
              { id: "EC-003", customer: "Mohamed A.", total: "EGP 24,999", status: "Delivered" },
              { id: "EC-004", customer: "Fatma H.", total: "EGP 3,200", status: "Processing" },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 text-sm">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.total}</p>
                  <span className={`text-xs ${order.status === "Delivered" ? "text-green-600" : order.status === "Shipped" ? "text-blue-600" : "text-yellow-600"}`}>{order.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold">Top Selling Products</h2>
            <a href="/admin/products" className="text-xs text-gold-500 flex items-center gap-1">View All <ArrowUpRight className="w-3 h-3" /></a>
          </div>
          <div className="space-y-3">
            {[
              { name: "Samsung 65\" QLED 4K Smart TV", sales: 156, revenue: "EGP 3.9M" },
              { name: "LG InstaView Refrigerator", sales: 98, revenue: "EGP 2.1M" },
              { name: "Dyson V15 Detect", sales: 234, revenue: "EGP 2.0M" },
              { name: "Sony WH-1000XM5", sales: 312, revenue: "EGP 1.5M" },
            ].map((product) => (
              <div key={product.name} className="flex items-center justify-between py-2 text-sm">
                <div>
                  <p className="font-medium truncate max-w-[200px]">{product.name}</p>
                  <p className="text-xs text-[var(--muted-foreground)]">{product.sales} sales</p>
                </div>
                <p className="font-medium text-gold-500">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
