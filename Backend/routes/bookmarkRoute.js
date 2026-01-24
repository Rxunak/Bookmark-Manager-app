import express from "express";
import { fetch, createBookmark } from "../controller/bookmarkController.js";

const route = express.Router();

route.get("/fetch", fetch);

route.post("/create", createBookmark);

export default route;
