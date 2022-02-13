import React from "react";
import './home.css';
import { useNavigate } from "react-router-dom";

export const Home = () => {

    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div></div>
            <div>
                <img src="https://res-1.cdn.office.net/todo/452142_2.63.3/icons/welcome-left.png" alt="" className="image-left" />
            </div>
            <div>
                <div>
                    <img src="https://res-1.cdn.office.net/todo/452142_2.63.3/icons/logo.png" alt="" className="logo-home" />
                    <h1>Microsoft To Do</h1>
                    <p>To Do gives you focus, from work to play.</p>
                </div>
                <div>
                    <button className="button-get-started" onClick={() => navigate('/signin')}>Get Started</button>
                </div>
            </div>
            <div>
                <img src="https://res-1.cdn.office.net/todo/452142_2.63.3/icons/welcome-right.png" alt="" className="image-right" />
            </div>
            <div></div>
        </div>
    )
}