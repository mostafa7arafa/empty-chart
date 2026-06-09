import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { formatPrice, calculateDiscount } from "@/lib/utils";

export const metadata = { title: "Bundle Deals" };

export default async function BundlesPage() {
  const bundles = await prisma.bundle.findMany({
    where: { isActive: true },
    include: { items: { include: { product: { include: { images: { take: 1 } } } } } },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Bundle Deals</h1>
        <p className="text-[var(--muted-foreground)] text-sm mt-1">Save more when you buy together</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bundles.map((bundle) => (
          <Link key={bundle.id} href={`/bundles/${bundle.slug}`} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden hover:shadow-xl transition-all group">
            <div className="relative h-48 bg-gradient-to-r from-navy-900 to-navy-700 p-6 flex items-center justify-center">
              <div className="flex -space-x-4">
                {bundle.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="w-20 h-20 rounded-xl bg-white overflow-hidden border-2 border-white relative">
                    {item.product.images[0] && <Image src={item.product.images[0].url} alt={item.product.name} fill className="object-cover" sizes="80px" />}
                  </div>
                ))}
              </div>
              <span className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                Save {calculateDiscount(bundle.price, bundle.originalPrice)}%
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg group-hover:text-gold-500 transition-colors">{bundle.name}</h3>
              <p className="text-sm text-[var(--muted-foreground)] mt-1 line-clamp-2">{bundle.description}</p>
              <p className="text-xs text-[var(--muted-foreground)] mt-2">{bundle.items.length} items included</p>
              <div className="flex items-baseline gap-2 mt-3">
                <span className="text-2xl font-bold text-gold-500">{formatPrice(bundle.price)}</span>
                <span className="text-sm text-[var(--muted-foreground)] line-through">{formatPrice(bundle.originalPrice)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
