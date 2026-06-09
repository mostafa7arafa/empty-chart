"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { category: "Orders & Shipping", items: [
    { q: "How long does delivery take?", a: "Standard delivery takes 5-7 business days. Express delivery takes 2-3 business days. Same-day delivery is available in Cairo for orders placed before 2 PM." },
    { q: "Is shipping free?", a: "Yes! We offer free standard shipping on all orders over EGP 500. Orders below this amount have a flat shipping fee of EGP 35." },
    { q: "Can I track my order?", a: "Absolutely! Once your order is shipped, you'll receive a tracking number via email. You can also track your order on our Track Order page." },
    { q: "Do you deliver outside Egypt?", a: "Currently, we deliver across all governorates in Egypt. International shipping is coming soon." },
  ]},
  { category: "Returns & Refunds", items: [
    { q: "What is your return policy?", a: "We offer a 14-day return policy. Items must be unused, in original packaging, with all tags attached." },
    { q: "How do I initiate a return?", a: "Go to your order history, select the order, and click 'Request Return'. Our team will guide you through the process." },
    { q: "When will I receive my refund?", a: "Refunds are processed within 5-7 business days after we receive the returned item." },
  ]},
  { category: "Payments", items: [
    { q: "What payment methods do you accept?", a: "We accept Visa, Mastercard, Cash on Delivery (COD), Vodafone Cash, and Fawry." },
    { q: "Is it safe to pay online?", a: "Yes, all transactions are encrypted with 256-bit SSL. We never store your card information." },
  ]},
  { category: "Products", items: [
    { q: "Are all products genuine?", a: "Yes, we only sell 100% authentic products from authorized distributors with full manufacturer warranty." },
    { q: "Do products come with a warranty?", a: "Yes, all products include the manufacturer's warranty. Warranty duration varies by product and brand." },
  ]},
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    const next = new Set(openItems);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setOpenItems(next);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
        <p className="text-[var(--muted-foreground)]">Find answers to common questions</p>
      </div>

      {faqs.map((section) => (
        <div key={section.category} className="mb-8">
          <h2 className="font-bold text-lg mb-4 text-gold-500">{section.category}</h2>
          <div className="space-y-2">
            {section.items.map((item) => {
              const key = `${section.category}-${item.q}`;
              const isOpen = openItems.has(key);
              return (
                <div key={key} className="border border-[var(--border)] rounded-xl overflow-hidden">
                  <button onClick={() => toggle(key)} className="w-full flex items-center justify-between p-4 text-left hover:bg-[var(--secondary)] transition-colors">
                    <span className="font-medium text-sm">{item.q}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && <div className="px-4 pb-4 text-sm text-[var(--muted-foreground)]">{item.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
