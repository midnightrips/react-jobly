import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";
import { useNavigate, useParams } from "react-router-dom";

/** CompanyDetail: displays a company's description and list of jobs at that company */

const CompanyDetail = ({ curr_user }) => {
    const params = useParams();
    const handle = params.handle;
    const [jobs, setJobs] = useState([]);
    const [company, setCompany] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!curr_user) {
            navigate("/");
            return;
        }

        const fetchCompany = async () => {
            try {
                const company = await JoblyApi.getCompany(handle);
                setCompany(company);
                setJobs(company.jobs);
            } catch (err) {
                console.error("Error fetching company", err);
            }
        }
        fetchCompany();
    }, [handle, curr_user, navigate]);

    const jobCards = jobs.map(job => (
        <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            company={job.company}
        />
    ));

    return (
        <div>
            <h3>{company.name}</h3>
            <p>{company.description}</p>
            <div>
                {jobCards}
            </div>
        </div>
    );

}

export default CompanyDetail;