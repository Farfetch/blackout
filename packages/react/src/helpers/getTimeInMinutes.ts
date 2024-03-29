/**
 * Gets the current time in minutes.
 *
 * @returns Current time in minutes.
 */
export default function getTimeInMinutes(): number {
  return Math.floor(new Date().getTime() / (60 * 1000));
}
