// One supabase client for the server -> used only for images
import { createClient } from "@supabase/supabase-js";
import config from "./config.js";

export const supabase = createClient(config.supabase.url, config.supabase.serviceKey, {
  auth: { persistSession: false },
});

export const BUCKET = config.supabase.bucket;
