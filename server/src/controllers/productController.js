// Actions of product route
import { db } from "../config/db.js";
import ApiError from "../utilities/ApiError.js";
// place image-uploads import

// Firestore document -> plain object with its id
const toProduct = (doc) => ({ id: doc.id, ...doc.data() });

export default {
  // name -> get all clocks
  // path -> /api/products
  // request -> GET
  // type -> public
  // description -> sends every clock sorted by name

  async getAllProducts(req, res, next) {
    try {
      const snapshot = await db
        .collection("products")
        .orderBy("name", "asc")
        .get();
      res.send(snapshot.docs.map(toProduct));
    } catch (err) {
      next(ApiError.internal("The Clock Could Not Be Loaded", err));
    }
  },

  // name -> get one clock
  // path -> /api/products/:id
  // request -> GET
  // type -> public
  // description -> sends one clock or 404 if the ids doesn't exist
  async getProductById(req, res, next) {
    try {
      const doc = await db.collection("products").doc(req.params.id).get();
      if (!doc.exists) {
        return next(ApiError.notFound("This Clock Doesn't Exist"));
      }
      res.send(toProduct(doc));
    } catch (err) {
      next(ApiError.internal("This Clock Could Not Be Loaded", err));
    }
  },
};
