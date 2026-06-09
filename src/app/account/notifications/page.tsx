"use client";

import { Package, Tag, Star, Truck } from "lucide-react";

const notifications = [
  { id: "1", icon: Package, title: "Order Shipped", message: "Your order EC-2025-002 has been shipped.", time: "2 hours ago", read: false },
  { id: "2", icon: Tag, title: "Flash Deal Alert", message: "Samsung Galaxy S24 Ultra is now 30% off!", time: "5 hours ago", read: false },
  { id: "3", icon: Truck, title: "Order Delivered", message: "Your order EC-2025-001 has been delivered.", time: "2 days ago", read: true },
  { id: "4", icon: Star, title: "Review Reminder", message: "How was the Samsung 65\" QLED TV? Share your experience.", time: "3 days ago", read: true },
];

export default function NotificationsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">Notifications</h2>
        <button className="text-sm text-gold-500 hover:underline">Mark all as read</button>
      </div>
      <div className="space-y-2">
        {notifications.map((n) => (
          <div key={n.id} className={`flex gap-3 p-4 rounded-2xl border transition-colors ${n.read ? "bg-[var(--card)] border-[var(--border)]" : "bg-gold-500/5 border-gold-500/20"}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.read ? "bg-[var(--secondary)]" : "bg-gold-500/10"}`}>
              <n.icon className={`w-5 h-5 ${n.read ? "text-[var(--muted-foreground)]" : "text-gold-500"}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-medium text-sm">{n.title}</p>
                {!n.read && <span className="w-2 h-2 bg-gold-500 rounded-full" />}
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">{n.message}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
        <h3 className="font-bold mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          {[
            { label: "Order Updates", desc: "Shipping and delivery notifications" },
            { label: "Flash Deals", desc: "New deals and limited-time offers" },
            { label: "Wishlist Alerts", desc: "Price drops on wishlist items" },
            { label: "Review Reminders", desc: "Reminders to review purchased items" },
          ].map((pref) => (
            <label key={pref.label} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{pref.label}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{pref.desc}</p>
              </div>
              <input type="checkbox" defaultChecked className="accent-gold-500 w-4 h-4" />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
