// validations/boatValidation.js
const Validator = require('validator');
const isEmpty = require('is-empty');

/**
 * Validates the data for creating a boat listing.
 * @param {Object} data - The boat listing data to validate.
 * @returns {Object} - An object containing any errors and a boolean indicating validity.
 */
function validateBoatListing(data) {
  let errors = {};

  // Ensure fields are not empty
  data.title = !isEmpty(data.title) ? data.title : '';
  data.description = !isEmpty(data.description) ? data.description : '';
  data.pricePerDay = !isEmpty(data.pricePerDay) ? data.pricePerDay : '';
  data.location = !isEmpty(data.location) ? data.location : '';

  // Validate title
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }

  // Validate description
  if (Validator.isEmpty(data.description)) {
    errors.description = 'Description is required';
  }

  // Validate price per day
  if (Validator.isEmpty(data.pricePerDay)) {
    errors.pricePerDay = 'Price per day is required';
  } else if (!Validator.isNumeric(data.pricePerDay)) {
    errors.pricePerDay = 'Price per day must be a number';
  }

  // Validate location
  if (Validator.isEmpty(data.location)) {
    errors.location = 'Location is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = { validateBoatListing };
