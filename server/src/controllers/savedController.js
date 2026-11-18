// Saved for later -> a logged in users saved clocks products (users/{uid}/saved)
import { db } from "../config/db.js";
import ApiError from "../utilities/ApiError.js";

// The user saved for later list
const savedRef = (uid) => db.collection("users").doc(uid).collection("saved");

export default {
  // name -> get my saved clocks
  // path -> /api/saved
  // request -> GET
  // type -> logged in
  // description -> newest save first
  async getSaved(req, res, next) {
    try {
      const snapshot = await savedRef(req.user.uid).orderBy("savedAt", "desc").get();
      res.send(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (err) {
      next(ApiError.internal("Your Saved Clocks Could Not Be Loaded", err));
    }
  },

  // name -> save a clock
  // path -> /api/saved/:clockId
  // request -> PUT
  // type -> logged in
  // description -> copies clocks name , price and image into users/{uid}/saved/{id}
  async saveClock(req, res, next) {
    try {
      const clock = await db.collection("products").doc(req.params.clockId).get();
      if (!clock.exists) {
        return next(ApiError.notFound("That Clock Doesn't Exist"));
      }
      const { name, price, image, category, stock } = clock.data();
      const item = { clockId: clock.id, name, price, image, category, stock, savedAt: new Date() };
      // set() with the clocks id: saving twice overwrites
      await savedRef(req.user.uid).doc(clock.id).set(item);
      res.status(201).send({ id: clock.id, ...item });
    } catch (err) {
      next(ApiError.internal("The Clock Could Not Be Saved", err));
    }
  },

  // name -> remove a saved clock
  // path -> /api/saved/:clockId
  // request -> DELETE
  // type -> logged in
  // description -> remove it from the users saved list
  async removeSaved(req, res, next) {
    try {
      await savedRef(req.user.uid).doc(req.params.clockId).delete();
      res.send({ message: "Removed From Saved" });
    } catch (err) {
      next(ApiError.internal("The Clock Could Not Be Removed", err));
    }
  },
};
