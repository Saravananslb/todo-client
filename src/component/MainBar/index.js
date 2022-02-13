import React, { useContext, useEffect, useState } from "react";
import "./mainBar.css";
import { getDaysName, getMonthName } from "../../utills/DateFormat";
// import { tasks } from "../../tests/tasks";
import { TaskList } from "../TaskList/TaskList";
import { TASKS } from "../../constant/Constant";
import { createTodo, getTodo, editTodo, cookies } from "../../service/apiCall";
import {Context} from '../../store/Context';
import { useNavigate } from "react-router-dom";

export const MainBar = ({ tab }) => {
  const [selectAdd, setSelectAdd] = useState(false);
  const [inprogressTask, setInprogressTask] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);
  const [selectedTask, setSelectedTask] = useState({
    task: "",
    key: "",
    image: "",
  });
  const [todo, setTodo] = useState({
    name: "",
    type: "",
  });

  const navigate = useNavigate();

  const { todoUsers } = useContext(Context);

  useEffect(async () => {
    if (!todoUsers.isAuthenticated && !cookies.get('Authorization')) {
      navigate('/signin')
    }
    TASKS.map((item) => {
      if (item.key === tab) {
        setSelectedTask(item);
        setTodo({ ...todo, type: tab });
      }
    });
    getTodos();
  }, [tab]);

  const getTodos = async() => {
    const inProgress = [];
    const completed = [];
    getTodo(tab).then((res) => {
      if (res.data.status) {
        console.log(res)
        res.data.todo.map((item) => {
          if (item.active) {
            inProgress.push(item);
          } else {
            completed.push(item);
          }
        });
        setInprogressTask(inProgress);
        setCompletedTask(completed);
      }
    });
  }

  const updateTodo = async(body) => {
    console.log(body)
    editTodo(body).then(res => {
      console.log(res)
      if(res.data.status) {
        getTodos();
      }
    })
  }

  const handleCreateTodo = async (e) => {
    e.preventDefault(false);
    await createTodo(todo).then((res) => {
      if (res.data.status)
        setTodo({
          name: "",
          type: "",
        });
    });
  };

  return (
    <div className="main-bar">
      <div className="header-container">
        <h1>{selectedTask.task}</h1>
        {selectedTask.key === "myDay" ? (
          <span>
            {getDaysName(new Date().getDay())},{" "}
            {getMonthName(new Date().getMonth())} {new Date().getDate()}
          </span>
        ) : null}
      </div>
      <div className="add-todo-container">
        <form onSubmit={handleCreateTodo}>
          <label htmlFor="enterTask">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              class="bi bi-plus"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </label>
          <input
            type="text"
            placeholder="Add a task"
            id="enterTask"
            className="add-todo-container-input"
            onFocus={() => setSelectAdd(true)}
            onBlur={() => setSelectAdd(false)}
            value={todo.name}
            onChange={(e) => setTodo({ ...todo, name: e.target.value })}
          />
        </form>
        {selectAdd ? (
          <div>
            <span
              style={{ float: "right", fontSize: "14px" }}
              onClick={handleCreateTodo}
            >
              Add
            </span>
          </div>
        ) : null}
      </div>
      {tab === 'assignedToMe' ? <AssignToMe/> : null}
      {inprogressTask.length ? (
        <TaskList taskView={""} tasks={inprogressTask} tab={tab} updateTodo={updateTodo} />
      ) : null}
      {console.log(completedTask)}
      {completedTask.length ? (
        <TaskList taskView={"Completed"} tasks={completedTask} tab={tab} updateTodo={updateTodo} />
      ) : null}
    </div>
  );
};


const AssignToMe = () => {
    return (
      <div className="assigned-container">
        <div>Tasks assigned to you in To Do or Planner show up here</div>
      </div>
    )
}

