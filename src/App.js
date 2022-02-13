import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import {Tasks} from './pages/Tasks/index';
import { SignUp } from './pages/SignUp';
import { SignIn } from './pages/SignIn';
import './App.css';
import { useEffect, useState } from 'react';
import { validateUser } from './service/apiCall';
import { Context } from './store/Context';
import { cookies } from './service/apiCall';

function App() {

  const [todoUsers, setTodoUsers] = useState({
    isAuthenticated: false
  })

  useEffect(async() => {
    await validateUser().
    then(res => {
      console.log((res))
      if (res.data.status) {
        cookies.set('Authorization', res.data.authToken);
        cookies.set('userId', res.data.id);
        cookies.set('email', res.data.email);
        cookies.set('name', res.data.name);
        setTodoUsers({ ...todoUsers, isAuthenticated: true})
      }
      else {
        setTodoUsers({ ...todoUsers, isAuthenticated: false})
      }
    })
  }, [])

  return (
    <Context.Provider value={{todoUsers}}>
    <Router>
      <Routes>
        <Route path='/' element={< Home/>}>
        </Route>
        <Route path='/tasks/:tabName' element={<Tasks />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
      </Routes>
    </Router>
    </Context.Provider>
  );
}

export default App;
