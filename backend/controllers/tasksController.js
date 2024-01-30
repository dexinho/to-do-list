const Tasks = require("../models/Tasks");

const tasksController = {};

tasksController.getTasks = async (req, res) => {
  try {
    const data = await Tasks.find();
    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ message: "Server error" + err.message });
  }
};

tasksController.postTask = async (req, res) => {
  const { name, isCompleted } = req.body;

  if (name === undefined || isCompleted === undefined) return;

  const task = new Tasks(req.body);
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error posting data:", err);
    res.status(500).json({ message: "Server error" });
  }
};

tasksController.putTask = async (req, res) => {
  try {
    const updatedTask = await Tasks.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

tasksController.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Tasks.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = tasksController;
