import React from "react";
import "./TaskList.css";

export const TaskList = ({ handleTaskClick, tasks }) => {
  return (
    <ol className="task-list">
      {tasks.map((task, index) => (
        <li
          className={`task-element ${task.isCompleted ? "completed" : ""}`}
          onClick={(e) => handleTaskClick({ e, index })}
          key={index}
        >
          {task.name}
        </li>
      ))}
    </ol>
  );
};
