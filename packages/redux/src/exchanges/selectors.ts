import {
  getError,
  getExchangeBookRequest as getExchangeBookRequestGetter,
  getExchangeFilter as getExchangeFilterGetter,
  getIsLoading,
  getResult,
} from './reducer.js';
import type { ExchangesState } from './index.js';
import type { StoreState } from '../index.js';

/**
 * Returns the exchange result from the application state.
 *
 * @param state - Application state.
 *
 * @returns Returns exchange result.
 */
export const getExchange = (state: StoreState) =>
  getResult(state.exchanges as ExchangesState);

/**
 * Returns the exchange error.
 *
 * @param state - Application state.
 *
 * @returns Exchange error.
 */
export const getExchangeError = (state: StoreState) =>
  getError(state.exchanges as ExchangesState);

/**
 * Returns the loading status of the exchanges area.
 *
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areExchangesLoading = (state: StoreState) =>
  getIsLoading(state.exchanges as ExchangesState);

/**
 * Retrieves if the exchange has been fetched.
 *
 * Will return true if an exchange request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @param state - Application state.
 *
 * @returns isFetched status of the exchange.
 */
export const isExchangeFetched = (state: StoreState) =>
  (!!getExchange(state) || !!getExchangeError(state)) &&
  !areExchangesLoading(state);

/**
 * Returns the exchange filter.
 *
 * @param state - Application state.
 *
 * @returns Exchange filter.
 */
export const getExchangeFilter = (state: StoreState) =>
  getExchangeFilterGetter(state.exchanges as ExchangesState).result;

/**
 * Returns the loading flag for the exchange filter area actions.
 *
 * @param state - Application state.
 *
 * @returns Loading status.
 */
export const isExchangeFilterLoading = (state: StoreState) =>
  getExchangeFilterGetter(state.exchanges as ExchangesState).isLoading;

/**
 * Returns the error for the exchange filter area actions.
 *
 * @param state - Application state.
 *
 * @returns Exchange filter error.
 */
export const getExchangeFilterError = (state: StoreState) =>
  getExchangeFilterGetter(state.exchanges as ExchangesState).error;

/**
 * Returns the exchange book request.
 *
 * @param state - Application state.
 *
 * @returns Exchange book request.
 */
export const getExchangeBookRequest = (state: StoreState) =>
  getExchangeBookRequestGetter(state.exchanges as ExchangesState).result;

/**
 * Returns the loading flag for the exchange book request area actions.
 *
 * @param state - Application state.
 *
 * @returns Loading status.
 */
export const isExchangeBookRequestLoading = (state: StoreState) =>
  getExchangeBookRequestGetter(state.exchanges as ExchangesState).isLoading;

/**
 * Returns the error for the exchange book request area actions.
 *
 * @param state - Application state.
 *
 * @returns Exchange book request error.
 */
export const getExchangeBookRequestError = (state: StoreState) =>
  getExchangeBookRequestGetter(state.exchanges as ExchangesState).error;

/**
 * Retrieves if the exchange book request has been fetched.
 *
 * Will return true if an exchange book request request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @param state - Application state.
 *
 * @returns isFetched status of the exchange book request.
 */
export const isExchangeBookRequestFetched = (state: StoreState) =>
  (!!getExchangeBookRequest(state) || !!getExchangeBookRequestError(state)) &&
  !isExchangeBookRequestLoading(state);
