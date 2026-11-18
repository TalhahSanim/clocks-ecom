// All API routes live under /api
import express from "express";
import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";
import savedRoutes from "./savedRoutes.js";
import orderRoutes from "./orderRoutes.js";

const router = express.Router();

export default () => {
  // Test Route -> http://localhost:3000/api
  router.get("/", (req, res) => res.send("Welcome to Parallel Clock Store's API"));

  router.use("/auth", authRoutes());
  router.use("/products", productRoutes());
  router.use("/saved", savedRoutes());
  router.use("/orders", orderRoutes());

  return router;
};
