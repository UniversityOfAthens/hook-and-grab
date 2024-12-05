// validations/userValidation.js
const Validator = require('validator');
const isEmpty = require('is-empty');

/**
 * Validates user registration data.
 * @param {Object} data - The registration data to validate.
 * @returns {Object} - An object containing any errors and a boolean indicating validity.
 */
function validateRegistration(data) {
  let errors = {};

  // Convert empty fields to empty strings for validation
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.dateOfBirth = !isEmpty(data.dateOfBirth) ? data.dateOfBirth : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';

  // Validate username
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username is required';
  } else if (!Validator.isLength(data.username, { min: 6, max: 30 })) {
    errors.username = 'Username must be between 6 and 30 characters';
  }

  // Validate password
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  } else if (!Validator.isLength(data.password, { min: 6 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  // Validate email
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  // Validate first name
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First name is required';
  }

  // Validate last name
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last name is required';
  }

  // Validate date of birth
  if (Validator.isEmpty(data.dateOfBirth)) {
    errors.dateOfBirth = 'Date of birth is required';
  } else if (!Validator.isDate(data.dateOfBirth)) {
    errors.dateOfBirth = 'Date of birth is invalid';
  }

  // Validate phone number (must be exactly 10 digits)
  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!Validator.matches(data.phone, /^\d{10}$/)) {
    errors.phone = 'Phone number must be exactly 10 digits';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

module.exports = { validateRegistration };
