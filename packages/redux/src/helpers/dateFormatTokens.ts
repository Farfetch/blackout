const dateFormatTokens = {
  DAY: 'D',
  DELIMITER: ' ',
  MONTH: 'MMMM',
  YEAR: 'YYYY',
};

export default dateFormatTokens;

const { DAY, DELIMITER, MONTH, YEAR } = dateFormatTokens;

export const dateFormats = {
  DMY: `${DAY}${DELIMITER}${MONTH}${DELIMITER}${YEAR}`,
  MDY: `${MONTH}${DELIMITER}${DAY}${DELIMITER}${YEAR}`,
  YMD: `${YEAR}${DELIMITER}${MONTH}${DELIMITER}${DAY}`,
  DM: `${DAY}${DELIMITER}${MONTH}`,
  MD: `${MONTH}${DELIMITER}${DAY}`,
};
