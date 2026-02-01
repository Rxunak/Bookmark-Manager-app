import express from "express";
import { createUser } from "../controller/newUserController.js";

const userRoute = express.Router();

userRoute.post("/create", createUser);

export default userRoute;
