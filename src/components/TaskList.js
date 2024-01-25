import React from "react";

export const TaskList = ({ handleTaskClick, tasks }) => {
  return (
    <ol className="task-list">
      {tasks.map((task, index) => (
        <li className="task-element" onClick={handleTaskClick} key={index}>
          {task.taskName}
        </li>
      ))}
    </ol>
  );
};
