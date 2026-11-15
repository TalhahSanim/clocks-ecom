// Login and admin checks for protected routes
import { adminAuth, db } from "../config/db.js";
import ApiError from "../utilities/ApiError.js";

// TTL -> login is accepted for 2 hours then  then a user must login again
// firebase ID tokens expire after 1 hours and refresh automatically
// this caps the whole session
const MAX_SESSION_SECONDS = 60 * 60 * 2;

export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.starWith("Bearer") ? header.slice(7) : null;
  if (!token) return next(ApiError.unauthorized("Please Login First"));

  try {
    req.user = await adminAuth.verifyIdToken(token);
  } catch (err) {
    return next(
      ApiError.unauthorized("Your Login Has Expired, Please Login Again"),
    );
  }

  // auth-time is in seconds whilst Date.now is in milliseconds
  const sessionTime = Math.floor(Date.now() / 1000) - req.user.auth_time;
  if (sessionTime > MAX_SESSION_SECONDS) {
    return next(
      ApiError.unauthorized("Your Session Has Expired, Please Login Again"),
    );
  }
  next();
}

// Only allow users with admin
// Required to run after requireAuth as req.user.uuid needs it
export async function requireAdmin(req, res, next) {
  try {
    const snapshot = await db.collection("users").doc(req.user.uid).get();
    if (snapshot.exists && snapshot.data().admin === true) {
      return next();
    }
    next(ApiError.forbidden("Only Admins ALLOWED"));
  } catch (err) {
    next(ApiError.internal("Could Not Check Your Account", err));
  }
}
