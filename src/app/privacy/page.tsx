export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose max-w-none text-[var(--muted-foreground)] space-y-4 text-sm">
        <p>At Empty Chart Pro, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.</p>
        <h2 className="text-lg font-bold text-[var(--foreground)]">Information We Collect</h2>
        <p>We collect information you provide directly: name, email, phone number, shipping address, and payment details when you place an order. We also collect usage data through cookies and analytics tools.</p>
        <h2 className="text-lg font-bold text-[var(--foreground)]">How We Use Your Information</h2>
        <p>We use your information to: process orders, provide customer support, send order updates, improve our services, and with your consent, send promotional communications.</p>
        <h2 className="text-lg font-bold text-[var(--foreground)]">Data Protection</h2>
        <p>All data is encrypted in transit and at rest. Payment information is processed by certified PCI-DSS compliant payment processors. We never store your full credit card number.</p>
        <h2 className="text-lg font-bold text-[var(--foreground)]">Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data. Contact us at privacy@emptychartpro.com for any data-related requests.</p>
        <h2 className="text-lg font-bold text-[var(--foreground)]">Cookies</h2>
        <p>We use essential cookies for site functionality and analytics cookies to understand how visitors use our site. You can manage cookie preferences in your browser settings.</p>
        <p className="text-xs">Last updated: January 2025</p>
      </div>
    </div>
  );
}
