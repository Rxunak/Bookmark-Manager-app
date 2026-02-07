import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const authHeader = req.header("Authorization") || "";
  console.log(authHeader.slice("Bearer ".length));
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : authHeader;
  if (!token) return res.status(401).json({ error: "Access denied" });
  if (!process.env.JWT_SECRET_KEY) {
    return res.status(500).json({ error: "Server misconfiguration" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export default verifyToken;
