import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { BundleDetail } from "@/components/bundle/BundleDetail";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const bundle = await prisma.bundle.findUnique({ where: { slug }, select: { name: true, description: true } });
  if (!bundle) return { title: "Bundle Not Found" };
  return { title: bundle.name, description: bundle.description ?? undefined };
}

export default async function BundlePage({ params }: Props) {
  const { slug } = await params;
  const bundle = await prisma.bundle.findUnique({
    where: { slug },
    include: { items: { include: { product: { include: { brand: true, images: { take: 1 } } } } } },
  });
  if (!bundle) notFound();

  return (
    <BundleDetail
      bundle={{
        id: bundle.id, name: bundle.name, slug: bundle.slug, description: bundle.description ?? "",
        price: bundle.price, originalPrice: bundle.originalPrice,
        items: bundle.items.map((i) => ({
          id: i.id, quantity: i.quantity,
          product: { id: i.product.id, name: i.product.name, slug: i.product.slug, price: i.product.price, brand: i.product.brand.name, image: i.product.images[0]?.url ?? "" },
        })),
      }}
    />
  );
}
