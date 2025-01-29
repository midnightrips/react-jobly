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
        <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            companyName={job.companyName}
        />
    ));

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        onChange={handleChange}
                        className="form-control form-control-lg"
                        name="searchTerm"
                        placeholder="Enter search term.."
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="btn btn-lg btn-primary">
                        Submit
                    </button>
                </div>
            </form>
            {jobCards}
        </div>
    );
}

export default JobList;