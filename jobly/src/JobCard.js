import React, { useEffect, useState, useContext } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import JoblyApi from "./api";
import UserContext from "./UserContext";
import "./JobCard.css";

/** Displays info about a single job */

const JobCard = ({ id, title, salary, equity, companyName }) => {
    const [applied, setApplied] = useState(false);
    const { curr_user } = useContext(UserContext);

    useEffect(() => {
        if (curr_user.applications.some(jobId => jobId === id)) setApplied(true);
    }, [curr_user.applications]);

    const gatherInput = async (evt) => {
        evt.preventDefault();
        try {
            const data = await JoblyApi.apply(curr_user.username, id);
            console.log(`Application to job #${data} successful.`);
            setApplied(true);
        } catch (err) {
            console.error("Error applying to job", err);
        }
    };

    const formatSalary = (salary) => {
        if (typeof salary !== "number" || isNaN(salary)) return "N/A";
        return `$${salary.toLocaleString("en-US")}`;
    };

    return (
        <section>
            <Card id={id} className="JobCard card">
                <CardBody className="card-body">
                    <CardTitle className="font-weight-bold text-start card-title">
                        <b>{title}</b>
                    </CardTitle>
                    <p className="text-start"><i>{companyName}</i></p>
                    {salary && <div className="text-start"><small >Salary: {formatSalary(salary)}</small></div>}
                    {equity !== undefined && <div className="text-start"><small>Equity: {equity}</small></div>}
                    <button
                        className="btn btn-danger fw-bold text-uppercase float-end"
                        onClick={gatherInput}
                        disabled={applied}
                    >
                        {applied ? "Applied" : "Apply"}
                    </button>
                </CardBody>
            </Card>
        </section>
    );
}

export default JobCard;