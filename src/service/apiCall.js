import Cookies from 'universal-cookie';
import axios from 'axios';
export const cookies = new Cookies();

axios.defaults.baseURL = 'http://localhost:8000/api/v1';

export const signUpUser = async(body) => {
    return await axios.post('/auth/signup', body, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const signInUser = async(body) => {
    return await axios.post('/auth/signin', body, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const validateUser = async() => {
    return await axios.get('/auth/validate', {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookies.get('Authorization')
        }
    });
}

export const createTodo = async(body) => {
    return await axios.post('/todo/create', body, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookies.get('Authorization')
        }
    });
}

export const getTodo = async(type) => {
    return await axios.get(`/todo/get?type=${type}`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookies.get('Authorization')
        }
    });
}

export const editTodo = async(body) => {
    return await axios.put('/todo/edit', body, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookies.get('Authorization')
        }
    });
}