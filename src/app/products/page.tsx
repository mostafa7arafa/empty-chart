import { prisma } from "@/lib/prisma";
import { ProductCatalog } from "@/components/catalog/ProductCatalog";

export const metadata = { title: "All Products" };

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const categorySlug = typeof params.category === "string" ? params.category : undefined;
  const brandSlug = typeof params.brand === "string" ? params.brand : undefined;
  const sort = typeof params.sort === "string" ? params.sort : "newest";
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;
  const minPrice = typeof params.minPrice === "string" ? parseFloat(params.minPrice) : undefined;
  const maxPrice = typeof params.maxPrice === "string" ? parseFloat(params.maxPrice) : undefined;
  const minRating = typeof params.minRating === "string" ? parseFloat(params.minRating) : undefined;
  const inStock = params.inStock === "true";
  const onSale = params.onSale === "true";

  const where: Record<string, unknown> = { isActive: true };
  if (categorySlug) {
    const cat = await prisma.category.findUnique({ where: { slug: categorySlug } });
    if (cat) where.categoryId = cat.id;
  }
  if (brandSlug) {
    const br = await prisma.brand.findUnique({ where: { slug: brandSlug } });
    if (br) where.brandId = br.id;
  }
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) (where.price as Record<string, number>).gte = minPrice;
    if (maxPrice !== undefined) (where.price as Record<string, number>).lte = maxPrice;
  }
  if (minRating) where.rating = { gte: minRating };
  if (inStock) where.stock = { gt: 0 };
  if (onSale) where.originalPrice = { not: null };

  const orderBy: Record<string, string> =
    sort === "price_asc" ? { price: "asc" } :
    sort === "price_desc" ? { price: "desc" } :
    sort === "rating" ? { rating: "desc" } :
    sort === "popular" ? { reviewCount: "desc" } :
    { createdAt: "desc" };

  const pageSize = 12;
  const [products, total, categories, brands] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { brand: true, images: { take: 1, orderBy: { sortOrder: "asc" } }, category: true },
      orderBy,
      take: pageSize,
      skip: (page - 1) * pageSize,
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
    prisma.brand.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <ProductCatalog
      products={products.map((p) => ({
        id: p.id, name: p.name, slug: p.slug, price: p.price,
        originalPrice: p.originalPrice, image: p.images[0]?.url ?? "",
        brand: p.brand.name, brandSlug: p.brand.slug,
        category: p.category.name, categorySlug: p.category.slug,
        rating: p.rating, reviewCount: p.reviewCount, badge: p.badge, stock: p.stock,
      }))}
      categories={categories.map((c) => ({ slug: c.slug, name: c.name, count: c.productCount }))}
      brands={brands.map((b) => ({ slug: b.slug, name: b.name }))}
      total={total}
      page={page}
      pageSize={pageSize}
      currentSort={sort}
      currentCategory={categorySlug}
      currentBrand={brandSlug}
    />
  );
}
