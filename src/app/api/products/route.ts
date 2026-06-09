import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "12");
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const sort = searchParams.get("sort") ?? "newest";
  const query = searchParams.get("q");

  const where: Record<string, unknown> = { isActive: true };
  if (category) {
    const cat = await prisma.category.findUnique({ where: { slug: category } });
    if (cat) where.categoryId = cat.id;
  }
  if (brand) {
    const br = await prisma.brand.findUnique({ where: { slug: brand } });
    if (br) where.brandId = br.id;
  }
  if (query) {
    where.OR = [{ name: { contains: query } }, { description: { contains: query } }];
  }

  const orderBy: Record<string, string> =
    sort === "price_asc" ? { price: "asc" } :
    sort === "price_desc" ? { price: "desc" } :
    sort === "rating" ? { rating: "desc" } :
    sort === "popular" ? { salesCount: "desc" } :
    { createdAt: "desc" };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { brand: true, category: true, images: { take: 1 } },
      orderBy,
      take: limit,
      skip: (page - 1) * limit,
    }),
    prisma.product.count({ where }),
  ]);

  return Response.json({ products, total, page, limit, totalPages: Math.ceil(total / limit) });
}
