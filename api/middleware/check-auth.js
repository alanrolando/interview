import jwt from "jsonwebtoken";
import HttpError from "../models/http-errors.js";
import dotenv from "dotenv";
dotenv.config();

const checkAuth = (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      throw new HttpError("Authentication failed, token not found.", 401);
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decodedToken;

    next();
  } catch (err) {
    return next(
      new HttpError("Authentication failed, user is not logged in.", 401)
    );
  }
};

export default checkAuth;
