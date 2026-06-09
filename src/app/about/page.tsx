import { Truck, Shield, RotateCcw, Headphones, Users, Award, Globe } from "lucide-react";

export const metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3">About Empty Chart Pro</h1>
        <p className="text-lg text-[var(--muted-foreground)]">Fill Your Life with the Best</p>
      </div>

      <div className="prose max-w-none text-[var(--muted-foreground)] space-y-6 mb-12">
        <p>Empty Chart Pro is Egypt&apos;s premier destination for premium home appliances, consumer electronics, and lifestyle goods. Founded with the mission to bring the world&apos;s best products to Egyptian homes, we curate a carefully selected range of top-quality items from leading global brands.</p>
        <p>We believe everyone deserves access to premium products at fair prices. Our team works tirelessly to negotiate the best deals with manufacturers and suppliers, passing the savings directly to our customers.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[
          { icon: Users, value: "50,000+", label: "Happy Customers" },
          { icon: Award, value: "500+", label: "Premium Products" },
          { icon: Globe, value: "10+", label: "Global Brands" },
          { icon: Headphones, value: "24/7", label: "Customer Support" },
        ].map((stat) => (
          <div key={stat.label} className="text-center p-6 bg-[var(--secondary)] rounded-2xl">
            <stat.icon className="w-8 h-8 text-gold-500 mx-auto mb-3" />
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-[var(--muted-foreground)]">{stat.label}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Why Choose Us?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { icon: Truck, title: "Fast & Free Shipping", desc: "Free delivery on orders over EGP 500. Express and same-day options available." },
          { icon: Shield, title: "Genuine Products", desc: "100% authentic products from authorized distributors with full manufacturer warranty." },
          { icon: RotateCcw, title: "Easy Returns", desc: "14-day hassle-free return policy. No questions asked." },
          { icon: Headphones, title: "Expert Support", desc: "Our knowledgeable team is available 24/7 to help you make the right choice." },
        ].map((item) => (
          <div key={item.title} className="flex gap-4 p-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl">
            <item.icon className="w-6 h-6 text-gold-500 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
