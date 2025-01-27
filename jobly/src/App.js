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
    if (token) {
      JoblyApi.token = token; // set token globally
    }
  }, [token]);

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

  // Fetch additional user details only after curr_user is set
  useEffect(() => {
    if (!curr_user || !curr_user.username) return; // Wait until curr_user is fully initialized

    console.log(curr_user);

    const fetchUserInfo = async () => {
      try {
        const userInfo = await JoblyApi.getUserInfo(curr_user.username);
        setCurr_User((prevUser) => ({
          ...prevUser,
          ...userInfo, // Merge fetched data into the current user state
        }));
      } catch (err) {
        console.error("Error fetching user info", err);
      }
    };

    fetchUserInfo();
  }, [curr_user?.username]);

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

  const editUser = async (firstName, lastName, email) => {
    try {
      const username = curr_user.username;
      const updatedUser = await JoblyApi.editUserInfo(username, { firstName, lastName, email });
      setCurr_User(updatedUser);
    } catch (err) {
      console.error("Error updating user", err);
    }
  }

  return (
    <div className="App">
      <UserContext.Provider value={{ curr_user, login, signup, logout, editUser }}>
        <BrowserRouter>
          <NavBar curr_user={curr_user} />
          <main>
            <RoutesList signup={signup} login={login} logout={logout} editUser={editUser} curr_user={curr_user} />
          </main>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
