import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductDetail } from "@/components/product/ProductDetail";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug }, select: { name: true, description: true } });
  if (!product) return { title: "Product Not Found" };
  return { title: product.name, description: product.description ?? undefined };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      brand: true,
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
      variants: true,
      specs: { orderBy: { sortOrder: "asc" } },
      reviews: {
        where: { isApproved: true },
        include: { user: true, photos: true },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      questions: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  });

  if (!product) notFound();

  const relatedProducts = await prisma.product.findMany({
    where: { categoryId: product.categoryId, id: { not: product.id }, isActive: true },
    include: { brand: true, images: { take: 1 } },
    take: 4,
  });

  return (
    <ProductDetail
      product={{
        id: product.id,
        name: product.name,
        slug: product.slug,
        description: product.description ?? "",
        sku: product.sku,
        price: product.price,
        originalPrice: product.originalPrice,
        brand: { name: product.brand.name, slug: product.brand.slug },
        category: { name: product.category.name, slug: product.category.slug },
        images: product.images.map((i) => ({ url: i.url, alt: i.alt ?? product.name })),
        variants: product.variants.map((v) => ({ id: v.id, name: v.name, value: v.value, price: v.price, stock: v.stock })),
        specs: product.specs.map((s) => ({ name: s.name, value: s.value })),
        rating: product.rating,
        reviewCount: product.reviewCount,
        stock: product.stock,
        badge: product.badge,
        warranty: product.warranty,
        reviews: product.reviews.map((r) => ({
          id: r.id,
          rating: r.rating,
          title: r.title,
          comment: r.comment,
          userName: r.user.name ?? "Anonymous",
          isVerified: r.isVerified,
          helpful: r.helpful,
          createdAt: r.createdAt.toISOString(),
          photos: r.photos.map((p) => p.url),
        })),
        questions: product.questions.map((q) => ({
          id: q.id,
          question: q.question,
          answer: q.answer,
          askedBy: q.askedBy,
        })),
      }}
      relatedProducts={relatedProducts.map((p) => ({
        id: p.id, name: p.name, slug: p.slug, price: p.price,
        originalPrice: p.originalPrice, image: p.images[0]?.url ?? "",
        brand: p.brand.name, rating: p.rating, reviewCount: p.reviewCount,
        badge: p.badge, stock: p.stock,
      }))}
    />
  );
}
