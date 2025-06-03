const todoRouter = require("./routes/todos");
const express = require("express");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();
const port = 3000;

app.use(express.json());
app.use(rateLimiter);

app.use("/todos", todoRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`todo api listening on port ${port}`);
});
