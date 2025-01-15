import React, { useState } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";

/** CompanyDetail: displays a company's description and list of jobs at that company */

const CompanyDetail = ({ handle }) => {
    const [jobs, setJobs] = useState([]);
    const [company, setCompany] = useState({});

    try {
        const company = JoblyApi.getCompany(handle);
        setCompany(company);
        setJobs(company.jobs);
    } catch (err) {
        console.error("Error fetching company", err);
    }

    const jobCards = jobs.map(job => (
        <JobCard
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