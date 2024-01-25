import React, { useState } from "react";

export const AddTask = ({ onTaskAddition }) => {
  const [newTask, setNewTask] = useState("");

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      onTaskAddition(newTask);
      setNewTask("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Enter task..."
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};
