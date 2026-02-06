import express from "express";
import verifyToken from "../middleware/authMiddleware.js";

const protectedRouter = express.Router();

// Protected route
protectedRouter.get("/", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected route accessed" });
});

export default protectedRouter;
