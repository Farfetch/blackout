/**
 * Converts a timestamp value to a date string.
 *
 * @function adaptTimestamp
 * @memberof module:helpers/adapters
 *
 * @param {string} timestamp - Date to be adapted.
 *
 * @returns {(string | null)} The date timestamp (`null ` if the date to be adapted is invalid).
 */
export default (timestamp: any): string | null => {
  const sTimestamp = String(timestamp);
  if (sTimestamp && sTimestamp.includes('Date')) {
    return sTimestamp;
  }

  return isNaN(timestamp) ? null : `/Date(${timestamp})/`;
};
