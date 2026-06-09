import Link from "next/link";
import { Globe, MessageCircle, Camera, PlayCircle, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center">
                <span className="text-navy-900 font-bold text-lg">EC</span>
              </div>
              <div>
                <h2 className="font-bold text-lg">Empty Chart Pro</h2>
                <p className="text-xs text-gray-400">Fill Your Life with the Best</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Egypt&apos;s premier destination for premium home appliances, electronics, and lifestyle goods.
            </p>
            <div className="flex gap-3">
              {[Globe, MessageCircle, Camera, PlayCircle].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-gold-500">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                { label: "All Products", href: "/products" },
                { label: "Flash Deals", href: "/deals" },
                { label: "Bundle Deals", href: "/bundles" },
                { label: "Brands", href: "/brands" },
                { label: "Categories", href: "/categories" },
                { label: "Track Order", href: "/track-order" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-gold-500 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4 text-gold-500">Customer Service</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                { label: "FAQ", href: "/faq" },
                { label: "Shipping Policy", href: "/shipping" },
                { label: "Returns & Refunds", href: "/returns" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Contact Us", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-gold-500 transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4 text-gold-500">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                +20 123 456 7890
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                contact@emptychartpro.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                123 El-Tahrir St., Downtown Cairo, Egypt
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-xs font-medium mb-2">We Accept</h4>
              <div className="flex gap-2">
                {["Visa", "MC", "COD"].map((p) => (
                  <span key={p} className="px-2 py-1 bg-white/10 rounded text-xs">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/10">
          {[
            { icon: "🚚", label: "Free Shipping", desc: "On orders over EGP 500" },
            { icon: "🔒", label: "Secure Payment", desc: "100% protected" },
            { icon: "↩️", label: "Easy Returns", desc: "14-day return policy" },
            { icon: "📞", label: "24/7 Support", desc: "Dedicated support" },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-3 text-center md:text-left">
              <span className="text-2xl">{badge.icon}</span>
              <div>
                <p className="text-sm font-medium text-white">{badge.label}</p>
                <p className="text-xs text-gray-400">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 mt-8 pt-6 border-t border-white/10">
          <p>&copy; {new Date().getFullYear()} Empty Chart Pro. All rights reserved. Made with ❤️ in Egypt.</p>
        </div>
      </div>
    </footer>
  );
}
