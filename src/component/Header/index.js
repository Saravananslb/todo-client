import React from "react";
import './header.css';
import {cookies} from '../../service/apiCall';
import {useNavigate} from 'react-router-dom'

export const Header = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        cookies.remove('Authorization');
        cookies.remove('userId');
        cookies.remove('email');
        cookies.remove('name');
        navigate('/')
    }

    return (
        <div className="todo-header-container">
            <div>To Do</div>
            <div>
                <input type="text" placeholder="Search" />
            </div>
            <div>
                <span>Hi {cookies.get('name')}</span>
                <span style={{float: 'right', marginRight: '10px', cursor: 'pointer'}} onClick={handleLogout}>Logout</span>
            </div>
        </div>
    )
}