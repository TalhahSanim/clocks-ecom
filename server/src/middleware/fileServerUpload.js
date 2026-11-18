// Saves uploaded image to server/public/uploads for short time
// passes its name on in res.locals.filename
import path from "path";
import ApiError from "../utilities/ApiError.js";

export default function fileServerUpload(req, res, next) {
  const file = req.files?.image;
  // PUT -> without a new image -> NO ACTION
  if (!file) return next();

  // Time first -> No Two Image.jpg overtake one another
  // Odd characters  become "-" which makes url work
  const safeName = path.basename(file.name).replace(/[^a-zA-Z0-9._-]/g, "-");
  const filename = `${Date.now()}_${safeName}`;

  // process.cwd is the server folder
  const uploadPath = path.join(process.cwd(), "public", "uploads", filename);

  file
    .mv(uploadPath)
    .then(() => {
      res.locals.filename = filename;
      next();
    })
    .catch((err) => next(ApiError.internal("Your Image Could Not Be Saved", err)));
}
