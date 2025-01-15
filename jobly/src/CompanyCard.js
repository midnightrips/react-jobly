import React from "react";
import JoblyApi from "./api";
import { useParams } from "react-router";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

/** CompanyCard: displays info about a specific company (in CompanyList) */

const CompanyCard = () => {
    const { handle } = useParams();

    const company = JoblyApi.getCompany(handle);

    return (
        <section>
            <Card>
                <CardBody>
                    <CardTitle className="font-weight-bold text-center">
                        {company.name}
                    </CardTitle>
                    <CardText className="font-italic">{company.description}</CardText>
                </CardBody>
            </Card>
        </section>
    );
}

export default CompanyCard;