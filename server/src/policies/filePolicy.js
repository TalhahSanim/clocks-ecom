// Checks the uploaded image -> is there one, is it small enough and is it an image
import path from "path";
import ApiError from "../utilities/ApiError.js";

// POST ONLY -> a new clock needs an image
const filesPayloadExists = (req, res, next) => {
  if (!req.files?.image) {
    return next(ApiError.badRequest("Please Select a Image of the clock"));
  }
  next();
};

// Max 5MB Image size
const fileSizeLimiter = (req, res, next) => {
  const MB = 5;
  const FILE_SIZE_LIMIT = MB * 1024 * 1024;
  const file = req.files?.image;
  if (file && file.size > FILE_SIZE_LIMIT) {
    return next(ApiError.tooLarge(`${file.name} Is Over the ${MB} MB Limit`));
  }
  next();
};

// Only file extensions passed in from the route
const fileExtensionLimiter = (allowedExtensionArray) => (req, res, next) => {
  const file = req.files?.image;
  if (file) {
    // .toLowerCase so for example Image.JPG can be accepted as well
    const extension = path.extname(file.name).toLowerCase();
    if (!allowedExtensionArray.includes(extension)) {
      return next(ApiError.cannotProcess(`Only ${allowedExtensionArray.join(", ")} Files Allowed`));
    }
  }
  next();
};

export default { filesPayloadExists, fileSizeLimiter, fileExtensionLimiter };
