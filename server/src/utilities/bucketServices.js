// Moves images from server/public/uploads to Supabase storage and deletes them again
import fs from "fs/promises";
import path from "path";
import { supabase, BUCKET } from "../config/supabase.js";

// The image types file policy allows so subases give right type
const CONTENT_TYPES = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp" };

// Upload one file from public/uploads to the bucket and returns with public URL
export async function storageBucketUpload(filename) {
  const serverFilePath = path.join(process.cwd(), "public", "uploads", filename);
  const fileData = await fs.readFile(serverFilePath);

  const { error } = await supabase.storage.from(BUCKET).upload(filename, fileData, {
    contentType: CONTENT_TYPES[path.extname(filename).toLowerCase()],
    upsert: false, // the time in make upload unique
  });
  if (error) throw error;

  // Delete the temporary copy on server
  await fs.unlink(serverFilePath);

  // Example URL -> https://supabase.co/v1/object/clocks/sh3.webp
  return supabase.storage.from(BUCKET).getPublicUrl(filename).data.publicUrl;
}

// Delete a image from the bucket -> given its url
// Seeded clocks are from unsplashed so  we skip them
export async function deleteFileFromBucket(url) {
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  if (!url || !url.includes(marker)) return;
  const name = decodeURIComponent(url.split(marker)[1]);
  const { error } = await supabase.storage.from(BUCKET).remove([name]);
  if (error) throw error;
}
