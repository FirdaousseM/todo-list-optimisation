const express = require("express");
const todoRouter = express.Router();

const todoController = require("../controllers/todo.controller");

const validateSchema = require("../middleware/validateSchema");
const validateParams = require("../middleware/validateParams");

const todoSchema = require("../schemas/todo.schema");
const todoIdParamSchema = require("../schemas/todo-id-param.schema");

todoRouter.post("/", validateSchema(todoSchema), todoController.createTodo);
todoRouter.get("/", todoController.getTodos);

// Ajoute la validation des paramètres (id doit être un entier positif sous forme de chaîne)
todoRouter.patch("/:id/done", validateParams(todoIdParamSchema), todoController.markTodoDone);

module.exports = todoRouter;
