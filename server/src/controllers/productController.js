// Actions of product route
import { db } from "../config/db.js";
import ApiError from "../utilities/ApiError.js";
// place image-uploads import
import { storageBucketUpload, deleteFileFromBucket } from "../utilities/bucketServices.js";

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

  //  name -> Add a clock
  //  path -> /api/products
  // request -> POST
  // type -> admin
  // description -> Uploads the image then saves the clock and sends the new id
  async postProduct(req, res, next) {
    let image;
    try {
      image = await storageBucketUpload(res.locals.filename);
    } catch (err) {
      return next(ApiError.internal("The Image Could Not Be Uploaded", err));
    }

    try {
      const ref = await db.collection("products").add({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        // Form data is always text so make number a number
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        image,
        createdAt: new Date(),
      });
      res.status(201).send({ id: ref.id });
    } catch (err) {
      next(ApiError.internal("The Clock Could Not Be Saved", err));
    }
  },
  //  name -> edit a clock
  //  path -> /api/products/:id
  //  request -> PUT
  //  type -> admin
  //  description -> saves new details and a new image replaces the old one
  async putProductById(req, res, next) {
    try {
      const ref = await db.collection("products").doc(req.params.id);
      const doc = await ref.get();
      if (!doc.exists) {
        return next(ApiError.notFound("That Clock Doesn't Exist"));
      }

      // Keep the old image unless a new one was sent
      let image = doc.data().image;
      if (res.locals.filename) {
        image = await storageBucketUpload(res.locals.filename);
        await deleteFileFromBucket(doc.data().image);
      }

      await ref.update({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: Number(req.body.price),
        stock: Number(req.body.stock),
        image,
      });
      res.send({ id: ref.id, image });
    } catch (err) {
      next(ApiError.internal("The Clock Could Not Be Updated", err));
    }
  },

  //  name -> delete a clock
  //  path -> /api/products/:id
  //  request -> DELETE
  //  type -> admin
  // description -> deletes the clock and its image
  async deleteProductById(req, res, next) {
    try {
      const ref = db.collection("products").doc(req.params.id);
      const doc = await ref.get();
      if (!doc.exists) {
        return next(ApiError.notFound("That Clock Doesn't Exist"));
      }
      await deleteFileFromBucket(doc.data().image);
      await ref.delete();
      res.send({ message: `${doc.data().name} deleted` });
    } catch (err) {
      next(ApiError.internal("The Clock Could Not Be Deleted", err));
    }
  },
};
