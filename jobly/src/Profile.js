import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

/** Profile: displays user details via edit user form and handles submission */

const Profile = ({ editUser, curr_user }) => {
    const [formData, setFormData] = useState({
        username: curr_user.username,
        firstName: curr_user.firstName,
        lastName: curr_user.lastName,
        email: curr_user.email
    });
    const navigate = useNavigate();

    if (!curr_user) return <Navigate to="/" />;

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    const gatherInput = async (evt) => {
        evt.preventDefault();
        try {
            // Update user globally
            await editUser(formData.firstName, formData.lastName, formData.email);

            // Update the current user data in the form
            setFormData({
                username: formData.username,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
            });

            navigate("/");
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={gatherInput}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        readOnly
                        type="text"
                        name="username"
                        value={formData.username}
                        id="username"
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
                <button id="editBtn">Save Changes</button>
            </form>
        </div>
    );
}

export default Profile;