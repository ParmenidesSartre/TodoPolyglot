const {
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../services/todoService");

const Log = require("../models/Log");

const logEvent = async (level, message, user = null, meta = {}) => {
  const logEntry = new Log({
    level,
    message,
    user,
    meta
  });
  await logEntry.save();
};

const getTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const ownerId = req.user._id;
    const todo = await getTodoById(todoId, ownerId);
    res.status(200).json(todo);
    logEvent('info', 'Todo retrieved successfully', ownerId, { todoId });
  } catch (err) {
    logEvent('error', 'Failed to retrieve todo', req.user._id, { error: err.message, todoId: req.params.todoId });
    next(err);
  }
};

const addTodo = async (req, res, next) => {
  try {
    const ownerId = req.user._id;
    const todo = await createTodo(req.body, ownerId);
    res.status(201).json(todo);
    logEvent('info', 'Todo created successfully', ownerId, { todoId: todo._id });
  } catch (err) {
    logEvent('error', 'Failed to create todo', req.user._id, { error: err.message });
    next(err);
  }
};

const updateTodoDetails = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const ownerId = req.user._id;
    const todo = await updateTodo(todoId, req.body, ownerId);
    res.status(200).json(todo);
    logEvent('info', 'Todo updated successfully', ownerId, { todoId });
  } catch (err) {
    logEvent('error', 'Failed to update todo', req.user._id, { error: err.message, todoId });
    next(err);
  }
};

const deleteTodoItem = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const ownerId = req.user._id;
    await deleteTodo(todoId, ownerId);
    res.status(204).json();
    logEvent('info', 'Todo deleted successfully', ownerId, { todoId });
  } catch (err) {
    logEvent('error', 'Failed to delete todo', req.user._id, { error: err.message, todoId });
    next(err);
  }
};

module.exports = {
  getTodo,
  addTodo,
  updateTodoDetails,
  deleteTodoItem,
};
