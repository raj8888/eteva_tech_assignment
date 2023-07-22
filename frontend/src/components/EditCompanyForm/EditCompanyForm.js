import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditCompanyForm.css'; // Import the CSS file for EditCompanyForm

const EditCompanyForm = ({ onSave, onCancel }) => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    contactNumber: '',
    contactEmail: '',
    logo: '',
    state: '',
    city: '',
  });

  useEffect(() => {
    // Fetch the company data from the backend using the company ID from the URL
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`https://light-elk-suit.cyclic.app/companies/${id}`);
        const companyData = response.data;
        // Handle the case when the fetched logo data is null or undefined
        const logo = companyData.logo || '';
        setFormData({
          ...companyData,
          logo, // Set the logo value to an empty string if it's null or undefined
        });
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    fetchCompanyData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(id, formData);
  };

  const handleSave = () => {
    console.log(`Updating company with ID ${id} with data:`, formData);
    axios
      .put(`https://light-elk-suit.cyclic.app/companies/${id}`, formData)
      .then((response) => {
        console.log('Company updated successfully!', response.data);
        alert('Company updated successfully!');
        window.location = '/';
      })
      .catch((error) => {
        console.error('Error updating company:', error);
        alert(`${error.message}`);
      });
  };

  const handleCancel = () => {
    console.log('Edit canceled');
    window.location = '/';
  };

  return (
    <div className='container'>
      <h2 className='heading'>Update Company Information</h2>
      <form className="edit-company-form" onSubmit={handleSubmit}>
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
      />

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

      <label htmlFor="logo">Logo</label>
      <input
        type="text"
        id="logo"
        name="logo"
        value={formData.logoUrl}
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

      <div className="form-buttons">
        <button type="button" className="save-button" onClick={handleSave}>
          Save
        </button>
        <button type="button" className="cancel-button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
    </div>
  );
};

export default EditCompanyForm;
