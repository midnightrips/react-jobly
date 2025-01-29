import React, { useContext, useEffect, useState } from "react";
import JoblyApi from "./api";
import { useNavigate } from "react-router";
import UserContext from "./UserContext";
import CompanyCard from "./CompanyCard";

/** CompanyList: displays list of companies */

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { curr_user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!curr_user) {
            navigate("/");
        }
        const fetchAllCompanies = async () => {
            try {
                const data = await JoblyApi.getCompanies();
                setCompanies(data);
            } catch (err) {
                console.error("Error fetching all jobs", err);
            }
        };

        fetchAllCompanies();
    }, [curr_user, navigate]);

    // Handle input change
    const handleChange = (evt) => {
        setSearchTerm(evt.target.value);
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            const data = await JoblyApi.getCompanies(searchTerm);
            setCompanies(data);
        } catch (err) {
            console.error("Error fetching companies", err);
        }
    };

    // {companies.map(company => (
    //     <Link to={`/companies/${company.handle}`} key={company.handle}>
    //         <ListGroupItem>
    //             <b>{company.name}</b>
    //             <p>{company.description}</p>
    //         </ListGroupItem>
    //     </Link>
    // ))}

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
            {companies.length
                ? (
                    <div>
                        {companies.map(c => (
                            <CompanyCard
                                key={c.handle}
                                handle={c.handle}
                                name={c.name}
                                description={c.description}
                                logoUrl={c.logoUrl}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="lead">Sorry, no results were found!</p>
                )}
        </div>
    );
}

export default CompanyList;