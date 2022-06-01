import axios from 'axios';
import isArray from 'lodash/isArray';
import type { DefaultErrorAdapterData, LegacyErrorAdapterData } from './types';

// This is the default error code it's used for axios errors and all the errors
// that don't return an error code. This should be used to display a generic
// error on the application.
export const defaultErrorCode = -1;

/**
 * Method responsible for adapting the request error to fit the application error
 * format.
 *
 * @param data   - Error data.
 * @param status - The request status code.
 *
 * @returns Error in a new format to apply to the application.
 */
export const legacyErrorAdapter = (
  {
    errorMessage,
    errorCode = defaultErrorCode,
    ...rest
  }: LegacyErrorAdapterData,
  status: number,
): { [k: string]: unknown } => ({
  code: errorCode,
  message: errorMessage,
  status,
  ...rest,
});

/**
 * Method responsible for adapting the FO type request error to fit the application
 * error format.
 *
 * @param data   - Error data.
 * @param status - The request status code.
 *
 * @returns Error in a new format to apply to the application.
 */
export const defaultErrorAdapter = (
  {
    message,
    code = defaultErrorCode,
    developerMessage,
    ...rest
  }: DefaultErrorAdapterData,
  status: number,
) => ({
  code,
  message: message || developerMessage || 'Unexpected error',
  status,
  ...rest,
});

/**
 * Method responsible for adapting error thrown either it was thrown by the API or
 * by Axios to fit the application error format.
 *
 * @param error - Error thrown.
 *
 * @returns Error adapted.
 */
export const adaptError = (error: {
  [k: string]: unknown;
}): { [k: string]: unknown } => {
  if (!axios.isAxiosError(error)) {
    return error;
  }

  if (error.response && error.response.data) {
    const { status, data } = error.response;

    // If the error is a string (in some cases the error is propagated from
    // the FO service and only a string is returned).
    if (typeof data === 'string') {
      return Object.assign(error, {
        code: defaultErrorCode,
        message: data,
        status,
      });
    }

    // If the error is an array with 1 or more error object, we only
    // consider the first one.
    const isListErrors = data.hasOwnProperty('errors') && isArray(data.errors);
    const dataResponse = isListErrors ? data.errors[0] : data;
    // The new back-end services return a code, the FO service returns a
    // errorCode.
    const isLegacy = dataResponse && !dataResponse.code;
    const convertedData = isLegacy
      ? legacyErrorAdapter(dataResponse, status)
      : defaultErrorAdapter(dataResponse, status);

    return Object.assign(error, { ...convertedData, status });
  }

  if (error.request) {
    const { response, status } = error.request;

    Object.assign(error, {
      code: defaultErrorCode,
      message: response.description || error.message,
      status,
      ...response,
    });

    return error;
  }

  return Object.assign(error, {
    code: defaultErrorCode,
    status: null,
  });
};
