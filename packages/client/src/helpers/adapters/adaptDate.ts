/**
 * Checks if the given timestamp has the additional property for the timezone.
 * Example: '1580828400000-0600', where the timezone is after the '-' sign.
 *
 * The '-' indicates that we should subtract the amount of hours from the
 * timestamp. Similarly the '+' means it needs to be added.
 *
 * @param timestamp - Timestamp to be checked.
 *
 * @returns Indicates if the timestamp has the timezone.
 */
const timestampHasTimezone = (timestamp: string): boolean =>
  !!timestamp && !!/\d[+-]\d/.exec(timestamp);

/**
 * Extracts and returns an object indicating:
 *
 * - The index of the separator ('+' ou '-').
 * - The type of operation (subtraction or addition).
 *
 * @param timestamp - Timestamp in the '1580828400000-hhmm' format.
 *
 * @returns Object containing the index and type of operation to be applied in the timestamp.
 */
const getTimezoneSeparator = (timestamp: string): { [k: string]: any } => {
  const isNegativeTimestamp = timestamp[0] === '-';
  // Ignore the first '-' in case the timestamp is negative (happens when its
  // from a date previous to '01/01/1970')
  const indexSubtract = isNegativeTimestamp
    ? timestamp.substring(1).indexOf('-')
    : timestamp.indexOf('-');
  const indexAdd = timestamp.indexOf('+');

  if (indexSubtract !== -1) {
    return {
      index: indexSubtract,
      type: 'subtract',
    };
  }
  if (indexAdd !== -1) {
    return {
      index: indexAdd,
      type: 'add',
    };
  }

  return {
    index: -1,
    type: null,
  };
};

/**
 * Gets the time details when given a timestamp in the format '1580828400000-0600'.
 *
 * @param timestamp - Timestamp to get time details.
 *
 * @returns Converted timestamp.
 */
const getTimestampWithTimezone = (timestamp: string): string => {
  try {
    const separator = getTimezoneSeparator(timestamp);
    const hasTimezone = separator.index !== -1;

    if (hasTimezone) {
      const getTimezoneDetails = (time: string) => {
        return {
          hours: parseInt(time.slice(0, 2), 10),
          minutes: parseInt(time.slice(2, 4), 10),
        };
      };

      const timezoneDetails = getTimezoneDetails(
        timestamp.slice(separator.index + 1),
      );

      const myTimestamp = timestamp.slice(0, separator.index);
      const newDate = new Date(parseInt(myTimestamp, 10));

      if (separator.type === 'subtract') {
        newDate.setHours(
          newDate.getHours() - timezoneDetails.hours,
          newDate.getMinutes() - timezoneDetails.minutes,
        );
      } else if (separator.type === 'add') {
        newDate.setHours(
          newDate.getHours() + timezoneDetails.hours,
          newDate.getMinutes() + timezoneDetails.minutes,
        );
      }

      return newDate.getTime().toString();
    }
  } catch (e) {
    return timestamp;
  }

  return timestamp;
};

/**
 * Converts a date string into a timestamp value.
 *
 * @param str - Date to be adapted.
 *
 * @returns The date timestamp (`null ` if the date to be adapted is invalid).
 */
export const adaptDate = (str: string): number | null => {
  if (str && !str.includes('Date')) {
    return new Date(str).getTime();
  }

  let timestamp = str && str.slice(6, -2);

  // Check if date has hours property
  if (timestampHasTimezone(timestamp)) {
    timestamp = getTimestampWithTimezone(timestamp);
  }

  const parsedTimestamp = parseInt(timestamp, 10);

  return isNaN(parsedTimestamp) ? null : parsedTimestamp;
};

export default adaptDate;
