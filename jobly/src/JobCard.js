/** Displays info about a single job */

const JobCard = ({ id, title, salary, equity, company }) => {
    // need to change the following so if it's in company detail page it doesn't show company name
    return (
        <section>
            <Card id={id}>
                <CardBody>
                    <CardTitle className="font-weight-bold text-center">
                        {title}
                    </CardTitle>
                    <CardText className="font-italic">
                        {company.name}
                    </CardText>
                    <ul>
                        <li>Salary: {salary}</li>
                        <li>Equity: {equity}</li>
                    </ul>
                </CardBody>
            </Card>
        </section>
    );
}

export default JobCard;