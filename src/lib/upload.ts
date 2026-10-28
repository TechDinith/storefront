export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // strip data:...;base64, prefix
      const base64 = result.split(",")[1] || result;
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export async function uploadToImgBB(file: File): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) {
    throw new Error("ImgBB API key not configured. Set NEXT_PUBLIC_IMGBB_API_KEY in .env.local");
  }
  const base64 = await fileToBase64(file);
  const form = new FormData();
  form.append("image", base64);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: form,
  });
  const json = await res.json();
  if (!json.success) {
    throw new Error(json.error?.message || "Upload failed");
  }
  return json.data.url as string;
}
