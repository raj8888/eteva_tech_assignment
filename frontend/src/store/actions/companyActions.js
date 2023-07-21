import axios from 'axios';
import { FETCH_COMPANIES, ADD_COMPANY, UPDATE_COMPANY, DELETE_COMPANY } from '../types';

const mainApi="http://localhost:4500/companies"

// Action creator for fetching companies
export const fetchCompanies = () => async (dispatch) => {
  try {
    const response = await axios.get(mainApi); // Replace with your backend API URL

    dispatch({
      type: FETCH_COMPANIES,
      payload: response.data.companies,
    });
  } catch (error) {
    console.error('Error fetching companies:', error);
  }
};

// Action creator for adding a new company
export const addCompany = (companyData) => async (dispatch) => {
  try {
    const response = await axios.post(mainApi, companyData); // Replace with your backend API URL

    dispatch({
      type: ADD_COMPANY,
      payload: response.data.company,
    });
  } catch (error) {
    console.error('Error adding a new company:', error);
  }
};

// Action creator for updating a company
export const updateCompany = (companyId, companyData) => async (dispatch) => {
  try {
    const response = await axios.put(`${mainApi}/${companyId}`, companyData); // Replace with your backend API URL

    dispatch({
      type: UPDATE_COMPANY,
      payload: response.data.company,
    });
  } catch (error) {
    console.error('Error updating company:', error);
  }
};

// Action creator for deleting a company
export const deleteCompany = (companyId) => async (dispatch) => {
  try {
    await axios.delete(`${mainApi}/${companyId}`); // Replace with your backend API URL

    dispatch({
      type: DELETE_COMPANY,
      payload: companyId,
    });
  } catch (error) {
    console.error('Error deleting company:', error);
  }
};
