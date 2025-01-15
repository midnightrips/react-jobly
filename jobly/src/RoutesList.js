import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import Jobs from "./Jobs";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";


/** RoutesList: component for all Jobly routes */

const RoutesList = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/companies" element={<CompanyList />} />
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    );
}

export default RoutesList;