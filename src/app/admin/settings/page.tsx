"use client";

import { Store, CreditCard, Truck, Receipt } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Store Settings</h1>
      <div className="space-y-6">
        {/* Store Info */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Store className="w-5 h-5 text-gold-500" />
            <h2 className="font-bold">Store Information</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Store Name</label>
              <input type="text" defaultValue="Empty Chart Pro" className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tagline</label>
              <input type="text" defaultValue="Fill Your Life with the Best" className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Email</label>
              <input type="email" defaultValue="contact@emptychartpro.com" className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input type="tel" defaultValue="+20 123 456 7890" className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="w-5 h-5 text-gold-500" />
            <h2 className="font-bold">Payment Methods</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Cash on Delivery", enabled: true },
              { label: "Credit/Debit Card (Stripe)", enabled: false },
              { label: "Mobile Wallet (Fawry)", enabled: false },
            ].map((method) => (
              <label key={method.label} className="flex items-center justify-between p-3 border border-[var(--border)] rounded-xl">
                <span className="text-sm">{method.label}</span>
                <input type="checkbox" defaultChecked={method.enabled} className="accent-gold-500 w-4 h-4" />
              </label>
            ))}
          </div>
        </div>

        {/* Shipping */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="w-5 h-5 text-gold-500" />
            <h2 className="font-bold">Shipping Zones</h2>
          </div>
          <div className="space-y-3">
            {[
              { zone: "Cairo & Giza", standard: "Free", express: "EGP 50" },
              { zone: "Alexandria", standard: "EGP 25", express: "EGP 75" },
              { zone: "Other Governorates", standard: "EGP 35", express: "EGP 100" },
            ].map((zone) => (
              <div key={zone.zone} className="flex items-center justify-between p-3 border border-[var(--border)] rounded-xl text-sm">
                <span className="font-medium">{zone.zone}</span>
                <div className="flex gap-4 text-[var(--muted-foreground)]">
                  <span>Standard: {zone.standard}</span>
                  <span>Express: {zone.express}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tax */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Receipt className="w-5 h-5 text-gold-500" />
            <h2 className="font-bold">Tax Settings</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">VAT Rate (%)</label>
              <input type="number" defaultValue="14" className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Default Currency</label>
              <select className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]">
                <option value="EGP">EGP - Egyptian Pound</option>
                <option value="USD">USD - US Dollar</option>
                <option value="SAR">SAR - Saudi Riyal</option>
              </select>
            </div>
          </div>
        </div>

        <button className="px-6 h-11 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-semibold hover:opacity-90">
          Save All Settings
        </button>
      </div>
    </div>
  );
}
