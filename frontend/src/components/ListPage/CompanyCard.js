import React from 'react';
import { Link } from 'react-router-dom';
import { useCompanyContext } from '../../context/CompanyContext';
import './CompanyCard.css'; // Import the CSS file

const CompanyCard = ({ company }) => {
  const { deleteCompany } = useCompanyContext();

  const handleDelete = () => {
    // Call the deleteCompany function from the context to delete the company
    deleteCompany(company._id);
  };

  return (
    <div className="company-card">
      <h3>{company.companyName}</h3>
      {/* Display other company data here */}
      <p>Contact Email: {company.contactEmail}</p>
      <p>Company Description: {company.companyDescription}</p>
      <p>State: {company.state}</p>
      <p>City: {company.city}</p>
      <div className="company-actions">
        <Link to={`/edit/${company._id}`}>Edit</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default CompanyCard;
