// Last middleware -> turns any error passed to next() into a response
import ApiError from "../utilities/ApiError.js";

export default function apiErrorHandler(err, req, res, next) {
  // Our errors -> send the code and friendly message
  if (err instanceof ApiError) {
    return res.status(err.code).json(err.message);
  }
  // Anything different -> log it but don't show to user
  console.error(err);
  res.status(500).json("Oops!!! Something Went Wrong - Please Try Again Later")

}
