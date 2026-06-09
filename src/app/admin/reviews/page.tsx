import { prisma } from "@/lib/prisma";
import { Star, CheckCircle, XCircle, MessageSquare } from "lucide-react";

export const metadata = { title: "Manage Reviews" };

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    include: { user: { select: { name: true } }, product: { select: { name: true, slug: true } } },
    orderBy: { createdAt: "desc" }, take: 20,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Review Moderation</h1>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--secondary)] text-[var(--muted-foreground)]">
              <tr>
                <th className="p-3 text-left font-medium">Product</th>
                <th className="p-3 text-left font-medium">Customer</th>
                <th className="p-3 text-left font-medium">Rating</th>
                <th className="p-3 text-left font-medium">Review</th>
                <th className="p-3 text-left font-medium">Status</th>
                <th className="p-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {reviews.map((review) => (
                <tr key={review.id} className="hover:bg-[var(--secondary)]/50">
                  <td className="p-3 font-medium max-w-[150px] truncate">{review.product.name}</td>
                  <td className="p-3 text-[var(--muted-foreground)]">{review.user.name}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                      <span>{review.rating}</span>
                    </div>
                  </td>
                  <td className="p-3 max-w-[250px]">
                    <p className="truncate text-[var(--muted-foreground)]">{review.comment}</p>
                  </td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${review.isApproved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {review.isApproved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 hover:bg-green-50 text-green-600 rounded-lg" title="Approve"><CheckCircle className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 hover:bg-red-50 text-red-500 rounded-lg" title="Reject"><XCircle className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 hover:bg-[var(--secondary)] rounded-lg" title="Reply"><MessageSquare className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
