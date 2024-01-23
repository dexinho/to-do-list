import React, { useState, useRef } from "react";

export const AddTask = ({ onTaskAddition }) => {
  const taskInputRef = useRef(null);
  const [taskInput, setTaskInput] = useState("");

  const handleTaskInput = (e) => {
    setTaskInput(e.target.value);
  };

  const handleTaskAddition = () => {
    if (taskInput.trim() !== "") {
      onTaskAddition(taskInput.trim());
      setTaskInput("");

      taskInputRef.current.focus();
    }
  };

  return (
    <div>
      <input
        value={taskInput}
        onChange={handleTaskInput}
        placeholder="task name"
        type="text"
        ref={taskInputRef}
      ></input>
      <button onClick={handleTaskAddition}>Add Task</button>
    </div>
  );
};
