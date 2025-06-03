const todoController = require("../controllers/todo.controller");
const express = require("express");
const todoRouter = express.Router();

todoRouter.post("/", todoController.createTodo);
todoRouter.get("/", todoController.getTodos);
todoRouter.get("/done", todoController.getTodos);
todoRouter.patch("/:id/done", todoController.markTodoDone);

module.exports = todoRouter;
