import Joi from "joi";
import ApiError from "../utilities/ApiError.js";

const CATEGORIES = ["wall", "mantel", "alarm", "floor", "desk", "watch", "hourglass"];

function validateProduct(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(60).required(),
    description: Joi.string().min(3).max(2000).required(),
    category: Joi.string()
      .valid(...CATEGORIES)
      .required(),
    price: Joi.number().min(0).precision(2).required(),
    stock: Joi.number().integer().min(0).required(),
    // The file is req.files and validate by filePolicy
    image: Joi.any(),
  });

  const { error } = schema.validate(req.body);
  if (!error) return next();

  // One message per failed field
  switch (error.details[0].context.key) {
    case "name":
      return next(ApiError.badRequest("Name Must Be 3 To 60 Characters"));
    case "description":
      return next(ApiError.badRequest("Description Must Be 3 To 2000 Characters"));
    case "category":
      return next(ApiError.badRequest(`Category Must Be One Of: ${CATEGORIES.join(", ")}`));
    case "price":
      return next(ApiError.badRequest("Price Must Be a Number, 0 Or More"));
    case "stock":
      return next(ApiError.badRequest("Stock Must Be a Number, 0 or More"));
    default:
      return next(ApiError.badRequest("Please Check Form and Try Again"));
  }
}

export default { validateProduct };
