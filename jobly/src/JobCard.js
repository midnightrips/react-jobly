import React, { useState } from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import JoblyApi from "./api";

/** Displays info about a single job */

const JobCard = ({ curr_user, id, title, salary, equity, companyName, applied = false }) => {
    // const [applied, setApplied] = useState(false);
    //if this job is in the list of applications, set applied to true
    // setApplied(id in curr_user.applications); // causing too many re-renders

    if (id in curr_user.applications) applied = true;

    const gatherInput = async (evt) => {
        evt.preventDefault();
        try {
            const data = await JoblyApi.apply(curr_user.username, id);
            console.log(`Application to job #${data} successful.`);
            // setApplied(true);
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