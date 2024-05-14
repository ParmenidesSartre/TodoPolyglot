const { body, param, validationResult } = require('express-validator');


const getTodoValidation = [
  param('todoId').isMongoId().withMessage('Invalid todo ID format'),
];


const addTodoValidation = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
];


const updateTodoValidation = [
  param('todoId').isMongoId().withMessage('Invalid todo ID format'),
  body('title').optional().not().isEmpty().withMessage('Title cannot be empty'),
  body('description').optional().isString().withMessage('Description must be a string'),
];


const deleteTodoValidation = [
  param('todoId').isMongoId().withMessage('Invalid todo ID format'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  getTodoValidation,
  addTodoValidation,
  updateTodoValidation,
  deleteTodoValidation,
  validate
};
