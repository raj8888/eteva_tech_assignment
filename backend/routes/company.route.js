const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const validateFields = require('../middleware/validation.middleware');
const Company = require('../models/company.model');

// @route   POST /api/companies
// @desc    Create a new company
// @access  Public
router.post(
  '/',
  [
    body('companyName').trim().notEmpty().withMessage('Company name is required'),
    body('companyDescription').trim().notEmpty().withMessage('Company description is required'),
    body('contactNumber').trim().notEmpty().withMessage('Contact number is required'),
    body('contactEmail').trim().isEmail().withMessage('Invalid email format'),
    body('state').trim().notEmpty().withMessage('State is required'),
    body('city').trim().notEmpty().withMessage('City is required'),
    validateFields,
  ],
  async (req, res) => {
    try {
      const {
        companyName,
        companyDescription,
        contactNumber,
        contactEmail,
        logoUrl,
        state,
        city,
      } = req.body;

      // Check if the company name and contact email are unique
      let company = await Company.findOne({ $or: [{ companyName }, { contactEmail }] });
      if (company) {
        return res.status(400).json({ errors: [{ msg: 'Company name or contact email already exists' }] });
      }

      company = new Company({
        companyName,
        companyDescription,
        contactNumber,
        contactEmail,
        logoUrl,
        state,
        city,
      });

      await company.save();

      res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET /api/companies
// @desc    Get paginated list of companies
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;

    const totalCount = await Company.countDocuments();

    const companies = await Company.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({ total: totalCount, page, limit, companies });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/companies/sort
// @desc    Get sorted list of companies
// @access  Public
router.get('/sort', async (req, res) => {
  try {
    const { sortBy = 'companyName', sortOrder = 'asc' } = req.query;

    const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const companies = await Company.find().sort(sortOptions);

    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/companies/search
// @desc    Search companies by name
// @access  Public
router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;

    const companies = await Company.find({ companyName: { $regex: name, $options: 'i' } });

    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/companies/:id
// @desc    Update an existing company
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { companyName, companyDescription, contactNumber, contactEmail, logoUrl, state, city } = req.body;

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      {
        companyName,
        companyDescription,
        contactNumber,
        contactEmail,
        logoUrl,
        state,
        city,
      },
      { new: true } // Return the updated document
    );

    if (!updatedCompany) {
      return res.status(404).json({ msg: 'Company not found' });
    }

    res.json(updatedCompany);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/companies/:id
// @desc    Delete a company
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndRemove(req.params.id);

    if (!deletedCompany) {
      return res.status(404).json({ msg: 'Company not found' });
    }

    res.json({ msg: 'Company deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const companyId = req.params.id;

    // Use the findById method of the Company model to fetch the company details
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json(company);
  } catch (error) {
    console.error('Error fetching company details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
