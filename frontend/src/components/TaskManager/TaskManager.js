import React, { useState, useEffect } from "react";
import { AddTask } from "./AddTask";
import { TaskMenu } from "./TaskMenu";
import { TaskList } from "./TaskList";
import {
  deleteTask,
  getTasks,
  postTask,
  putTask,
} from "../../utility/fetchTasks";

import "./TaskManager.css";
import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimation";

export const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isTaskMenuVisible, setIsTaskMenuVisible] = useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [areTasksLoading, setAreTasksLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [taskOffsets, setTaskOffsets] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
        setAreTasksLoading(false);
      } catch (error) {
        console.log("Failed to fetch tasks");
        setAreTasksLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (areTasksLoading) return <LoadingAnimation isLoading={isLoading} />;

  const handleAddTask = async (task) => {
    const postedTaskId = await postTask(task);

    setTasks([
      ...tasks,
      { _id: postedTaskId, name: task.name, isCompleted: false },
    ]);
  };

  const handleIsTaskCompleted = (taskIndex) => {
    if (tasks.length > 0 && typeof taskIndex === "number")
      setIsTaskCompleted(tasks[taskIndex].isCompleted);
    else setIsTaskCompleted(false);
  };

  const handleTaskClick = ({ e, _id }) => {
    const currentTaskIndex = tasks.findIndex((task) => task._id === _id);

    setTaskOffsets({ x: e.clientX, y: e.clientY });
    setIsTaskMenuVisible(true);
    setSelectedTaskId(_id);
    handleIsTaskCompleted(currentTaskIndex);
  };

  const handleTaskMenuClose = () => {
    setIsTaskMenuVisible(false);
  };

  const taskMenuOptions = {
    deleteTask: async () => {
      if (typeof selectedTaskId !== "string") return;

      try {
        setIsLoading(true);
        await deleteTask(selectedTaskId);

        setTasks((prevTasks) => [
          ...prevTasks.reduce(
            (accTasks, task) =>
              task._id !== selectedTaskId ? [...accTasks, task] : accTasks,
            []
          ),
        ]);
      } finally {
        setIsLoading(false);
      }
    },

    renameTask: async (newTaskName) => {
      if (newTaskName.trim() === "") return;

      const currentTask = tasks.find((task) => task._id === selectedTaskId);
      currentTask.name = newTaskName;

      try {
        setIsLoading(true);
        await putTask({ selectedTaskId, currentTask });
      } finally {
        setIsLoading(false);
      }
    },

    toCompleteTask: async (isCompleted) => {
      const currentTask = tasks.find((task) => task._id === selectedTaskId);
      currentTask.isCompleted = isCompleted;

      try {
        setIsLoading(true);
        await putTask({ selectedTaskId, currentTask });
      } finally {
        setIsLoading(false);
      }
    },
  };

  return (
    <div className="task-manager-holder">
      <h1>Task Tracker</h1>
      <AddTask onTaskAddition={handleAddTask} />
      <TaskList handleTaskClick={handleTaskClick} tasks={tasks} />
      <TaskMenu
        isVisible={isTaskMenuVisible}
        onTaskMenuClose={handleTaskMenuClose}
        taskOffsets={taskOffsets}
        taskMenuOptions={taskMenuOptions}
        isTaskCompleted={isTaskCompleted}
      />
      <LoadingAnimation isLoading={isLoading} />
    </div>
  );
};
