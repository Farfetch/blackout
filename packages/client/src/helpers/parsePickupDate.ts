/**
 * Parses a timestamp value into a commnon date string.
 *
 * @memberof module:helpers
 *
 * @param {number} timestamp - Timestamp to parse.
 *
 * @returns {string} Date in "YYYY-M-D" format.
 */
const parsePickupDate = (timestamp: number): string => {
  const date = new Date(timestamp);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export default parsePickupDate;
