import React, { useState } from "react";
import { AddTask } from "./AddTask";
import { TaskMenu } from "./TaskMenu";
import { TaskList } from "../TaskList";

export const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [isTaskMenuVisible, setIsTaskMenuVisible] = useState(false);
  const [taskOffsets, setTaskOffsets] = useState({ x: 0, y: 0 });

  const handleAddTask = (task) => {
    setTasks([...tasks, { taskName: task, isCompleted: false }]);
  };

  const handleTaskClick = (e) => {
    setTaskOffsets({ x: e.clientX, y: e.clientY });
    console.log(taskOffsets);
    setIsTaskMenuVisible(true);
  };

  const handleTaskMenuClose = () => {
    setIsTaskMenuVisible(false);
  };

  return (
    <div>
      <div>Tasks: </div>
      <AddTask onTaskAddition={handleAddTask} />
      <TaskList handleTaskClick={handleTaskClick} tasks={tasks} />
      <TaskMenu
        isVisible={isTaskMenuVisible}
        onClose={handleTaskMenuClose}
        taskOffsets={taskOffsets}
      />
    </div>
  );
};
