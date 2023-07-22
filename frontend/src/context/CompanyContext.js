import React, { createContext, useContext, useState, useEffect} from 'react';

const CompanyContext = createContext();

export const useCompanyContext = () => useContext(CompanyContext);

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const limitPerPage = 5;

  const totalPages = Math.ceil(totalCompanies / limitPerPage);

  // Fetch companies from the API
  const fetchCompanies = async () => {
    try {
      const response = await fetch(`http://localhost:4500/companies/?page=${currentPage}&limit=${limitPerPage}`);
      const data = await response.json();
      setCompanies(data.companies);
      setTotalCompanies(data.total);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  // Add a new company to the companies state and make a POST request to the API
  const addCompany = async (newCompany) => {
    try {
      const response = await fetch('http://localhost:4500/companies/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCompany),
      });
      const data = await response.json();
      setCompanies((prevCompanies) => [...prevCompanies, data]);
      alert("Company Data Added Successfully!")
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  // Update the company in the companies state and make a PUT request to the API
  const updateCompany = async (companyId, updatedCompany) => {
    try {
      const response = await fetch(`http://localhost:4500/companies/${companyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCompany),
      });
      const data = await response.json();
      setCompanies((prevCompanies) =>
        prevCompanies.map((company) =>
          company._id === companyId ? { ...company, ...data } : company
        )
      );
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  // Delete the company from the companies state and make a DELETE request to the API
  const deleteCompany = async (companyId) => {
    try {
      await fetch(`http://localhost:4500/companies/${companyId}`, {
        method: 'DELETE',
      });
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company.id !== companyId)
      );
      fetchCompanies();
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [currentPage]);


  return (
    <CompanyContext.Provider
      value={{
        companies,
        addCompany,
        setCompanies, 
        updateCompany,
        deleteCompany,
        currentPage,
        totalPages,
        handleNextPage,
        handlePreviousPage,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};
