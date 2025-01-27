import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";

/** JobList: displays list of jobs */

const JobList = ({ curr_user }) => {
    const [jobs, setJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!curr_user) {
            navigate("/");
            return;
        }

        const fetchJobs = async () => {
            try {
                const data = await JoblyApi.getJobs({ nameLike: searchTerm });
                setJobs(data);
            } catch (err) {
                console.error("Error fetching jobs", err);
            }
        }
        fetchJobs();
    }, [searchTerm, curr_user, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const search = formData.get("searchTerm").trim();
        setSearchTerm(search);
    }

    const jobCards = jobs.map(job => (
        <JobCard
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            companyName={job.companyName}
        />
    ));

    return (
        <div>
            <form onClick={handleSubmit}>
                <div>
                    <input class="form-control form-control-lg" name="searchTerm" placeholder="Enter search term.." value="" />
                </div>
                <div>
                    <button type="submit" class="btn btn-lg btn-primary">Submit</button>
                </div>
            </form>
            {jobCards}
        </div>
    );
}

export default JobList;