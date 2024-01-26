const Tasks = require("../models/Tasks");

const tasksController = {};

tasksController.getTasks = async (req, res) => {
  try {
    const data = await Tasks.find();
    console.log(data)
    res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    res.status(500).json({ message: "Server error" + err.message });
  }
};

tasksController.postTasks = async (req, res) => {
  const { name, isCompleted } = req.body;

  console.log(req.body);

  if (name === undefined || isCompleted === undefined) return;

  const task = new Tasks({
    name,
    isCompleted,
  });
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error posting data:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = tasksController;
