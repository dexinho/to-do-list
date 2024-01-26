import React, { useRef, useState } from "react";

import './AddTask.css'

export const AddTask = ({ onTaskAddition }) => {
  const [newTask, setNewTask] = useState({ name: "", isCompleted: false });
  const taskInputRef = useRef(null);

  const handleInputChange = (e) => {
    setNewTask({ name: e.target.value, isCompleted: false });
  };

  const handleAddTask = () => {
    if (newTask.name.trim() !== "") {
      onTaskAddition(newTask);
      setNewTask({ name: "", isCompleted: false });
      taskInputRef.current.focus();
    }
  };

  return (
    <div className="add-task-holder">
      <input
        ref={taskInputRef}
        type="text"
        value={newTask.name}
        onChange={handleInputChange}
        placeholder="Enter task..."
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};
