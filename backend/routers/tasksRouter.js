const express = require("express");
const tasksController = require("../controllers/tasksController");

const router = express.Router();

router.get("/tasks", tasksController.getTasks);
router.post("/tasks", tasksController.postTask);
router.delete("/tasks:id", tasksController.deleteTask);
router.put("/tasks:id", tasksController.putTask);

module.exports = router;
