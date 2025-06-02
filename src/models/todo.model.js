const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

todoModel = {
  createTodo: async (title) => {
    return await prisma.todo.create({
      data: { title },
    });
  },
  getTodos: async () => {
    return await prisma.todo.findMany();
  },
  markTodoDone: async (id) => {
    return await prisma.todo.update({
      where: { id: parseInt(id) },
      data: { done: true },
    });
  },
};

module.exports = todoModel;
