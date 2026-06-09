export const metadata = { title: "Returns & Refunds" };

export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Returns & Refund Policy</h1>
      <div className="prose max-w-none text-[var(--muted-foreground)] space-y-4 text-sm">
        <div className="p-4 bg-gold-500/10 border border-gold-500/20 rounded-xl mb-6">
          <p className="font-medium text-[var(--foreground)]">14-Day Return Policy</p>
          <p>Not satisfied with your purchase? Return it within 14 days for a full refund.</p>
        </div>
        <h2 className="text-lg font-bold text-[var(--foreground)]">Return Conditions</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Item must be unused and in its original condition</li>
          <li>Original packaging must be intact with all tags attached</li>
          <li>Include the original receipt or order confirmation</li>
          <li>Return request must be initiated within 14 days of delivery</li>
        </ul>
        <h2 className="text-lg font-bold text-[var(--foreground)]">Non-Returnable Items</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Products that have been installed or used</li>
          <li>Items with removed or altered tags</li>
          <li>Personal care and hygiene products</li>
          <li>Customized or personalized items</li>
        </ul>
        <h2 className="text-lg font-bold text-[var(--foreground)]">How to Return</h2>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Log into your account and go to Order History</li>
          <li>Select the order and click &quot;Request Return&quot;</li>
          <li>Choose items to return and select a reason</li>
          <li>Schedule a pickup or drop off at a collection point</li>
          <li>Once received and inspected, your refund will be processed</li>
        </ol>
        <h2 className="text-lg font-bold text-[var(--foreground)]">Refund Timeline</h2>
        <p>Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be credited to your original payment method.</p>
      </div>
    </div>
  );
}
