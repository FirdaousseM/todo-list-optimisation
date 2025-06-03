const express = require("express");
const todoModel = require("../models/todo.model");
const logger = require("../logger");

const todoController = express();

const controller = {
  createTodo: async (req, res) => {
    try {
      const { title } = req.body;
      const todo = await todoModel.createTodo(title);
      logger.info("Todo created", { title, id: todo.id }); //Logging structuré
      res.status(201).json(todo);
    } catch (err) {
      logger.error("Failed to create todo", { error: err.message });
      res.status(500).json({ error: err.message });
    }
  },

  getTodos: async (req, res) => {
    try {
      const doneParam = req.query.done;
      let done;
      if (doneParam === 'true') done = true;
      else if (doneParam === 'false') done = false;
      const todos = await todoModel.getTodos(done);
      logger.info("Fetched todos", { count: todos.length });
      res.json(todos);
    } catch (err) {
      logger.error("Failed to fetch todos", { error: err.message });
      res.status(500).json({ error: err.message });
    }
  },

  markTodoDone: async (req, res) => {
    try {
      const id = req.params.id;
      const todo = await todoModel.markTodoDone(id);
      logger.info("Todo marked as done", { id });
      res.json(todo);
    } catch (err) {
      logger.warn("Todo not found", req.params.id);
      //res.status(500).json({ error: err.message });
      return res.status(404).json({ error: "Not found" });
    }
  },
};

module.exports = controller;
