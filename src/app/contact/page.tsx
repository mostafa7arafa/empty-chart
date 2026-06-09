"use client";

import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-[var(--muted-foreground)]">We&apos;d love to hear from you</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-4">Send us a message</h2>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input type="text" className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input type="email" className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Order Number (optional)</label>
              <input type="text" placeholder="EC-XXXXX" className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <select className="w-full h-10 px-3 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)]">
                <option>General Inquiry</option>
                <option>Order Issue</option>
                <option>Returns & Refunds</option>
                <option>Technical Support</option>
                <option>Partnership</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea rows={5} className="w-full px-3 py-2 border border-[var(--border)] rounded-xl text-sm bg-[var(--background)] resize-none" />
            </div>
            <button type="submit" className="w-full h-11 bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 rounded-xl font-semibold hover:opacity-90">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          {[
            { icon: Phone, title: "Phone", details: ["+20 123 456 7890", "+20 987 654 3210"] },
            { icon: Mail, title: "Email", details: ["contact@emptychartpro.com", "support@emptychartpro.com"] },
            { icon: MapPin, title: "Address", details: ["123 El-Tahrir St.", "Downtown Cairo, Egypt"] },
            { icon: Clock, title: "Working Hours", details: ["Sat - Thu: 9AM - 10PM", "Friday: 2PM - 10PM"] },
          ].map((item) => (
            <div key={item.title} className="flex gap-4 p-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-gold-500" />
              </div>
              <div>
                <h3 className="font-bold mb-1">{item.title}</h3>
                {item.details.map((d) => <p key={d} className="text-sm text-[var(--muted-foreground)]">{d}</p>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
