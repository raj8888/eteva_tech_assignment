import React, { useState, useEffect } from 'react';
import { useCompanyContext } from '../../context/CompanyContext';
import CompanyCard from './CompanyCard';

const ListPage = () => {
  const { companies, setCompanies, currentPage, totalPages, handleNextPage, handlePreviousPage } = useCompanyContext();
  const limitPerPage = 5;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalSearchResults, setTotalSearchResults] = useState(0);

  useEffect(() => {
    if (searchQuery) {
      const filteredCompanies = companies.filter((company) =>
        company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredCompanies);
      setTotalSearchResults(filteredCompanies.length);
    } else {
      setSearchResults([]);
      setTotalSearchResults(0);
    }
  }, [searchQuery, companies]);

  useEffect(() => {
    fetchCompanies();
  }, [currentPage, searchQuery]);

  const fetchCompanies = async () => {
    try {
      const response = await fetch(`http://localhost:4500/companies/?page=${currentPage}&limit=${limitPerPage}`);
      const data = await response.json();
      // Update the companies state using the setCompanies function from the context
      setCompanies(data.companies);
      setTotalSearchResults(data.total); 
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  return (
    <div>
      <h1>Company List</h1>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by company name"
        />
        <button onClick={() => { handleNextPage(); setSearchQuery(''); }}>Search</button>
      </div>
      {searchQuery && <p>{`Showing ${totalSearchResults} search results`}</p>}
      {(searchQuery && totalSearchResults > 0 ? searchResults : companies).map((company) => (
        <CompanyCard key={company._id} company={company} />
      ))}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${searchQuery ? Math.ceil(totalSearchResults / limitPerPage) : totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === (searchQuery ? Math.ceil(totalSearchResults / limitPerPage) : totalPages)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ListPage;
