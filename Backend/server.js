const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");
const { send } = require("vite");

app.use(cors());

app.get("/", cors(), async (req, res) => {
  res.send("Working");
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
