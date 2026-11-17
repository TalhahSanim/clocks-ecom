// Saved for later -> each route needs logged in user
import express from "express";
import savedController from "../controllers/savedController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

export default () => {
  // Runs before any route
  router.use(requireAuth);

  router.get("/", savedController.getSaved);
  router.put("/:clockId", savedController.saveClock);
  router.delete("/:clockId", savedController.removeSaved);

  return router;
};
