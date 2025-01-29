import React, { useEffect, useState, useContext } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import JoblyApi from "./api";
import UserContext from "./UserContext";

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
        } catch (err) {
            console.error("Error applying to job", err);
        }
    };
    // need to change the following so if it's in company detail page it doesn't show company name
    return (
        <section>
            <Card id={id}>
                <CardBody>
                    <CardTitle className="font-weight-bold text-center">
                        {title}
                    </CardTitle>
                    <CardText className="font-italic">
                        {companyName}
                    </CardText>
                    <ul>
                        <li>Salary: {salary}</li>
                        <li>Equity: {equity}</li>
                    </ul>
                    {applied ?
                        <button disabled>Applied</button>
                        :
                        <form onSubmit={gatherInput}>
                            <button>Apply</button>
                        </form>
                    }
                </CardBody>
            </Card>
        </section>
    );
}

export default JobCard;