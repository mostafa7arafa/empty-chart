import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "All Categories" };

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shop by Category</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link key={cat.id} href={`/categories/${cat.slug}`} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[var(--secondary)]">
            {cat.image && <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 50vw, 25vw" />}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-3xl">{cat.icon}</span>
              <h2 className="font-bold text-lg mt-1">{cat.name}</h2>
              <p className="text-sm text-white/70">{cat.productCount} products</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
