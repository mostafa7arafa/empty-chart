import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductCatalog } from "@/components/catalog/ProductCatalog";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = await prisma.category.findUnique({ where: { slug } });
  if (!cat) return { title: "Category Not Found" };
  return { title: cat.name, description: cat.description ?? undefined };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const category = await prisma.category.findUnique({ where: { slug } });
  if (!category) notFound();

  const sort = typeof sp.sort === "string" ? sp.sort : "newest";
  const page = typeof sp.page === "string" ? parseInt(sp.page) : 1;
  const brandSlug = typeof sp.brand === "string" ? sp.brand : undefined;
  const pageSize = 12;

  const where: Record<string, unknown> = { isActive: true, categoryId: category.id };
  if (brandSlug) {
    const br = await prisma.brand.findUnique({ where: { slug: brandSlug } });
    if (br) where.brandId = br.id;
  }

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
      title={category.name}
      products={products.map((p) => ({
        id: p.id, name: p.name, slug: p.slug, price: p.price, originalPrice: p.originalPrice,
        image: p.images[0]?.url ?? "", brand: p.brand.name, brandSlug: p.brand.slug,
        category: p.category.name, categorySlug: p.category.slug,
        rating: p.rating, reviewCount: p.reviewCount, badge: p.badge, stock: p.stock,
      }))}
      categories={categories.map((c) => ({ slug: c.slug, name: c.name, count: c.productCount }))}
      brands={brands.map((b) => ({ slug: b.slug, name: b.name }))}
      total={total} page={page} pageSize={pageSize} currentSort={sort} currentCategory={slug} currentBrand={brandSlug}
    />
  );
}
