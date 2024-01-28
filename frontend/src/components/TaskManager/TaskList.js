import React from "react";
import "./TaskList.css";

export const TaskList = ({ handleTaskClick, tasks }) => {
  console.log(tasks);
  return (
    <ol className="task-list">
      {tasks.map((task) => (
        <li
          className={`task-element ${task.isCompleted ? "completed" : ""}`}
          onClick={(e) => handleTaskClick({ e, _id: task._id })}
          key={task._id}
        >
          {task.name}
        </li>
      ))}
    </ol>
  );
};
