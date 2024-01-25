import React, { useRef, useEffect } from "react";
import "./TaskMenu.css";

export const TaskMenu = ({ isVisible, onClose, taskOffsets }) => {
  const taskMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (taskMenuRef.current && !taskMenuRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isVisible) {
      taskMenuRef.current.style.left = `${taskOffsets.x}px`;
      taskMenuRef.current.style.top = `${taskOffsets.y}px`;
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div
      className={`task-menu ${isVisible ? "visible" : ""}`}
      ref={taskMenuRef}
    >
      <div>Edit</div>
      <div>Delete</div>
    </div>
  );
};
