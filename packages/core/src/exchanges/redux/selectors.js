/**
 * @module exchanges/selectors
 * @category Exchanges
 * @subcategory Selectors
 */

import {
  getError,
  getExchangeBookRequests as getExchangeBookRequestsGetter,
  getExchangeFilter as getExchangeFilterGetter,
  getIsLoading,
  getResult as Result,
} from './reducer';

/**
 * Returns the result of the exchanges area.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Object containing the exchange data.
 */
export const getResult = state => Result(state.exchanges);

/**
 * Returns the exchanges error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Exchanges error.
 */
export const getExchangesError = state => getError(state.exchanges);

/**
 * Returns the loading status of the exchanges area.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loader status.
 */
export const isExchangesLoading = state => getIsLoading(state.exchanges);

/**
 * Returns the exchange filter.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Exchange filter.
 */
export const getExchangeFilter = state =>
  getExchangeFilterGetter(state.exchanges).result;

/**
 * Returns the loading status for the create exchange filter request.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loading status.
 */
export const isExchangeFilterLoading = state =>
  getExchangeFilterGetter(state.exchanges).isLoading;

/**
 * Returns the error for the create exchange filter request.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Exchange filter error.
 */
export const getExchangeFilterError = state =>
  getExchangeFilterGetter(state.exchanges).error;

/**
 * Returns the exchange book requests.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Exchange book requests.
 */
export const getExchangeBookRequests = state =>
  getExchangeBookRequestsGetter(state.exchanges).result;

/**
 * Returns the loading status for the get exchange book requests request.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loading status.
 */
export const isExchangeBookRequestsLoading = state =>
  getExchangeBookRequestsGetter(state.exchanges).isLoading;

/**
 * Returns the error for the get exchange book requests request.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Exchange book requests error.
 */
export const getExchangeBookRequestsError = state =>
  getExchangeBookRequestsGetter(state.exchanges).error;