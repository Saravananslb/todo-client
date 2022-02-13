import React, { useState } from "react";
import { TaskSideBar } from "../../component/TaskSideBar";
import { MainBar } from "../../component/MainBar";
import './tasks.css';
import { Header } from "../../component/Header";
import { useNavigate } from "react-router-dom";

export const Tasks = () => {
    const [tab, setTab] = useState('myDay');

    const navigate = useNavigate();

    const handleTabChange = (tabName) => {
        setTab(tabName);
        navigate(`/tasks/${tabName}`)
    }

    return (
        <>
        <Header/>
        <div className="tasks-bar-container">
            <div className="tasks-bar">
                <TaskSideBar handleTabChange={handleTabChange} tab={tab} />
            </div>
            <div>
                <MainBar tab={tab} />
            </div>
        </div>
        </>
    )
}