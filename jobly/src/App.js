import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import NavBar from './NavBar';
import RoutesList from './RoutesList';
import JoblyApi from './api';
import { jwtDecode } from 'jwt-decode';
import UserContext from './UserContext';
import { useLocalStorage } from './hooks';

function App() {
  const [curr_user, setCurr_User] = useState(null);
  const [token, setToken] = useLocalStorage(null, 'token');

  useEffect(() => {
    if (!token) {
      setCurr_User(null);
      return;
    }

    let payload = jwtDecode(token);
    const { username, isAdmin } = payload; // Extract username and isAdmin from the token

    // Set the current user with username and isAdmin
    setCurr_User({ username, isAdmin });

  }, [token]);

  const login = async (username, password) => {
    try {
      const data = await JoblyApi.authenticate(username, password);
      setToken(data);
    } catch (err) {
      console.error("Error authenticating user", err);
    }
  }

  const signup = async (user) => {
    try {
      const data = await JoblyApi.register(user);
      setToken(data);
    } catch (err) {
      console.error("Error registering user", err);
    }
  }

  const logout = () => {
    setToken(null);
    setCurr_User(null);
  }



  return (
    <div className="App">
      <UserContext.Provider value={{ curr_user, login, signup, logout }}>
        <BrowserRouter>
          <NavBar curr_user={curr_user} />
          <main>
            <RoutesList signup={signup} login={login} logout={logout} />
          </main>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
