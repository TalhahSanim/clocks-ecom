// Reads env once and lets  every other file use config.port

export default {
  // The port the api listens on
  port: process.env.PORT || 3000,
  db: {
    // path to private key on json in the server folder
    serviceAccountKey: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  },
  // Supabase storage for clock images
  supabase: {
    url: process.env.SUPABASE_URL,
    serviceKey: process.env.SUPABASE_SERVICE_KEY,
    bucket: process.env.SUPABASE_BUCKET,
  },
  // Websites allowed to call this API
  corsAllowedOptions: [
    process.env.CORS_WHITELIST_1,
    process.env.CORS_WHITELIST_2,
  ],
};
