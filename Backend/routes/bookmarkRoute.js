import express from "express";
import {
  fetch,
  createBookmark,
  updateBookmark,
  deleteBookmark,
} from "../controller/bookmarkController.js";

const route = express.Router();

route.get("/fetch", fetch);

route.post("/create", createBookmark);

route.put("/update/:id", updateBookmark);

route.delete("/delete/:id", deleteBookmark);

export default route;
