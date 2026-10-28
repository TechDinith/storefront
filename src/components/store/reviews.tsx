"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { fetchReviews, addReview } from "@/lib/firebase/reviews";
import type { Review } from "@/types/review";
import { toast } from "sonner";

export function Reviews({ productId }: { productId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews(productId).then(setReviews);
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const r = await addReview({ productId, userId: "demo", userName: "You", rating, title, body });
      setReviews((prev) => [r as Review, ...prev]);
      setTitle("");
      setBody("");
      toast.success("Review submitted");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed");
    } finally {
      setSubmitting(false);
    }
  };

  const avg = reviews.length ? reviews.reduce((a, b) => a + b.rating, 0) / reviews.length : 0;

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold tracking-tight">Reviews</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {avg.toFixed(1)} out of 5 · {reviews.length} review(s)
      </p>

      <div className="mt-6 grid gap-4">
        {reviews.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`size-4 ${i < r.rating ? "fill-accent text-accent" : "text-muted"}`} />
                ))}
              </div>
              {r.title && <p className="mt-2 font-semibold">{r.title}</p>}
              <p className="mt-1 text-muted-foreground">{r.body}</p>
              <p className="mt-2 text-xs text-muted-foreground">{r.userName}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardContent className="p-6">
          <h3 className="font-semibold">Write a review</h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-3">
            <div>
              <Label>Rating</Label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button type="button" key={i} onClick={() => setRating(i + 1)}>
                    <Star className={`size-5 ${i < rating ? "fill-accent text-accent" : "text-muted"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
              <Label>Review</Label>
              <Textarea value={body} onChange={(e) => setBody(e.target.value)} required />
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit review"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
