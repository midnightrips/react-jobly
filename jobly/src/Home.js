import "./Home.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

/** Homepage of site.
 *
 * Shows welcome message or login/register buttons.
 *
 * Routed at /
 *
 * Routes -> Homepage
 */

function Homepage() {
    const { curr_user } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", curr_user);

    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 fw-bold">Jobly</h1>
                <p className="lead">All the jobs in one, convenient place.</p>
                {curr_user
                    ? <h2>
                        Welcome Back, {curr_user.firstName || curr_user.username}!
                    </h2>
                    : (
                        <p>
                            <Link className="btn btn-primary fw-bold me-3"
                                to="/login">
                                Log in
                            </Link>
                            <Link className="btn btn-primary fw-bold"
                                to="/signup">
                                Sign up
                            </Link>
                        </p>
                    )}
            </div>
        </div>
    );
}

export default Homepage;