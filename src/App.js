import React, { useState } from "react";
import { AddTask } from "./components/AddTask/AddTask";
import { TaskMenu } from "./components/TaskMenu/TaskMenu";

export const App = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskClick = (index, event) => {
    console.log(`Task clicked: ${index}`);
    const x = event.clientX;
    const y = event.clientY;
    setSelectedTask(index);
    setMenuPosition({ x, y });
  };

  const handleMenuOptionSelect = (option) => {
    console.log(`Option selected for task ${selectedTask + 1}: ${option}`);
    // Add your logic for handling menu option selection
    setSelectedTask(null); // Reset selected task
  };

  return (
    <div>
      <h1>Task List App</h1>
      <AddTask onTaskAddition={handleAddTask} />
      <ul>
        {tasks.map((task, index) => (
          <li key={index} onClick={(e) => handleTaskClick(index, e)}>
            {task}
            {selectedTask === index && (
              <TaskMenu
                onSelectOption={handleMenuOptionSelect}
                style={{
                  left: `${menuPosition.x}px`,
                  top: `${menuPosition.y}px`,
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
