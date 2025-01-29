import React, { useContext, useEffect, useState } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

/** JobList: displays list of jobs */

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { curr_user } = useContext(UserContext);
    const navigate = useNavigate();

    // Redirect if user is not logged in
    useEffect(() => {
        if (!curr_user) {
            navigate("/");
        }
        const fetchAllJobs = async () => {
            try {
                const data = await JoblyApi.getJobs();
                setJobs(data);
            } catch (err) {
                console.error("Error fetching all jobs", err);
            }
        };

        fetchAllJobs();
    }, [curr_user, navigate]);

    // Handle input change
    const handleChange = (evt) => {
        setSearchTerm(evt.target.value);
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const data = await JoblyApi.getJobs(searchTerm);
            setJobs(data);
        } catch (err) {
            console.error("Error fetching jobs", err);
        }
    };

    const jobCards = jobs.map(job => (
        <div>
            <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                salary={job.salary}
                equity={job.equity}
                companyName={job.companyName}
            />
        </div>
    ));

    return (
        <div className="col-md-8 offset-md-2">
            <form onSubmit={handleSubmit}>
                <div className="row justify-content-center gx-0">
                    <div className="col-8">
                        <input
                            onChange={handleChange}
                            className="form-control form-control-lg"
                            name="searchTerm"
                            placeholder="Enter search term.."
                        />
                    </div>
                    <div className="col-auto">
                        <button
                            type="submit"
                            className="btn btn-lg btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
            {jobs.length
                ? (
                    <div>
                        {jobCards}
                    </div>
                ) : (
                    <p className="lead white-letters">Sorry, no results were found!</p>
                )
            }
        </div>
    );
}

export default JobList;