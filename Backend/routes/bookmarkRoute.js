import express from "express";
import {
  fetch,
  createBookmark,
  updateBookmark,
  deleteBookmark,
  archiveBookmark,
  pinBookmark,
} from "../controller/bookmarkController.js";

const route = express.Router();

route.get("/fetch", fetch);

route.post("/create", createBookmark);

route.put("/update/:id", updateBookmark);

route.put("/archive/:id", archiveBookmark);

route.put("/pin/:id", pinBookmark);

route.delete("/delete/:id", deleteBookmark);

export default route;
