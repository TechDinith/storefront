"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadToImgBB } from "@/lib/upload";
import { toast } from "sonner";

interface Props {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Image" }: Props) {
  const [uploading, setUploading] = useState(false);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        <Input
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="flex-1"
        />
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setUploading(true);
              try {
                const url = await uploadToImgBB(file);
                onChange(url);
                toast.success("Image uploaded");
              } catch (err) {
                toast.error(err instanceof Error ? err.message : "Upload failed");
              } finally {
                setUploading(false);
                e.target.value = "";
              }
            }}
          />
          <Button type="button" variant="outline" disabled={uploading} asChild>
            <span>{uploading ? "Uploading…" : "Upload"}</span>
          </Button>
        </label>
      </div>
      {value && (
        <div className="relative mt-2 h-24 w-24 overflow-hidden rounded-lg border border-border">
          <Image src={value} alt="preview" fill className="object-cover" />
        </div>
      )}
      {!process.env.NEXT_PUBLIC_IMGBB_API_KEY && (
        <p className="text-xs text-muted-foreground">
          Set NEXT_PUBLIC_IMGBB_API_KEY in .env.local to enable uploads (free ImgBB key).
        </p>
      )}
    </div>
  );
}
