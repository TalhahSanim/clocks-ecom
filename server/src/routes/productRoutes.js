// Product Routes -> anyone can read ONLY ADMIN can change

import express from "express";
import ProductController from "../controllers/productController.js";
import ProductPolicy from "../policies/productPolicy.js";
import FilePolicy from "../policies/filePolicy.js";
import fileServerUpload from "../middleware/fileServerUpload.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Image  Types we accept
const IMAGE_TYPES = [".png", ".jpg", ".jpeg", ".webp"];

export default () => {
  // Get All Clocks
  router.get("/", ProductController.getAllProducts);

  // Get One Clock
  router.get("/:id", ProductController.getProductById);

  // Post a new clock which image is required
  router.post(
    "/",
    [
      requireAuth,
      requireAdmin,
      ProductPolicy.validateProduct,
      FilePolicy.filesPayloadExists,
      FilePolicy.fileSizeLimiter,
      FilePolicy.fileExtensionLimiter(IMAGE_TYPES),
      fileServerUpload,
    ],
    ProductController.postProduct
  );

  // PUT changes to clock and new image is optional in this case
  router.put(
    "/:id",
    [
      requireAuth,
      requireAdmin,
      ProductPolicy.validateProduct,
      FilePolicy.fileSizeLimiter,
      FilePolicy.fileExtensionLimiter(IMAGE_TYPES),
      fileServerUpload,
    ],
    ProductController.putProductById
  );

  // Delete Clock and its image
  router.delete("/:id", [requireAuth, requireAdmin], ProductController.deleteProductById);
  return router;
};
