import React, { useRef, useState } from "react";
import "./style.css";

export const TaskMenu = ({ onSelectOption }) => {
  const menuRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);

  const handleOptionClick = (option) => {
    onSelectOption(option);
    hideMenu();
  };

  const showMenuAt = (x, y) => {
    menuRef.current.style.left = `${x}px`;
    menuRef.current.style.top = `${y}px`;
    setShowMenu(true);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <div
      ref={menuRef}
      className={`task-menu ${showMenu ? "visible" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <div onClick={() => handleOptionClick("Option 1")}>Finished</div>
      <div onClick={() => handleOptionClick("Option 2")}>Delete</div>
      <div onClick={() => handleOptionClick("Option 3")}>Edit</div>
    </div>
  );
};