import dateFormatTokens from './dateFormatTokens';

const defaultDate = new Date(0);
const { DAY, DELIMITER, MONTH, YEAR } = dateFormatTokens;

/**
 * Returns the date format for a specific locale.
 *
 * @param cultureCode - The cultureCode for the date format.
 * @param includeYear - Whether the year is to include on the date format or not.
 *
 * @returns The date format for the specified culture code, following the moment.js specification.
 */
export default (cultureCode = 'en-US', includeYear = true): string => {
  // After getting the locale formatted date, remove the U+200E char which IE11 introduces.
  // @see https://stackoverflow.com/questions/25294363/ie-11-issue-with-javascript-tolocaledatestring-formatting

  const formattedDate = defaultDate
    .toLocaleDateString(cultureCode, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .replace(/\u200E/g, '');
  const yearPosition = formattedDate.indexOf(
    defaultDate.getFullYear().toString(),
  );

  let dayPosition = formattedDate.indexOf(defaultDate.getDate().toString());

  // Ensure the day position didn't assume the value of some year digit
  dayPosition =
    dayPosition === yearPosition
      ? formattedDate.lastIndexOf(defaultDate.getDate().toString())
      : dayPosition;

  const formatCode = yearPosition - dayPosition;

  if (formatCode === yearPosition) {
    return includeYear
      ? `${DAY}${DELIMITER}${MONTH}${DELIMITER}${YEAR}`
      : `${DAY}${DELIMITER}${MONTH}`;
  }

  if (formatCode < 0) {
    return includeYear
      ? `${YEAR}${DELIMITER}${MONTH}${DELIMITER}${DAY}`
      : `${MONTH}${DELIMITER}${DAY}`;
  }

  return includeYear
    ? `${MONTH}${DELIMITER}${DAY}${DELIMITER}${YEAR}`
    : `${MONTH}${DELIMITER}${DAY}`;
};
