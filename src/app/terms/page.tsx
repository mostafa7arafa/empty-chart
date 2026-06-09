export const metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
      <div className="prose max-w-none text-[var(--muted-foreground)] space-y-4 text-sm">
        <p>Welcome to Empty Chart Pro. By accessing and using our website, you agree to be bound by these Terms and Conditions.</p>
        <h2 className="text-lg font-bold text-[var(--foreground)]">1. General</h2>
        <p>These terms govern your use of emptychartpro.com and any related services. We reserve the right to modify these terms at any time.</p>
        <h2 className="text-lg font-bold text-[var(--foreground)]">2. Products & Pricing</h2>
        <p>All prices are listed in Egyptian Pounds (EGP) and include applicable taxes. Prices may change without prior notice. We strive to display accurate information but cannot guarantee all details are error-free.</p>
        <h2 className="text-lg font-bold text-[var(--foreground)]">3. Orders</h2>
        <p>Placing an order constitutes an offer to purchase. We reserve the right to accept or decline any order. Order confirmation will be sent via email.</p>
        <h2 className="text-lg font-bold text-[var(--foreground)]">4. Payments</h2>
        <p>We accept Visa, Mastercard, Cash on Delivery, and mobile wallets. All online payments are processed through secure, encrypted channels.</p>
        <h2 className="text-lg font-bold text-[var(--foreground)]">5. Shipping</h2>
        <p>We deliver across Egypt. Shipping times and costs vary by location and method selected. See our Shipping Policy for details.</p>
        <h2 className="text-lg font-bold text-[var(--foreground)]">6. Returns & Refunds</h2>
        <p>Items may be returned within 14 days of delivery subject to our Returns Policy. Refunds are processed within 5-7 business days.</p>
        <h2 className="text-lg font-bold text-[var(--foreground)]">7. Warranty</h2>
        <p>Products carry their respective manufacturer warranties. Warranty claims should be directed to the brand&apos;s authorized service center.</p>
        <h2 className="text-lg font-bold text-[var(--foreground)]">8. Contact</h2>
        <p>For questions about these terms, contact us at legal@emptychartpro.com</p>
        <p className="text-xs">Last updated: January 2025</p>
      </div>
    </div>
  );
}
