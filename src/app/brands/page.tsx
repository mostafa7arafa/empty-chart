import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Brands" };

export default async function BrandsPage() {
  const brands = await prisma.brand.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Our Brands</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {brands.map((brand) => (
          <Link key={brand.id} href={`/products?brand=${brand.slug}`} className="flex flex-col items-center justify-center p-6 bg-[var(--card)] border border-[var(--border)] rounded-2xl hover:shadow-lg hover:border-gold-500 transition-all">
            <span className="font-bold text-lg">{brand.name}</span>
            {brand.description && <p className="text-xs text-[var(--muted-foreground)] mt-1 text-center line-clamp-2">{brand.description}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
