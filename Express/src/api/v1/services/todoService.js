const Todo = require("../models/Todo");

const getTodoById = async (todoId) => {
  const todo = await Todo.findById(todoId);
  if (!todo) {
    const error = new Error("Todo not found.");
    error.statusCode = 404;
    throw error;
  }
  return todo;
};

const createTodo = async (data) => {
  const todo = new Todo(data);
  await todo.save();
  return todo;
};

const updateTodo = async (todoId, data) => {
  const todo = await Todo.findByIdAndUpdate(todoId, data, { new: true });
  if (!todo) {
    const error = new Error("Todo not found.");
    error.statusCode = 404;
    throw error;
  }
  return todo;
};

const deleteTodo = async (todoId) => {
  const result = await Todo.findByIdAndDelete(todoId);
  if (!result) {
    const error = new Error("Todo not found.");
    error.statusCode = 404;
    throw error;
  }
  return result;
};

module.exports = {
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
