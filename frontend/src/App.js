import React from "react";
import "./style.css";
import "./App.css";
import { TaskManager } from "./components/TaskManager/TaskManager";

export const App = () => {
  return (
    <div className="container">
        <TaskManager />
    </div>
  );
};
