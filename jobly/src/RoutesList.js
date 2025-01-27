import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Profile from "./Profile";
import JobList from "./JobList";
import Logout from "./Logout";


/** RoutesList: component for all Jobly routes */

const RoutesList = ({ signup, login, logout, editUser, curr_user }) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<CompanyList curr_user={curr_user} />} />
            <Route path="/companies/:handle" element={<CompanyDetail curr_user={curr_user} />} />
            <Route path="/jobs" element={<JobList curr_user={curr_user} />} />
            <Route path="/login" element={<LoginForm login={login} />} />
            <Route path="/signup" element={<SignupForm signup={signup} />} />
            <Route path="/logout" element={<Logout logout={logout} />} />
            <Route path="/profile" element={<Profile editUser={editUser} curr_user={curr_user} />} />
        </Routes>
    );
}

export default RoutesList;