import React from "react";
import { useState } from "react";

/** Signup: displays signup form and handles submission */

const SignupForm = ({ signup }) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
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
        signup({ ...formData });//formData.username, formData.password, formData.firstName, formData.lastName, formData.email);
        setFormData({
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: ""
        });
    };

    return (
        <div>
            <h2>Sign Up</h2>
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
                <div>
                    <label htmlFor="firstName">First name</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        id="firstName"
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last name</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        id="lastName"
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="email"
                        value={formData.email}
                        id="email"
                    />
                </div>
                <button id="signupBtn">Submit</button>
            </form>
        </div>
    );
}

export default SignupForm;