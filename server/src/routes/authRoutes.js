// Auth routes -> Firebase handles register and login in the browser
// Server requires a way to check a token
import express from "express";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

export default () => {
  // GET /api/auth/me -> Who does the token belong to
  router.get("/me", requireAuth, (req, res) => {
    res.send({ uid: req.user.uid, email: req.user.email });
  });
  return router;
};
