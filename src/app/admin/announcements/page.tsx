"use client";

import { useEffect, useState } from "react";
import { fetchAnnouncement, saveAnnouncement } from "@/lib/firebase/admin";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminAnnouncementsPage() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncement().then((t) => {
      setText(t);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    await saveAnnouncement(text);
    toast.success("Announcement saved");
  };

  if (loading) return <div className="p-6">Loading…</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold tracking-tight">Announcement banner</h1>
      <Card className="mt-6">
        <CardContent className="space-y-4 p-6">
          <Textarea rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="Announcement text shown in header" />
          <Button onClick={handleSave}>Save</Button>
        </CardContent>
      </Card>
    </div>
  );
}
