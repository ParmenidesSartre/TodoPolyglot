const express = require("express");
const todoRouter = express.Router();
const passport = require("passport");
const {
  getTodo,
  addTodo,
  updateTodoDetails,
  deleteTodoItem,
} = require("../controllers/todoController");
const {
  getTodoValidation,
  addTodoValidation,
  updateTodoValidation,
  deleteTodoValidation,
  validate
} = require('../validations/todo/todoValidations');

todoRouter.get(
  "/:todoId",
  passport.authenticate("jwt", { session: false }),
  getTodoValidation,
  validate,
  getTodo
);

todoRouter.post("/", passport.authenticate("jwt", { session: false }), addTodoValidation, validate, addTodo);

todoRouter.put(
  "/:todoId",
  passport.authenticate("jwt", { session: false }),
  updateTodoValidation,
  validate,
  updateTodoDetails
);

todoRouter.delete(
  "/:todoId",
  passport.authenticate("jwt", { session: false }),
  deleteTodoValidation,
  validate,
  deleteTodoItem
);

module.exports = todoRouter;
