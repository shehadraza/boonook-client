export async function uploadImage(file: File): Promise<string> {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key) throw new Error("Image upload key is missing");
  const body = new FormData();
  body.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body });
  const json = await res.json();
  if (!res.ok || !json?.data?.url) throw new Error("Image upload failed. Try a smaller image.");
  return json.data.url as string;
}