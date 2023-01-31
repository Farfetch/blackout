/**
 * Parses a timestamp value into a commnon date string.
 *
 * @memberof module:helpers/client
 *
 * @param {number} timestamp - Timestamp to parse.
 *
 * @returns {string} Date in "YYYY-M-D" format.
 */
const parsePickupDate = timestamp => {
  const date = new Date(timestamp);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export default parsePickupDate;
