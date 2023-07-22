import React, { useState, useEffect } from 'react';
import { useCompanyContext } from '../../context/CompanyContext';
import CompanyCard from './CompanyCard';

const ListPage = () => {
  const { companies, setCompanies, currentPage, totalPages, handleNextPage, handlePreviousPage } = useCompanyContext();
  const limitPerPage = 5;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [totalSearchResults, setTotalSearchResults] = useState(0);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [sortingOrder, setSortingOrder] = useState('');

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

  // Function to handle sorting of companies
  const handleSort = (event) => {
    const selectedSortingOrder = event.target.value;
    setSortingOrder(selectedSortingOrder);
    const sortedCompanies = [...(showSearchResults ? searchResults : companies)];
    sortedCompanies.sort((a, b) => {
      if (selectedSortingOrder === 'asc') {
        return a.companyName.localeCompare(b.companyName);
      } else if (selectedSortingOrder === 'desc') {
        return b.companyName.localeCompare(a.companyName);
      }
      return 0;
    });
    if (showSearchResults) {
      setSearchResults(sortedCompanies);
    } else {
      setCompanies(sortedCompanies);
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
        <button onClick={handleSearch}>Search</button>
        {showSearchResults && <button onClick={handleClearSearch}>Clear Search</button>}
      </div>
      {showSearchResults && <p>{`Showing ${totalSearchResults} search results`}</p>}
      <div>
        <label htmlFor="sortOrder">Sort by company:</label>
        <select id="sortOrder" value={sortingOrder} onChange={handleSort}>
          <option value="">Select</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
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
