import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  if (!query || query.length < 2) return Response.json({ suggestions: [] });

  const [products, categories, brands] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true, name: { contains: query } },
      select: { name: true, slug: true }, take: 5,
    }),
    prisma.category.findMany({
      where: { isActive: true, name: { contains: query } },
      select: { name: true, slug: true }, take: 3,
    }),
    prisma.brand.findMany({
      where: { isActive: true, name: { contains: query } },
      select: { name: true, slug: true }, take: 3,
    }),
  ]);

  return Response.json({
    suggestions: [
      ...products.map((p) => ({ type: "product", name: p.name, slug: p.slug })),
      ...categories.map((c) => ({ type: "category", name: c.name, slug: c.slug })),
      ...brands.map((b) => ({ type: "brand", name: b.name, slug: b.slug })),
    ],
  });
}
