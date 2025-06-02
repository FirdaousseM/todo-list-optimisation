const express = require("express");
const app = express();
const port = 3000;

app.get("/todos", (req, res) => {
  res.json("get todos A FAIRE");
});

app.post("/todos", (req, res) => {
  res.json("post todos A FAIRE");
});

app.patch("/todos", (req, res) => {
  res.json("patch todos A FAIRE");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
