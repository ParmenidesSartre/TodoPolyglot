const {
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../services/todoService");

const getTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const todo = await getTodoById(todoId);
    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};

const addTodo = async (req, res, next) => {
  try {
    const todo = await createTodo(req.body);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

const updateTodoDetails = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const todo = await updateTodo(todoId, req.body);
    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};

const deleteTodoItem = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    await deleteTodo(todoId);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getTodo,
  addTodo,
  updateTodoDetails,
  deleteTodoItem,
};
