import { Truck, Clock, MapPin, Package } from "lucide-react";

export const metadata = { title: "Shipping Policy" };

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Shipping & Delivery</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {[
          { icon: Truck, title: "Free Shipping", desc: "On orders over EGP 500" },
          { icon: Clock, title: "Fast Delivery", desc: "2-7 business days" },
          { icon: MapPin, title: "Nationwide", desc: "All Egypt governorates" },
          { icon: Package, title: "Secure Packaging", desc: "Protected in transit" },
        ].map((item) => (
          <div key={item.title} className="flex items-center gap-3 p-4 bg-[var(--secondary)] rounded-xl">
            <item.icon className="w-8 h-8 text-gold-500" />
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-[var(--muted-foreground)]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6 text-sm text-[var(--muted-foreground)]">
        <div>
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">Shipping Methods</h2>
          <div className="border border-[var(--border)] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[var(--secondary)]">
                <tr><th className="p-3 text-left text-xs font-medium">Method</th><th className="p-3 text-left text-xs font-medium">Time</th><th className="p-3 text-left text-xs font-medium">Cost</th></tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                <tr><td className="p-3">Standard</td><td className="p-3">5-7 days</td><td className="p-3">Free over EGP 500 / EGP 35</td></tr>
                <tr><td className="p-3">Express</td><td className="p-3">2-3 days</td><td className="p-3">EGP 50</td></tr>
                <tr><td className="p-3">Same Day (Cairo)</td><td className="p-3">Same day</td><td className="p-3">EGP 100</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">Delivery Areas</h2>
          <p>We deliver to all governorates across Egypt. Delivery times may vary for remote areas.</p>
        </div>
        <div>
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">Order Tracking</h2>
          <p>Once shipped, you&apos;ll receive an email with a tracking number. Track your order anytime on our Track Order page.</p>
        </div>
      </div>
    </div>
  );
}
