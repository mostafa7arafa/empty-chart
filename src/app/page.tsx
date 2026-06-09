import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CountdownDeal } from "@/components/home/CountdownDeal";
import { Star, ArrowRight, Truck, Shield, RotateCcw, Headphones } from "lucide-react";
import { formatPrice, calculateDiscount } from "@/lib/utils";

export default async function HomePage() {
  const [categories, banners, featuredProducts, flashDeals, bundles, reviews] = await Promise.all([
    prisma.category.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    prisma.banner.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } }),
    prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: { brand: true, images: { take: 1, orderBy: { sortOrder: "asc" } } },
      take: 8,
    }),
    prisma.flashDeal.findMany({
      where: { isActive: true, endDate: { gt: new Date() } },
      include: { product: { include: { brand: true, images: { take: 1 } } } },
      take: 4,
    }),
    prisma.bundle.findMany({
      where: { isActive: true },
      include: { items: { include: { product: { include: { images: { take: 1 } } } } } },
      take: 3,
    }),
    prisma.review.findMany({
      where: { isApproved: true },
      include: { user: true, product: true },
      orderBy: { createdAt: "desc" },
      take: 4,
    }),
  ]);

  const brands = await prisma.brand.findMany({ where: { isActive: true } });

  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel banners={banners.map((b) => ({ id: b.id, title: b.title, subtitle: b.subtitle ?? "", image: b.image, link: b.link ?? "/products" }))} />

      {/* Trust Indicators */}
      <section className="py-6 border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Truck, label: "Free Shipping", desc: "On orders over EGP 500" },
            { icon: Shield, label: "Secure Payment", desc: "100% protected" },
            { icon: RotateCcw, label: "Easy Returns", desc: "14-day policy" },
            { icon: Headphones, label: "24/7 Support", desc: "Dedicated help" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-gold-500" />
              </div>
              <div>
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-xs text-[var(--muted-foreground)]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Shop by Category</h2>
              <p className="text-[var(--muted-foreground)] text-sm mt-1">Browse our wide range of products</p>
            </div>
            <Link href="/categories" className="flex items-center gap-1 text-sm font-medium text-gold-500 hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/categories/${cat.slug}`} className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-[var(--secondary)]">
                {cat.image && <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 640px) 50vw, 25vw" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="font-semibold text-sm mt-1">{cat.name}</h3>
                  <p className="text-xs text-white/70">{cat.productCount} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Deals */}
      {flashDeals.length > 0 && (
        <section className="py-12 bg-gradient-to-r from-red-600 to-orange-500 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  Flash Deals <span className="text-3xl">🔥</span>
                </h2>
                <p className="text-white/80 text-sm mt-1">Limited time offers - don&apos;t miss out!</p>
              </div>
              <Link href="/deals" className="px-4 py-2 bg-white text-red-600 rounded-xl text-sm font-medium hover:bg-white/90 transition-colors">
                View All Deals
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {flashDeals.map((deal) => (
                <CountdownDeal
                  key={deal.id}
                  product={{
                    id: deal.product.id,
                    name: deal.product.name,
                    slug: deal.product.slug,
                    image: deal.product.images[0]?.url ?? "",
                    originalPrice: deal.product.price,
                    dealPrice: deal.dealPrice,
                    brand: deal.product.brand.name,
                  }}
                  endDate={deal.endDate.toISOString()}
                  stock={deal.stock}
                  sold={deal.sold}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <p className="text-[var(--muted-foreground)] text-sm mt-1">Handpicked by our experts</p>
            </div>
            <Link href="/products" className="flex items-center gap-1 text-sm font-medium text-gold-500 hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <FeaturedProducts products={featuredProducts.map((p) => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            price: p.price,
            originalPrice: p.originalPrice,
            image: p.images[0]?.url ?? "",
            brand: p.brand.name,
            rating: p.rating,
            reviewCount: p.reviewCount,
            badge: p.badge,
            stock: p.stock,
          }))} />
        </div>
      </section>

      {/* Bundle Deals */}
      {bundles.length > 0 && (
        <section className="py-12 bg-[var(--secondary)]">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold">Bundle Deals</h2>
                <p className="text-[var(--muted-foreground)] text-sm mt-1">Save more when you buy together</p>
              </div>
              <Link href="/bundles" className="flex items-center gap-1 text-sm font-medium text-gold-500 hover:underline">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bundles.map((bundle) => (
                <Link key={bundle.id} href={`/bundles/${bundle.slug}`} className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden hover:shadow-xl transition-all group">
                  <div className="relative h-48 bg-gradient-to-r from-navy-900 to-navy-700 p-6 flex items-center justify-center">
                    <div className="flex -space-x-4">
                      {bundle.items.slice(0, 3).map((item) => (
                        <div key={item.id} className="w-20 h-20 rounded-xl bg-white overflow-hidden border-2 border-white relative">
                          {item.product.images[0] && <Image src={item.product.images[0].url} alt={item.product.name} fill className="object-cover" sizes="80px" />}
                        </div>
                      ))}
                    </div>
                    <span className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full">
                      Save {calculateDiscount(bundle.price, bundle.originalPrice)}%
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg group-hover:text-gold-500 transition-colors">{bundle.name}</h3>
                    <p className="text-sm text-[var(--muted-foreground)] mt-1">{bundle.items.length} items included</p>
                    <div className="flex items-baseline gap-2 mt-3">
                      <span className="text-2xl font-bold text-gold-500">{formatPrice(bundle.price)}</span>
                      <span className="text-sm text-[var(--muted-foreground)] line-through">{formatPrice(bundle.originalPrice)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brands */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Top Brands</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {brands.map((brand) => (
              <Link key={brand.id} href={`/products?brand=${brand.slug}`} className="flex items-center justify-center w-28 h-16 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:shadow-md hover:border-gold-500 transition-all px-4">
                <span className="font-bold text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)]">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <section className="py-12 bg-[var(--secondary)]">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-[var(--card)] rounded-2xl p-6 border border-[var(--border)]">
                  <div className="flex gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "fill-gold-500 text-gold-500" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-[var(--muted-foreground)] line-clamp-3 mb-4">{review.comment}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center text-xs font-bold">
                      {review.user.name?.charAt(0) ?? "U"}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{review.user.name}</p>
                      <p className="text-xs text-[var(--muted-foreground)]">{review.product.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-3">Stay Updated</h2>
          <p className="text-gray-400 mb-6">Subscribe to get exclusive deals, new arrivals, and more!</p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500"
            />
            <button type="submit" className="h-12 px-6 bg-gold-500 text-navy-900 rounded-xl font-semibold hover:bg-gold-400 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
