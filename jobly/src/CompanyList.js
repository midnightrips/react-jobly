import React, { useContext, useEffect, useState } from "react";
import JoblyApi from "./api";
import { Link, useNavigate } from "react-router";
import { ListGroupItem } from "reactstrap";
import UserContext from "./UserContext";

/** CompanyList: displays list of companies */

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { curr_user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!curr_user) {
            navigate("/");
            return;
        }

        const fetchCompanies = async () => {
            try {
                const data = await JoblyApi.getCompanies({ nameLike: searchTerm });
                setCompanies(data);
            } catch (err) {
                console.error("Error fetching companies", err);
            }
        }
        fetchCompanies();
    }, [searchTerm, curr_user, navigate]);

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
                    <input className="form-control form-control-lg" name="searchTerm" placeholder="Enter search term.." value="" />
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