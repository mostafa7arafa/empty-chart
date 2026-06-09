import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      brand: true,
      category: true,
      images: true,
      variants: true,
      specs: true,
      reviews: { include: { user: { select: { name: true } }, photos: true }, orderBy: { createdAt: "desc" } },
      questions: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(product);
}
