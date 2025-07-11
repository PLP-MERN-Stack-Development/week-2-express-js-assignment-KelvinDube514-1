/**
 * Validation Middleware
 * Validates product data for creation and update routes
 */

const { ValidationError } = require('./errors');

// Validation for creating a new product
const validateCreateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  const errors = [];

  // Check required fields
  if (!name || name.trim().length === 0) {
    errors.push('Name is required and cannot be empty');
  } else if (name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }

  if (!description || description.trim().length === 0) {
    errors.push('Description is required and cannot be empty');
  } else if (description.trim().length < 10) {
    errors.push('Description must be at least 10 characters long');
  }

  if (price === undefined || price === null) {
    errors.push('Price is required');
  } else if (typeof price !== 'number') {
    errors.push('Price must be a number');
  } else if (price <= 0) {
    errors.push('Price must be greater than 0');
  }

  if (!category || category.trim().length === 0) {
    errors.push('Category is required and cannot be empty');
  }

  // Validate inStock if provided
  if (inStock !== undefined && typeof inStock !== 'boolean') {
    errors.push('inStock must be a boolean value (true or false)');
  }

  if (errors.length > 0) {
    const error = new ValidationError('Validation failed', errors);
    return next(error);
  }

  // Sanitize the data
  req.body.name = name.trim();
  req.body.description = description.trim();
  req.body.category = category.trim();
  req.body.inStock = inStock !== undefined ? inStock : true;

  next();
};

// Validation for updating a product
const validateUpdateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;
  const errors = [];

  // Check if at least one field is provided
  if (!name && !description && price === undefined && !category && inStock === undefined) {
    const error = new ValidationError('At least one field must be provided for update');
    return next(error);
  }

  // Validate name if provided
  if (name !== undefined) {
    if (!name || name.trim().length === 0) {
      errors.push('Name cannot be empty');
    } else if (name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
  }

  // Validate description if provided
  if (description !== undefined) {
    if (!description || description.trim().length === 0) {
      errors.push('Description cannot be empty');
    } else if (description.trim().length < 10) {
      errors.push('Description must be at least 10 characters long');
    }
  }

  // Validate price if provided
  if (price !== undefined) {
    if (typeof price !== 'number') {
      errors.push('Price must be a number');
    } else if (price <= 0) {
      errors.push('Price must be greater than 0');
    }
  }

  // Validate category if provided
  if (category !== undefined) {
    if (!category || category.trim().length === 0) {
      errors.push('Category cannot be empty');
    }
  }

  // Validate inStock if provided
  if (inStock !== undefined && typeof inStock !== 'boolean') {
    errors.push('inStock must be a boolean value (true or false)');
  }

  if (errors.length > 0) {
    const error = new ValidationError('Validation failed', errors);
    return next(error);
  }

  // Sanitize the provided data
  if (name !== undefined) req.body.name = name.trim();
  if (description !== undefined) req.body.description = description.trim();
  if (category !== undefined) req.body.category = category.trim();

  next();
};

// Validation for product ID parameter
const validateProductId = (req, res, next) => {
  const { id } = req.params;
  
  if (!id || id.trim().length === 0) {
    const error = new ValidationError('Product ID is required');
    return next(error);
  }

  // Basic UUID validation (simple check for format)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id) && id !== '1' && id !== '2' && id !== '3') {
    const error = new ValidationError('Invalid product ID format');
    return next(error);
  }

  next();
};

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
  validateProductId
}; 