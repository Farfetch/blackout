/**
 * Strips the base url from a url. This is used by certain methods to make it easier to
 * match urls defined in client instances that might use different base urls.
 *
 * @param {string} baseURL - Base url to remove.
 * @param {string} url - Url containing the base url to be removed.
 *
 * @returns {string} Returns a new url string without the base url if the url contains it or the original url otherwise.
 */
export const getRequestUrlWithoutBase = (baseURL, url) => {
  return baseURL ? url.replace(baseURL, '') : url;
};

/**
 * Asserts that an optionValue is valid according to the optionValidator function.
 * If not, a TypeError exception is thrown containing the error message formatted by the errorMessageFormatter
 * if provided or a default error message otherwise.
 *
 * @param {string} optionValue - Value to be validated.
 * @param {Function} optionValidator - A function that returns true if the optionValue is valid and false otherwise.
 * @param {string} optionName - The option name. Used for the error message only.
 * @param {Function} [errorMessageFormatter] - A function that will format an error message to be used as the argument of the TypeError instance.
 *
 * @throws {TypeError}
 */
export const assertOption = (
  optionValue,
  optionValidator,
  optionName,
  errorMessageFormatter,
) => {
  if (!optionValidator(optionValue)) {
    throw new TypeError(
      errorMessageFormatter
        ? errorMessageFormatter(optionValue, optionName)
        : `Invalid value for option '${optionName}'. Received '${optionValue}'.`,
    );
  }
};

/**
 * Asserts that an option value is of the expected type.
 *
 * @param {*} optionValue - Option value to validate.
 * @param {string} expectedType - Expected type name as it is obtained from a typeof operator call.
 * @param {string} optionName - Option name to be used in error message.
 *
 * @throws {TypeError}
 */
export const assertOptionType = (optionValue, expectedType, optionName) => {
  assertOption(
    optionValue,
    value => typeof value === expectedType,
    optionName,
    (optionValue, optionName) =>
      `Invalid value for option '${optionName}'. Expected type: '${expectedType}', received '${typeof optionValue}'.`,
  );
};
