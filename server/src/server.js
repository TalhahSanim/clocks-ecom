// Starts Parallel Clocks API
import "dotenv/config";
// Must be first -> loads the env before config.js reads it
import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cors from "cors";
import helmet from "helmet";

import config from "./config/config.js";
import corsOptions from "./config/corsOptions.js";
import { pingDb } from "./config/db.js";
import routes from "./routes/routes.js";
import ApiError from "./utilities/ApiError.js";
import apiErrorHandler from "./middleware/apiErrorHandler.js";

const app = express();

// Security Headers
app.use(helmet());
// React may call API
app.use(cors(corsOptions));
// Reads JSON and form bodies into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Reads uploaded files into req.files
app.use(fileUpload({ createParentPath: true }));
// Log each request -> method, URL, status and time
app.use(morgan("dev"));

// All API routes
app.use("/api", routes());

// No matches -> 404
app.use((req, res, next) => next(ApiError.notFound()));

// Always last -> sends errors back as responses
app.use(apiErrorHandler);

// Start once firestore answers
pingDb.then(() => {
  app.listen(config.port, () =>
    console.log(
      `Parallel Clocks API is running on http://localhost:${config.port}`,
    ),
  );
});
