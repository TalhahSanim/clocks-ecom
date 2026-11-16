// Which website can call this api
import config from "./config.js";

const whiteList = config.corsAllowedOptions;

const corsOptions = {
  origin: (origin, callback) => {
    // On the list or no origin at all includes postman and the server
    if (whiteList.includes(origin) || !origin) callback(null, true);
    // Anyone different block them
    else callback(new Error("Not Allowed By Cors"));
  },
  // Older browsers fail on 204 for a CORS check
  optionsSuccessStatus: 200,
};

export default corsOptions;
