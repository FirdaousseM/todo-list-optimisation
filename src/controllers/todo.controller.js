const express = require("express");
const todoModel = require("../models/todo.model");

const todoController = express();

const controller = {
  createTodo: async (req, res) => {
    try {
      const { title } = req.body;
      const todo = await todoModel.createTodo(title);
      res.status(201).json(todo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getTodos: async (req, res) => {
    try {
      const todos = await todoModel.getTodos();
      res.json(todos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  markTodoDone: async (req, res) => {
    try {
      const id = req.params.id;
      const todo = await todoModel.markTodoDone(id);
      res.json(todo);
    } catch (err) {
      return res.status(404).json({ error: "Not found" });
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = controller;
