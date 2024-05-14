const Todo = require("../models/Todo");

const getTodos = async ({ filter, sortBy, sortOrder = 'asc', page = 1, limit = 10, ownerId }) => {
  const query = { owner: ownerId, ...filter };
  const options = {
    sort: { [sortBy || 'createdAt']: sortOrder === 'desc' ? -1 : 1 },
    skip: (page - 1) * limit,
    limit,
    populate: 'owner'
  };

  const todos = await Todo.find(query, null, options).populate('owner', 'username email'); 
  const total = await Todo.countDocuments(query);
  return { todos, total, page, limit };
};


const getTodoById = async (todoId, ownerId) => {
  const todo = await Todo.findOne({ _id: todoId, owner: ownerId }).populate('owner', 'email');
  if (!todo) {
    const error = new Error("Todo not found.");
    error.statusCode = 404;
    throw error;
  }
  return todo;
};

const createTodo = async (data, ownerId) => {
  const todo = new Todo({ ...data, owner: ownerId });
  await todo.save();
  return todo;
};

const updateTodo = async (todoId, data, ownerId) => {
  const todo = await Todo.findOneAndUpdate(
    { _id: todoId, owner: ownerId },
    data,
    { new: true }
  );
  if (!todo) {
    const error = new Error("Todo not found.");
    error.statusCode = 404;
    throw error;
  }
  return todo;
};

const deleteTodo = async (todoId, ownerId) => {
  const result = await Todo.findOneAndDelete({ _id: todoId, owner: ownerId });
  if (!result) {
    const error = new Error("Todo not found.");
    error.statusCode = 404;
    throw error;
  }
  return result;
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
