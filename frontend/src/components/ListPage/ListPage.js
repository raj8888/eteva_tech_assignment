import React, { useState } from 'react';
import { useCompanyContext } from '../../context/CompanyContext';
import CompanyCard from './CompanyCard';

const ListPage = () => {
  const { companies, updateCompany, deleteCompany } = useCompanyContext();
  const [editingCompanyId, setEditingCompanyId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEditCompany = (companyId) => {
    setEditingCompanyId(companyId);
  };

  const handleSaveCompany = (companyId, formData) => {
    updateCompany(companyId, formData);

    // Show success message to the user
    setSuccessMessage('Company updated successfully');

    // Clear the editingCompanyId to stop showing the edit form
    setEditingCompanyId(null);
  };

  const handleCancelEdit = () => {
    // Clear the editingCompanyId to stop showing the edit form
    setEditingCompanyId(null);
  };

  const handleDeleteCompany = (companyId) => {
    // Assuming you have a deleteCompany function in your CompanyContext to delete the company
    deleteCompany(companyId);

    // Show success message to the user
    setSuccessMessage('Company deleted successfully');
  };

  return (
    <div>
      <h1>Company List</h1>
      {successMessage && <div>{successMessage}</div>}
      {companies.map((company) => (
        <CompanyCard
          key={company._id}
          company={company}
          onEdit={handleEditCompany}
          onDelete={handleDeleteCompany}
          editing={editingCompanyId === company._id}
          onSave={handleSaveCompany}
          onCancelEdit={handleCancelEdit}
        />
      ))}
    </div>
  );
};

export default ListPage;
