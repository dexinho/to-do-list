import React, { useState } from "react";
import { AddTask } from "./AddTask";
import { TaskMenu } from "./TaskMenu";
import { TaskList } from "./TaskList";

import "./TaskManager.css"

export const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [isTaskMenuVisible, setIsTaskMenuVisible] = useState(false);
  const [taskOffsets, setTaskOffsets] = useState({ x: 0, y: 0 });
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  const handleAddTask = (task) => {
    setTasks([...tasks, { name: task.name, isCompleted: false }]);
  };

  const handleIsTaskCompleted = (index) => {
    if (tasks.length > 0 && typeof index === "number")
      setIsTaskCompleted(tasks[index].isCompleted);
    else setIsTaskCompleted(false);
  };

  const handleTaskClick = ({ e, index }) => {
    setTaskOffsets({ x: e.clientX, y: e.clientY });
    setIsTaskMenuVisible(true);
    setSelectedTaskIndex(index);
    handleIsTaskCompleted(index);
  };

  const handleTaskMenuClose = () => {
    setIsTaskMenuVisible(false);
  };

  const taskMenuOptions = {
    deleteTask: () => {
      if (typeof selectedTaskIndex !== "number") return;

      setTasks((prevTasks) => [
        ...prevTasks.reduce(
          (accTasks, task, index) =>
            index !== selectedTaskIndex ? [...accTasks, task] : accTasks,
          []
        ),
      ]);
    },

    renameTask: (newTaskName) => {
      if (newTaskName.trim() === "") return;

      setTasks((prevTasks) => [
        ...prevTasks.reduce(
          (accTasks, task, index) =>
            index === selectedTaskIndex
              ? [
                  ...accTasks,
                  { name: newTaskName.trim(), isCompleted: task.isCompleted },
                ]
              : [...accTasks, task],
          []
        ),
      ]);
    },

    toCompleteTask: (isCompleted) => {
      setTasks((prevTasks) => [
        ...prevTasks.reduce(
          (accTasks, task, index) =>
            index === selectedTaskIndex
              ? [...accTasks, { name: task.name, isCompleted }]
              : [...accTasks, task],
          []
        ),
      ]);
    },
  };

  return (
    <div className="task-manager-holder">
      <h1>Task Tracker</h1>
      <AddTask onTaskAddition={handleAddTask} />
      <div>{tasks.length > 0 ? "Tasks" : "No tasks"}: </div>
      <TaskList handleTaskClick={handleTaskClick} tasks={tasks} />
      <TaskMenu
        isVisible={isTaskMenuVisible}
        onTaskMenuClose={handleTaskMenuClose}
        taskOffsets={taskOffsets}
        taskMenuOptions={taskMenuOptions}
        isTaskCompleted={isTaskCompleted}
      />
    </div>
  );
};
