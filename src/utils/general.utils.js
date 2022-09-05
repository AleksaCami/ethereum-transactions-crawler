/**
 * Checks is value empty, null or undefined.
 * If value is array, checks if the length of the array is greater than zero.
 * @param value - Value to be checked.
 * @returns {boolean} Is value empty boolean.
 */
export const isEmpty = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === '' ||
    value === 'null' ||
    value === 'undefined'
  ) {
    return true;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
};

/**
 * Formats timestamp to ISO string date.
 * @param {number} timestamp 
 * @returns {Date}
 */
export const formatTimestampToDate = (timestamp) => {
  const date = new Date(timestamp * 1000).toISOString();

  return date;
}