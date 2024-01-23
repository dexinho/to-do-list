import React, { useState } from "react";
import { AddTask } from "./components/AddTask";

export const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleTaskAddition = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <AddTask onTaskAddition={handleTaskAddition} />
      <div>Tasks: </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>{task}</li>
        ))}
      </ol>
    </div>
  );
};
