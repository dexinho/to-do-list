const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    required: true,
  },
});

const Tasks = mongoose.model("Tasks", tasksSchema);

module.exports = Tasks;
