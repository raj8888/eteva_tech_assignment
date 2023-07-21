const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true, unique: true },
  companyDescription: { type: String, required: true },
  contactNumber: { type: String, required: true },
  contactEmail: { type: String, required: true, unique: true },
  logoUrl: { type: String },
  state: { type: String, required: true },
  city: { type: String, required: true },
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
