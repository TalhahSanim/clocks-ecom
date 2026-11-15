// Actions of product route
import { db } from "../config/db.js";
import ApiError from "../utilities/ApiError.js";
// place image-uploads import

// Firestore document -> plain object with its id
const toProduct = (doc) => ({ id: doc.id, ...doc.data() });

export default {
  // name -> get  clocks -> one category,sorted and limited optionally
  // path -> /api/products
  // request -> GET
  // type -> public
  // description -> sends every clock sorted by name

  async getAllProducts(req, res, next) {
    // Only let known values so the URL cannot ask anything odd
    const SORTS = {
      name: ["name", "asc"],
      price: ["price", "asc"],
      newest: ["createdAt", "desc"],
    };
    const { category, sort = "name" } = req.query;
    const [sortField, sortDirection] = SORTS[sort] || SORTS.name;
    // max is 50 clocks each request to limit data being sent/responded
    const limit = Math.min(req.query.limit || 50, 50);
    try {
      let query = db.collection("products");
      // Filter -> one category  with orderBy on another field which requires composite index -> Category ASC and price ASC or category ASC and createdAt DESC
      if (category && category !== "all") {
        query = query.where("category", "==", category);
      }
      // Sort key
      query = query.orderBy(sortField, sortDirection).limit(limit);

      const snapshot = await query.get();
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
