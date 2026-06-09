import { prisma } from "@/lib/prisma";
import { ProductCatalog } from "@/components/catalog/ProductCatalog";

export const metadata = { title: "Search Results" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const query = typeof params.q === "string" ? params.q : "";
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;
  const sort = typeof params.sort === "string" ? params.sort : "newest";
  const pageSize = 12;

  const where = query ? {
    isActive: true,
    OR: [
      { name: { contains: query } },
      { description: { contains: query } },
      { brand: { name: { contains: query } } },
      { category: { name: { contains: query } } },
    ],
  } : { isActive: true };

  const orderBy: Record<string, string> =
    sort === "price_asc" ? { price: "asc" } :
    sort === "price_desc" ? { price: "desc" } :
    sort === "rating" ? { rating: "desc" } :
    { createdAt: "desc" };

  const [products, total, categories, brands] = await Promise.all([
    prisma.product.findMany({
      where, include: { brand: true, images: { take: 1 }, category: true },
      orderBy, take: pageSize, skip: (page - 1) * pageSize,
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
    prisma.brand.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <ProductCatalog
      title={query ? `Search results for "${query}"` : "All Products"}
      products={products.map((p) => ({
        id: p.id, name: p.name, slug: p.slug, price: p.price, originalPrice: p.originalPrice,
        image: p.images[0]?.url ?? "", brand: p.brand.name, brandSlug: p.brand.slug,
        category: p.category.name, categorySlug: p.category.slug,
        rating: p.rating, reviewCount: p.reviewCount, badge: p.badge, stock: p.stock,
      }))}
      categories={categories.map((c) => ({ slug: c.slug, name: c.name, count: c.productCount }))}
      brands={brands.map((b) => ({ slug: b.slug, name: b.name }))}
      total={total} page={page} pageSize={pageSize} currentSort={sort}
    />
  );
}
