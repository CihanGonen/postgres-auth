import {useState} from 'react';
import './App.css';

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

function App() {

  const [user,setUser] = useState({});
  const [loggedIn,setLoggedIn] = useState(false);
  const [curr,setCurr] = useState('register');

  return (
    <div className="container">
  
      <div className="mt-5 mx-auto">
        {loggedIn ? <Dashboard user={user} setLoggedIn={setLoggedIn} /> : 
          <div>
            <div className="d-flex justify-content-center gap-5">
              <button className="btn btn-primary" onClick={()=>setCurr('register')}>Register</button>
              <button className="btn btn-primary" onClick={()=>setCurr('login')}>Login</button>
            </div>
            {curr==='register' ?
              <RegisterForm setCurr = {setCurr} /> :
              <LoginForm setLoggedIn = {setLoggedIn} setUser = {setUser} />
            }  
          </div>
        } 
      </div>

    </div>
  );
}

export default App;
