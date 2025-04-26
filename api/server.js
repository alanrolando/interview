import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.js";
import dataRoutes from "./routes/data.js";

import HttpError from "./models/http-errors.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/users/", usersRoutes);
app.use("/", dataRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.status || 500)
    .json({ message: error.message || "An unknown error ocurred!" });
});

app.listen(5000, () => {
  console.log("listening on port " + 5000 + "...");
});
