const mongoose = require("mongoose");

const deleteAtPath = (obj, path, index) => {
  if (index === path.length - 1) {
    delete obj[path[index]];
    return;
  }
  if (obj[path[index]]) { // Ensure the sub-object exists before recursing
    deleteAtPath(obj[path[index]], path, index + 1);
  }
};

const toJSON = (schema) => {
  // Preserve existing transform function if one exists
  const existingTransform = schema.options.toJSON && schema.options.toJSON.transform;

  schema.options.toJSON = {
    transform(doc, ret, options) {
      // Iterate over all schema paths and delete any marked as private
      Object.keys(schema.paths).forEach((path) => {
        if (schema.paths[path].options && schema.paths[path].options.private) {
          deleteAtPath(ret, path.split('.'), 0);
        }
      });

      // Replace '_id' with 'id' and remove '_id'
      if (ret._id) {
        ret.id = ret._id.toString();
        delete ret._id;
      }

      // Remove version key and timestamps
      delete ret.__v;
      delete ret.createdAt;
      delete ret.updatedAt;

      // Apply the existing transform function if it exists
      if (existingTransform) {
        return existingTransform(doc, ret, options);
      }
    },
    ...schema.options.toJSON, // Spread existing options to preserve additional settings
  };
};

module.exports = toJSON;
