import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-midnight text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-electric rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold">
                Empty<span className="text-electric">Chart</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Premium home appliances and electronics for the modern Egyptian home. Trusted by over 100,000 customers nationwide.
            </p>
            <div className="flex gap-3">
              {["Facebook", "Instagram", "Twitter", "YouTube"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-electric transition-colors text-xs"
                >
                  {social[0]}
                </Link>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {["All Products", "Air Conditioners", "Refrigerators", "Washing Machines", "TVs", "Kitchen", "Smart Home"].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              {["Help Center", "Track Order", "Returns", "Warranty", "Contact Us", "FAQs"].map((link) => (
                <li key={link}>
                  <Link href="#" className="hover:text-white transition-colors">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>📞 16XXX</li>
              <li>📧 support@emptychart.com</li>
              <li>📍 Cairo, Egypt</li>
              <li className="pt-2">
                <span className="text-xs text-gray-500">Working Hours</span>
                <br />
                Sat - Thu: 9AM - 10PM
              </li>
            </ul>
            <div className="mt-4 flex gap-2">
              <div className="px-3 py-1.5 bg-white/10 rounded-lg text-xs">Visa</div>
              <div className="px-3 py-1.5 bg-white/10 rounded-lg text-xs">MasterCard</div>
              <div className="px-3 py-1.5 bg-white/10 rounded-lg text-xs">Fawry</div>
              <div className="px-3 py-1.5 bg-white/10 rounded-lg text-xs">ValU</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2025 EmptyChart. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
