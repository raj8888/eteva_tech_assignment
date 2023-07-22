import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import ListPage from './components/ListPage/ListPage';
import AddCompanyForm from './components/AddCompanyForm/AddCompanyForm';
import EditCompanyForm from './components/EditCompanyForm/EditCompanyForm';
import { CompanyProvider } from './context/CompanyContext';

function App() {
  return (
    <Router>
      <CompanyProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/add" element={<AddCompanyForm />} />
          <Route
            path="/edit/:id"
            element={
              <EditCompanyForm
                // Pass the onSave and onCancel props to the EditCompanyForm component
                onSave={(companyId, formData) => {
                  console.log(`Updating company with ID ${companyId} with data:`, formData);
                }}
                onCancel={() => {}}
              />
            }
          />
        </Routes>
      </CompanyProvider>
    </Router>
  );
}

export default App;
