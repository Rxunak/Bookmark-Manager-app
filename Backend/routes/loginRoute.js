import express from "express";
import { loginUser } from "../controller/loginController.js";

const loginRoute = express.Router();

loginRoute.post("/loginUser", loginUser);

export default loginRoute;
