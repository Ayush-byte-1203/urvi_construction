/**
 * Validates standard emails against RFC 5322 RegEx
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates international/domestic contact phone patterns
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  // Matches basic 10-digit formats with options for +91 / +1 etc.
  const re = /^(\+?\d{1,3}[- ]?)?\d{10}$/;
  return re.test(String(phone).replace(/[\s\-()]/g, ''));
};

/**
 * Validates if value is present and not empty
 */
export const isRequired = (value) => {
  if (value === undefined || value === null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return true;
};

/**
 * Validates a value is a number within a range
 */
export const isValidNumberRange = (value, min, max) => {
  const num = Number(value);
  if (isNaN(num)) return false;
  if (min !== undefined && num < min) return false;
  if (max !== undefined && num > max) return false;
  return true;
};
