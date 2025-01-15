import React, { useEffect, useState } from "react";
import JoblyApi from "./api";
import { useParams, Link } from "react-router";
import { ListGroupItem } from "reactstrap";

/** CompanyList: displays list of companies */

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const data = JoblyApi.getCompanies({ nameLike: searchTerm });
                setCompanies(data);
            } catch (err) {
                console.error("Error fetching companies", err);
            }
        }
        fetchCompanies();
    }, [searchTerm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const search = formData.get("searchTerm").trim();
        setSearchTerm(search);
    }

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
            {companies.map(company => (
                <Link to={`/companies/${company.handle}`} key={company.handle}>
                    <ListGroupItem>
                        <b>{company.name}</b>
                        <p>{company.description}</p>
                    </ListGroupItem>

                </Link>
            ))}
        </div>
    );
}

export default CompanyList;