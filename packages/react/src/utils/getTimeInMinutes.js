/**
 * Gets the current time in minutes.
 *
 * @returns {number} Current time in minutes.
 */
export default function getTimeInMinutes() {
  return Math.floor(new Date().getTime() / (60 * 1000));
}
