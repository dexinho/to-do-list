import React, { useState, useEffect } from "react";
import { AddTask } from "./AddTask";
import { TaskMenu } from "./TaskMenu";
import { TaskList } from "./TaskList";
import { deleteTask, getTasks, postTask, putTask } from "../../utility/fetchTasks";

import "./TaskManager.css";

export const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [isTaskMenuVisible, setIsTaskMenuVisible] = useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [areTasksLoading, setAreTasksLoading] = useState(true);
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

  if (areTasksLoading) return <div>Loading...</div>;

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
    const currentTaskIndex = tasks.find((task) => task._id === _id);

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

      await deleteTask(selectedTaskId)

      setTasks((prevTasks) => [
        ...prevTasks.reduce(
          (accTasks, task) =>
            task._id !== selectedTaskId ? [...accTasks, task] : accTasks,
          []
        ),
      ]);
    },

    renameTask: async (newTaskName) => {
      if (newTaskName.trim() === "") return;

      await putTask(selectedTaskId, newTaskName)

      setTasks((prevTasks) => [
        ...prevTasks.reduce(
          (accTasks, task) =>
            task._id !== selectedTaskId
              ? [
                  ...accTasks,
                  { name: newTaskName.trim(), isCompleted: task.isCompleted },
                ]
              : [...accTasks, task],
          []
        ),
      ]);
    },

    toCompleteTask: async (isCompleted) => {
      
      setTasks((prevTasks) => [
        ...prevTasks.reduce(
          (accTasks, task) =>
            task._id !== selectedTaskId
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
