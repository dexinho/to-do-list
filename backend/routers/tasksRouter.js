const express = require("express");
const tasksController = require("../controllers/tasksController");

const router = express.Router();

router.get("/tasks", tasksController.getTasks);
router.post("/tasks", tasksController.postTasks);
// router.delete("/tasks:id", tasksController.deleteTask);
// router.put("/tasksLid", tasksController.updateTask);

module.exports = router;
