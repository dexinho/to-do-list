import React, { useRef, useEffect, useState } from "react";
import "./TaskMenu.css";

export const TaskMenu = ({
  isVisible,
  onTaskMenuClose,
  taskOffsets,
  taskMenuOptions,
  isTaskCompleted,
}) => {
  const taskMenuRef = useRef(null);
  const taskMenuRenameInputRef = useRef(null);
  const [taskRename, setTaskRename] = useState("");

  const focusAndClearInput = (input) => {
    input.current.focus();
    input.current.value = "";
  };

  useEffect(() => {
    focusAndClearInput(taskMenuRenameInputRef);
    const handleClickOutside = (e) => {
      if (taskMenuRef.current && !taskMenuRef.current.contains(e.target)) {
        onTaskMenuClose();
      }
    };

    if (isVisible) {
      const menuHeight = parseInt(
        getComputedStyle(taskMenuRef.current).height,
        10
      );
      taskMenuRef.current.style.left = `${taskOffsets.x}px`;
      taskMenuRef.current.style.top = `${taskOffsets.y - menuHeight}px`;
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  const handleTaskMenuOption = (option) => {
    if (option === "Delete") taskMenuOptions.deleteTask();
    else if (option === "Rename") taskMenuOptions.renameTask(taskRename);
    else if (option === "Complete") taskMenuOptions.toCompleteTask(true);
    else if (option === "Incomplete") taskMenuOptions.toCompleteTask(false);

    focusAndClearInput(taskMenuRenameInputRef);
    setTaskRename("");

    onTaskMenuClose();
  };

  const handleTaskRename = (e) => {
    setTaskRename(e.target.value);
  };

  const isCompleted = isTaskCompleted ? "Incomplete" : "Complete";

  return (
    <div
      className={`task-menu ${isVisible ? "visible" : ""}`}
      ref={taskMenuRef}
    >
      <div>Task Menu</div>
      <div>
        <div className="task-rename-holder">
          <div>
            <input
              id="task-rename-input"
              placeholder="new task name"
              ref={taskMenuRenameInputRef}
              onChange={handleTaskRename}
              type="text"
            ></input>
          </div>
          <div
            className="task-menu-option rename-task"
            onClick={() => handleTaskMenuOption("Rename")}
          >
            Rename
          </div>
        </div>
      </div>
      <div
        className="task-menu-option complete-task"
        onClick={() => handleTaskMenuOption(isCompleted)}
      >
        {isCompleted}
      </div>

      <div
        className="task-menu-option delete-task"
        onClick={() => handleTaskMenuOption("Delete")}
      >
        Delete
      </div>
    </div>
  );
};
