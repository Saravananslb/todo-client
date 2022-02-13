import React from "react";
import './taskSideBar.css';
import { TASKS } from "../../constant/Constant";

export const TaskSideBar = ({handleTabChange, tab}) => {
  
  return (
  <div className="task-side-bar">
      {TASKS.map(item => (<div onClick={() => handleTabChange(item.key)} className={tab===item.key ? 'selected' : ''}>{item.image} {item.task}</div>)) }
  </div>
  );
};
