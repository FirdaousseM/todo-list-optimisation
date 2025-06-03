const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

todoModel = {
  createTodo: async (title) => {
    return await prisma.todo.create({
      data: { title },
    });
  },
  getTodos: async (done) => {
    const whereClause = typeof done === 'boolean' ? { done } : {};
    return await prisma.todo.findMany({ where: whereClause });
  },
  getTodosByDone: async (done) => {
    return await prisma.todo.findMany({
      where: { done },
    });
  },
  markTodoDone: async (id) => {
    return await prisma.todo.update({
      where: { id: parseInt(id) },
      data: { done: true },
    });
  },
};

module.exports = todoModel;
