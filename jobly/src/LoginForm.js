import React, { useState } from "react";
import { Navigate } from "react-router-dom";

/** Login: displays login form and handles submission */

const LoginForm = ({ login }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    const gatherInput = evt => {
        evt.preventDefault();
        login(formData.username, formData.password);
        setFormData({
            username: "",
            password: ""
        });
        return <Navigate to='/' />;
    };

    return (
        <div>
            <h2>Log In</h2>
            <form onSubmit={gatherInput}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="username"
                        value={formData.username}
                        id="username"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="password"
                        value={formData.password}
                        id="password"
                    />
                </div>
                <button id="signupBtn">Submit</button>
            </form>
        </div>
    );

}

export default LoginForm;