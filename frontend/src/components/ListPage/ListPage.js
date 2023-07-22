import React, { useState, useEffect } from 'react';
import { useCompanyContext } from '../../context/CompanyContext';
import CompanyCard from './CompanyCard';
import './ListPage.css';

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
    <div className="container">
      <h1>Company List</h1>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by company name"
        />
        <div className="search-buttons">
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
          {showSearchResults && (
            <button className="clear-button" onClick={handleClearSearch}>
              Clear
            </button>
          )}
        </div>
      </div>
      {showSearchResults && <p>{`Showing ${totalSearchResults} search results`}</p>}
      <div className="sort-container">
        <label className="sort-label" htmlFor="sortOrder">
          Sort by company:
        </label>
        <select className="sort-select" id="sortOrder" value={sortingOrder} onChange={handleSort}>
          <option value="">Select</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="company-list">
        {(showSearchResults && totalSearchResults > 0 ? searchResults : companies).map((company) => (
          <CompanyCard key={company._id} company={company} />
        ))}
      </div>
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${
          showSearchResults
            ? Math.ceil(totalSearchResults / limitPerPage)
            : totalPages
        }`}</span>
        <button
          className="pagination-button"
          onClick={handleNextPage}
          disabled={currentPage === (showSearchResults ? Math.ceil(totalSearchResults / limitPerPage) : totalPages)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListPage;
