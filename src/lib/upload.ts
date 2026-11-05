
export async function uploadImage(file: File): Promise<string> {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;

  console.log("ImgBB key available:", Boolean(key));

  if (!key) {
    throw new Error("ImgBB API key is not available in the deployed frontend.");
  }

  const body = new FormData();
  body.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${key}`,
    { method: "POST", body }
  );

  const json = await res.json();

  if (!res.ok || !json?.data?.url) {
    throw new Error(json?.error?.message || "Image upload failed.");
  }

  return json.data.url;
}
