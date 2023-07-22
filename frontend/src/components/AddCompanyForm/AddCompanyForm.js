import React, { useState } from 'react';
import { useCompanyContext } from '../../context/CompanyContext';
import {  Link, useNavigate } from 'react-router-dom';

const AddCompanyForm = () => {
  const { addCompany } = useCompanyContext();
  const navigate = useNavigate(); 

  const initialState = {
    companyName: '',
    companyDescription: '',
    contactNumber: '',
    contactEmail: '',
    logo: '',
    state: '',
    city: '',
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCompany(formData);
    setFormData(initialState);
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="add-company-form">
      <h2>Add Company</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          required
        />

        <label htmlFor="companyDescription">Company Description</label>
        <textarea
          id="companyDescription"
          name="companyDescription"
          value={formData.companyDescription}
          onChange={handleChange}
          required
        ></textarea>

        <label htmlFor="contactNumber">Contact Number</label>
        <input
          type="text"
          id="contactNumber"
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          required
        />

        <label htmlFor="contactEmail">Contact Email</label>
        <input
          type="email"
          id="contactEmail"
          name="contactEmail"
          value={formData.contactEmail}
          onChange={handleChange}
          required
        />

        <label htmlFor="logo">Logo URL</label>
        <input
          type="text"
          id="logo"
          name="logo"
          value={formData.logo}
          onChange={handleChange}
          required
        />

        <label htmlFor="state">State</label>
        <input
          type="text"
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        />

        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />

        <div>
          <button type="submit">Submit</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddCompanyForm;
