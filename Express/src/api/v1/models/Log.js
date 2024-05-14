const mongoose = require("mongoose");
const toJSON = require("./plugins/toJson");

const logSchema = new mongoose.Schema(
  {
    level: {
      type: String,
      required: true,
      enum: ['info', 'warn', 'error', 'debug'], // Log levels
      default: 'info',
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    meta: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    }
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

// Apply the toJSON plugin to the log schema
logSchema.plugin(toJSON);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
