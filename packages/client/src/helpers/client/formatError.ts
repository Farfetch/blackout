import axios from 'axios';
import isArray from 'lodash/isArray';
import type { BlackoutError } from '../../types';
import type { DefaultErrorAdapterData, LegacyErrorAdapterData } from './types';

export const defaultError = {
  code: '-1',
  message: 'Unexpected error',
};

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
    errorCode = defaultError.code,
    ...rest
  }: LegacyErrorAdapterData,
  status: number,
): { code: string } & Record<string, unknown> => ({
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
    code = defaultError.code,
    developerMessage,
    ...rest
  }: DefaultErrorAdapterData,
  status: number,
): { code: string } & Record<string, unknown> => ({
  code,
  message: message || developerMessage || defaultError.message,
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
export const adaptError = (error: unknown): BlackoutError => {
  if (!axios.isAxiosError(error)) {
    return toBlackoutError(error);
  }

  const extraParameters: {
    transportLayerErrorCode?: string;
    [key: string]: unknown;
  } = {};

  if (Object.prototype.hasOwnProperty.call(error, 'code')) {
    extraParameters.transportLayerErrorCode = error.code;
    delete error.code;
  }

  if (error.response && error.response.data) {
    const { status, data } = error.response;

    // If the error is a string (in some cases the error is propagated from
    // the FO service and only a string is returned).
    if (typeof data === 'string') {
      return Object.assign(error, {
        ...extraParameters,
        code: defaultError.code,
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

    return Object.assign(error, {
      ...convertedData,
      ...extraParameters,
      status,
    });
  }

  if (error.request) {
    const { response, status } = error.request;

    return Object.assign(error, {
      ...extraParameters,
      code: defaultError.code,
      message: response?.description || error.message,
      status,
      ...response,
    });
  }

  return Object.assign(error, {
    code: defaultError.code,
    status: undefined,
  });
};

/**
 * Check and cast Error to BlackoutError if it is type.
 *
 * @param error - error data.
 * @returns Error typed as BlackoutError
 */
export const isBlackoutErrorType = (error: unknown): error is BlackoutError => {
  return (
    error instanceof Error &&
    Object.prototype.hasOwnProperty.call(error, 'code')
  );
};

/**
 * Method responsible for cast any error to known Error type.
 *
 * @param error - Error ocurred.
 * @returns casted error to known error type.
 */

export const toBlackoutError = (error: unknown): BlackoutError => {
  if (isBlackoutErrorType(error)) {
    return error;
  }

  if (error instanceof Error) {
    return Object.assign(error, {
      code: defaultError.code,
    });
  }

  return Object.assign(new Error(defaultError.message), {
    code: defaultError.code,
  });
};
