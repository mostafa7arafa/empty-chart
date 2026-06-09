import { Star } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "My Reviews" };

export default function ReviewsPage() {
  const reviews = [
    { id: "1", product: "Samsung 65\" QLED 4K Smart TV", slug: "samsung-65-qled-4k-smart-tv", rating: 5, date: "Jun 1, 2025", text: "Absolutely stunning picture quality! Best TV I've ever owned." },
    { id: "2", product: "LG InstaView Refrigerator", slug: "lg-instaview-refrigerator-626l", rating: 4, date: "May 15, 2025", text: "Great fridge with smart features. The InstaView panel is very convenient." },
  ];

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">My Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5">
            <Link href={`/products/${review.slug}`} className="font-medium text-sm hover:text-gold-500">{review.product}</Link>
            <div className="flex items-center gap-1 my-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-gold-500 text-gold-500" : "text-gray-200"}`} />
              ))}
              <span className="text-xs text-[var(--muted-foreground)] ml-2">{review.date}</span>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
