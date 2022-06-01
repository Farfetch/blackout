/**
 * Strips the base url from a url. This is used by certain methods to make it
 * easier to match urls defined in client instances that might use different base
 * urls.
 *
 * @param baseURL - Base url to remove.
 * @param url     - Url containing the base url to be removed.
 *
 * @returns Returns a new url string without the base url if the url contains it or the original url
 * otherwise.
 */
export const getRequestUrlWithoutBase = (
  url = '',
  baseURL?: string,
): string => {
  return baseURL ? url.replace(baseURL, '') : url;
};

/**
 * Asserts that an optionValue is valid according to the optionValidator function.
 * If not, a TypeError exception is thrown containing the error message formatted
 * by the errorMessageFormatter if provided or a default error message otherwise.
 *
 * @throws
 *
 * @param optionValue           - Value to be validated.
 * @param optionValidator       - A function that returns true if the optionValue is valid and false
 *                                otherwise.
 * @param optionName            - The option name. Used for the error message only.
 * @param errorMessageFormatter - A function that will format an error message to be used as the
 *                                argument of the TypeError instance.
 */
export const assertOption = (
  optionValue: any,
  optionValidator: (optionValue: any) => boolean,
  optionName: string,
  errorMessageFormatter?: (optionValue: string, optionName: string) => string,
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
 * @throws
 *
 * @param optionValue  - Option value to validate.
 * @param expectedType - Expected type name as it is obtained from a typeof operator call.
 * @param optionName   - Option name to be used in error message.
 */
export const assertOptionType = (
  optionValue: any,
  expectedType: string,
  optionName: string,
) => {
  assertOption(
    optionValue,
    (value: any) => typeof value === expectedType,
    optionName,
    (optionValue: any, optionName: any) =>
      `Invalid value for option '${optionName}'. Expected type: '${expectedType}', received '${typeof optionValue}'.`,
  );
};
