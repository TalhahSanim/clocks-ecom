// Login and admin checks for protected routes
import { adminAuth, db } from "../config/db.js";
import ApiError from "../utilities/ApiError.js";

// Checks Firebase Id token in Authorization header and sets req.user
export async function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer") ? header.slice(7) : null;

  if (!token) {
    return next(ApiError.unauthorized("Please Login First"));
  }

  try {
    // Firebase checks the signature and the 1-hour expiry for us
    req.user = await adminAuth.verifyIdToken(token);
    next();
  } catch (err) {
    next(ApiError.unauthorized("Your Login Has Expired, Please Login Again"));
  }
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
