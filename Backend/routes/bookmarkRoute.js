import express from "express";
import {
  fetch,
  createBookmark,
  update,
} from "../controller/bookmarkController.js";

const route = express.Router();

route.get("/fetch", fetch);

route.post("/create", createBookmark);

route.put("/update/:id", update);

export default route;
