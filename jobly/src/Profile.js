import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Form.css";

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
        <div className="Form">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h2 className="mb-3">Profile</h2>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={gatherInput}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="username"><b>Username</b></label>
                                <input
                                    readOnly
                                    disabled
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    id="username"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="firstName"><b>First name</b></label>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    id="firstName"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="lastName"><b>Last name</b></label>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    id="lastName"
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email"><b>Email</b></label>
                                <input
                                    onChange={handleChange}
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    id="email"
                                    className="form-control"
                                />
                            </div>
                            <div className="d-grid">
                                <button className="btn btn-primary">
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;