const express = require("express");
const todoRouter = express.Router();
const passport = require("passport");
const {
  getTodo,
  addTodo,
  updateTodoDetails,
  deleteTodoItem,
} = require("../controllers/todoController");

todoRouter.get(
  "/:todoId",
  passport.authenticate("jwt", { session: false }),
  getTodo
);

todoRouter.post("/", passport.authenticate("jwt", { session: false }), addTodo);

todoRouter.put(
  "/:todoId",
  passport.authenticate("jwt", { session: false }),
  updateTodoDetails
);

todoRouter.delete(
  "/:todoId",
  passport.authenticate("jwt", { session: false }),
  deleteTodoItem
);

module.exports = todoRouter;
