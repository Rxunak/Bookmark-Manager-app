import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import route from "./routes/bookmarkRoute.js";
import userRoute from "./routes/registerRoute.js";
import cors from "cors";

const app = express();

app.use(bodyParser.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Mongo DB is connected");
    app.listen(PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((error) => console.log(error));

app.use("/api/bookmark", route);

app.use("/api/register", userRoute);
