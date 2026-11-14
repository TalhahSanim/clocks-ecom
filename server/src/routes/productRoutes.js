// Product Routes -> anyone can read
import express from "express";
import ProductController from "../controllers/productController.js";

const router = express.Router();

export default () => {
  // Get All clocks
  router.get("/", ProductController.getAllProducts);

  // Get One Clock
  router.get("/:id", ProductController.getProductById);

  return router;
};
