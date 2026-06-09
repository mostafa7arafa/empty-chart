import { prisma } from "@/lib/prisma";
import { CountdownDeal } from "@/components/home/CountdownDeal";

export const metadata = { title: "Flash Deals" };

export default async function DealsPage() {
  const deals = await prisma.flashDeal.findMany({
    where: { isActive: true, endDate: { gt: new Date() } },
    include: { product: { include: { brand: true, images: { take: 1 } } } },
    orderBy: { endDate: "asc" },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">Flash Deals <span className="text-3xl">🔥</span></h1>
        <p className="text-[var(--muted-foreground)] text-sm mt-1">Limited time offers - grab them before they&apos;re gone!</p>
      </div>
      {deals.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🕐</p>
          <h3 className="font-bold text-lg mb-2">No active deals right now</h3>
          <p className="text-[var(--muted-foreground)]">Check back soon for amazing offers!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <CountdownDeal
              key={deal.id}
              product={{
                id: deal.product.id, name: deal.product.name, slug: deal.product.slug,
                image: deal.product.images[0]?.url ?? "", originalPrice: deal.product.price,
                dealPrice: deal.dealPrice, brand: deal.product.brand.name,
              }}
              endDate={deal.endDate.toISOString()} stock={deal.stock} sold={deal.sold}
            />
          ))}
        </div>
      )}
    </div>
  );
}
