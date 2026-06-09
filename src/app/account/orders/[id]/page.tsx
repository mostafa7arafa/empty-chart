import { CheckCircle, Truck, Package, Clock } from "lucide-react";

export const metadata = { title: "Order Details" };

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Order #{id}</h2>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-[var(--muted-foreground)]">Placed on Jun 8, 2025</span>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">Shipped</span>
        </div>

        {/* Timeline */}
        <div className="flex items-center justify-between mb-6 relative">
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-[var(--border)]" />
          {[
            { icon: CheckCircle, label: "Placed", done: true },
            { icon: CheckCircle, label: "Confirmed", done: true },
            { icon: Truck, label: "Shipped", done: true },
            { icon: Clock, label: "Delivery", done: false },
            { icon: Package, label: "Delivered", done: false },
          ].map((s) => (
            <div key={s.label} className="relative flex flex-col items-center z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.done ? "bg-green-100" : "bg-[var(--secondary)]"}`}>
                <s.icon className={`w-5 h-5 ${s.done ? "text-green-600" : "text-gray-400"}`} />
              </div>
              <span className="text-xs mt-1.5">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Items */}
        <div className="border-t border-[var(--border)] pt-4 space-y-3">
          {[
            { name: "Samsung 65\" QLED 4K Smart TV", qty: 1, price: 24999 },
            { name: "Samsung Soundbar 300W", qty: 1, price: 5999 },
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-[var(--muted-foreground)]">Qty: {item.qty}</p>
              </div>
              <p className="font-medium">EGP {item.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
        <h3 className="font-medium mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Subtotal</span><span>EGP 30,998</span></div>
          <div className="flex justify-between"><span className="text-[var(--muted-foreground)]">Shipping</span><span className="text-green-600">Free</span></div>
          <div className="flex justify-between font-bold text-lg border-t border-[var(--border)] pt-2"><span>Total</span><span>EGP 30,998</span></div>
        </div>
      </div>
    </div>
  );
}
