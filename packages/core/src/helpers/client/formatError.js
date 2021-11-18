import axios from 'axios';
import isArray from 'lodash/isArray';

// This is the default error code it's used for axios errors and all the errors
// that don't return an error code. This should be used to display a generic
// error on the application.
export const defaultErrorCode = -1;

/**
 * Method responsible for adapting the request error to fit the
 * application error format.
 *
 * @function
 * @memberof module:helpers/client
 *
 * @param {object} data - Error data.
 * @param {string} data.errorMessage - Error message received.
 * @param {number} data.errorCode - Error code received.
 * @param {object} status - The request status code.
 *
 * @returns {object} Error in a new format to apply to the application.
 */
export const legacyErrorAdapter = (
  { errorMessage, errorCode = defaultErrorCode, ...rest },
  status,
) => ({
  code: errorCode,
  message: errorMessage,
  status,
  ...rest,
});

/**
 * Method responsible for adapting the FO type request error to fit the
 * application error format.
 *
 * @function
 * @memberof module:helpers/client
 *
 * @param {object} data - Error data.
 * @param {string} data.message - Message received.
 * @param {number} data.code - Code received.
 * @param {string} data.developerMessage - Developer message received.
 * @param {object} status - The request status code.
 *
 * @returns {object} Error in a new format to apply to the application.
 */
export const defaultErrorAdapter = (
  { message, code = defaultErrorCode, developerMessage, ...rest },
  status,
) => ({
  code,
  message: message || developerMessage || 'Unexpected error',
  status,
  ...rest,
});

/**
 * Method responsible for adapting error thrown either it was thrown by the API
 * or by Axios to fit the application error format.
 *
 * @function
 * @memberof module:helpers/client
 *
 * @param {object} error - Error thrown.
 *
 * @returns {object} Error adapted.
 */
export const adaptError = error => {
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
