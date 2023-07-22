import React, { useState } from 'react';
import { useCompanyContext } from '../../context/CompanyContext';
import CompanyCard from './CompanyCard';

const ListPage = () => {
  const { companies, currentPage, totalPages, handleNextPage, handlePreviousPage } = useCompanyContext();
  const limitPerPage = 5;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalSearchResults, setTotalSearchResults] = useState(0);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleSearch = () => {
    const filteredCompanies = companies.filter((company) =>
      company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredCompanies);
    setTotalSearchResults(filteredCompanies.length);
    setShowSearchResults(true);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setTotalSearchResults(0);
    setShowSearchResults(false);
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
        <button onClick={handleSearch}>Search</button>
        {showSearchResults && <button onClick={handleClearSearch}>Clear Search</button>}
      </div>
      {showSearchResults && <p>{`Showing ${totalSearchResults} search results`}</p>}
      {(showSearchResults && totalSearchResults > 0 ? searchResults : companies).map((company) => (
        <CompanyCard key={company._id} company={company} />
      ))}
      <div>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${showSearchResults ? Math.ceil(totalSearchResults / limitPerPage) : totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === (showSearchResults ? Math.ceil(totalSearchResults / limitPerPage) : totalPages)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ListPage;
