// Orders -> place an order -> see orders and admin can see and update each order
import { FieldValue } from "firebase-admin/firestore";
import { db } from "../config/db.js";
import ApiError from "../utilities/ApiError.js";

const ordersRef = db.collection("orders");

// Firestore  gives back timestamps and turns it to normal date
const toOrder = (doc) => ({
  id: doc.id,
  ...doc.data(),
  createdAt: doc.data().createdAt?.toDate() ?? doc.data().createdAt,
});

// Admins can see any order as it uses requireAdmin check
async function isAdmin(uid) {
  const snap = await db.collection("users").doc(uid).get();
  return snap.exists && snap.data().admin === true;
}

export default {
  // name -> place order
  // path -> /api/orders
  // request -> POST
  // type -> logged in
  // description -> check stock then works out the total from fire store prices an saves order and lower stock in one transaction
  async createOrder(req, res, next) {
    const { items, shipping } = req.body;
    try {
      const order = await db.runTransaction(async (transaction) => {
        // Read each clock first before write
        const refs = items.map((item) => db.collection("products").doc(item.id));
        const docs = await transaction.getAll(...refs);

        // Check each one exists and have enough stock
        const orderItems = docs.map((doc, index) => {
          const wanted = items[index].quantity;
          if (!doc.exists)
            throw ApiError.badRequest("A Clock In You Cart No Longer Exists. Please Remove It To Continue");
          const clock = doc.data();
          if (clock.stock < wanted) throw ApiError.badRequest(`Only ${clock.stock} Left of ${clock.name}`);
          return { clockId: doc.id, name: clock.name, price: clock.price, quantity: wanted, image: clock.image };
        });

        // Total from firestore prices rounded to nearest cents
        const total =
          Math.round(orderItems.reduce((sum, orderItem) => sum + orderItem.price * orderItem.quantity, 0) * 100) / 100;

        // Save the order and lower stock
        const orderRef = ordersRef.doc();
        const data = {
          orderNumber: "PC-" + orderRef.id.slice(0, 6).toUpperCase(),
          userId: req.user.uid,
          items: orderItems,
          itemCount: orderItems.reduce((sum, orderItem) => sum + orderItem.quantity, 0),
          total,
          shipping,
          status: "Placed",
          createdAt: new Date(),
        };
        transaction.set(orderRef, data);
        orderItems.forEach((orderItem, index) =>
          transaction.update(refs[index], { stock: FieldValue.increment(-orderItem.quantity) })
        );
        return { id: orderRef.id, ...data };
      });
      res.status(201).send(order);
    } catch (err) {
      // Our own errors such as only 3 remaining which goes to user and anything different is a 500
      if (err instanceof ApiError) return next(err);
      next(ApiError.internal("Your Order Could Not Be Placed", err));
    }
  },

  // name -> my orders
  // path -> /api/orders/my-orders
  // request -> GET
  // type -> logged in
  // description  -> use composite index userID ASC and createdAt DESC
  async getMyOrders(req, res, next) {
    try {
      const snapshot = await ordersRef.where("userId", "==", req.user.uid).orderBy("createdAt", "desc").get();
      res.send(snapshot.docs.map(toOrder));
    } catch (err) {
      next(ApiError.internal("Your Orders Could Not Be Loaded", err));
    }
  },

  // name -> One Order
  // path -> /api/orders/:id
  // request -> GET
  // type -> the orders owner or admin
  // description -> used by the order confirmation page
  async getOrderById(req, res, next) {
    try {
      const doc = await ordersRef.doc(req.params.id).get();
      if (!doc.exists) return next(ApiError.notFound("That Order Doesn't Exist"));
      if (doc.data().userId !== req.user.uid && !(await isAdmin(req.user.uid))) {
        return next(ApiError.forbidden("That Isn't Your Order"));
      }
      res.send(toOrder(doc));
    } catch (err) {
      next(ApiError.internal("The Order Could Not Be Loaded", err));
    }
  },

  // name -> All Orders
  // path -> /api/orders
  // request -> GET
  // type -> admin
  // description -> Newest First one field so composite indexes not required
  async getAllOrders(req, res, next) {
    try {
      const snapshot = await ordersRef.orderBy("createdAt", "desc").limit(100).get();
      res.send(snapshot.docs.map(toOrder));
    } catch (err) {
      next(ApiError.internal("The Orders Could Not Be Loaded", err));
    }
  },

  //  name -> change an orders status
  // path -> /api/orders/:id/status
  // request -> PATCH
  // type -> admin
  // description -> placed shipped or delivered
  async updateStatus(req, res, next) {
    try {
      const ref = ordersRef.doc(req.params.id);
      const doc = await ref.get();
      if (!doc.exists) return next(ApiError.notFound("That Order Doesn't Exist"));
      await ref.update({ status: req.body.status });
      res.send({ id: ref.id, status: req.body.status });
    } catch (err) {
      next(ApiError.internal("The Status Could Not Be Changed", err));
    }
  },
};
