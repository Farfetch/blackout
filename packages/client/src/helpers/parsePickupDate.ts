/**
 * Parses a timestamp value into a common date string.
 *
 * @param timestamp - Timestamp to parse.
 *
 * @returns Date in "YYYY-M-D" format.
 */
const parsePickupDate = (timestamp: number): string => {
  const date = new Date(timestamp);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export default parsePickupDate;
