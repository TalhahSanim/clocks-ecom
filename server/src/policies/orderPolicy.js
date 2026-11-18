// Joi Rules for orders and it includes at least one item and delivery address
import Joi from "joi";
import ApiError from "../utilities/ApiError.js";

export const statuses = ["Placed", "Shipped", "Delivered"];

function validateOrder(req, res, next) {
  const schema = Joi.object({
    items: Joi.array()
      .items(
        Joi.object({
          id: Joi.string().required(),
          quantity: Joi.number().integer().min(1).max(20).required(),
        })
      )
      .min(1)
      .max(50)
      .required(),
    shipping: Joi.object({
      name: Joi.string().min(2).max(60).required(),
      email: Joi.string().email().required(),
      address: Joi.string().min(5).max(120).required(),
      city: Joi.string().min(2).max(60).required(),
      postcode: Joi.string()
        .pattern(/^\d{4}$/) // Australian postcodes
        .required(),
    }).required(),
  });

  const { error } = schema.validate(req.body);
  if (!error) return next();

  // path where bad field is as where problem is
  const [group, field] = error.details[0].path;
  if (group === "items") return next(ApiError.badRequest("Your Cart Is Empty Or Contains Invalid Quantity"));

  switch (field) {
    case "name":
      return next(ApiError.badRequest("Please Enter Your Full Name"));
    case "email":
      return next(ApiError.badRequest("Please Enter a Valid Email"));
    case "address":
      return next(ApiError.badRequest("Please Enter Your Street Address"));
    case "city":
      return next(ApiError.badRequest("Please Enter Your City"));
    case "postcode":
      return next(ApiError.badRequest("Postcode Must Be 4 Digits"));
    default:
      return next(ApiError.badRequest("Please Validate Your Details and Try Again"));
  }
}

// Admin Status Change
function validateStatus(req, res, next) {
  const { error } = Joi.object({
    status: Joi.string()
      .valid(...statuses)
      .required(),
  }).validate(req.body);
  if (error) return next(ApiError.badRequest(`Status Must Be One Of: ${statuses.join(", ")}`));
  next();
}

export default { validateOrder, validateStatus };
