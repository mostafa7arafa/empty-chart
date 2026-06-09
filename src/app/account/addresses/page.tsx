"use client";

import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const demoAddresses = [
  { id: "1", label: "Home", name: "Demo User", address: "123 El-Tahrir St", city: "Cairo", phone: "+20 123 456 7890", isDefault: true },
  { id: "2", label: "Office", name: "Demo User", address: "456 Smart Village, Giza", city: "Giza", phone: "+20 987 654 3210", isDefault: false },
];

export default function AddressesPage() {
  const [addresses] = useState(demoAddresses);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg">Saved Addresses</h2>
        <button className="flex items-center gap-1 text-sm px-4 py-2 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-medium">
          <Plus className="w-4 h-4" /> Add Address
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div key={addr.id} className={`bg-[var(--card)] border rounded-2xl p-5 relative ${addr.isDefault ? "border-gold-500" : "border-[var(--border)]"}`}>
            {addr.isDefault && <span className="absolute top-3 right-3 text-xs px-2 py-0.5 bg-gold-500/10 text-gold-500 rounded-full font-medium">Default</span>}
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-gold-500" />
              <span className="font-bold text-sm">{addr.label}</span>
            </div>
            <div className="text-sm text-[var(--muted-foreground)] space-y-0.5">
              <p>{addr.name}</p>
              <p>{addr.address}</p>
              <p>{addr.city}</p>
              <p>{addr.phone}</p>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex items-center gap-1 text-xs px-3 py-1.5 border border-[var(--border)] rounded-lg hover:bg-[var(--secondary)]">
                <Pencil className="w-3 h-3" /> Edit
              </button>
              {!addr.isDefault && (
                <button className="flex items-center gap-1 text-xs px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
