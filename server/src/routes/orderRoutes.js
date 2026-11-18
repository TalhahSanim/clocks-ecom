// orders -> each route needs login and some need an admin
import express from "express";
import orderController from "../controllers/orderController.js";
import orderPolicy from "../policies/orderPolicy.js";
import { requireAuth, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

export default () => {
  router.use(requireAuth);

  router.post("/", orderPolicy.validateOrder, orderController.createOrder);
  router.get("/my-orders", orderController.getMyOrders);
  router.get("/", requireAdmin, orderController.getAllOrders);
  router.get("/:id", orderController.getOrderById);
  router.patch("/:id/status", [requireAdmin, orderPolicy.validateStatus], orderController.updateStatus);

  return router;
};
