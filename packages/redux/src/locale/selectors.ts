/**
 * Locale selectors.
 *
 * @module locale/selectors
 * @category Locale
 * @subcategory Selectors
 */

import {
  getAreCountriesLoading,
  getAreCountryCitiesLoading,
  getAreCountryCurrenciesLoading,
  getAreCountryStatesLoading,
  getCountriesError as getCountriesErrorFromReducer,
  getCountryCitiesError as getCountryCitiesErrorFromReducer,
  getCountryCode as getCountryCodeFromReducer,
  getCountryCurrenciesError as getCountryCurrenciesErrorFromReducer,
  getCountryStatesError as getCountryStatesErrorFromReducer,
} from './reducer';
import { getCity, getCountry, getState } from '../entities/selectors';
import get from 'lodash/get';
import type {
  Cities,
  Currencies,
  States,
} from '@farfetch/blackout-client/locale/types';
import type { State } from './types';
import type { StoreState } from '../types';

/**
 * Returns the current country code.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {string} - The current country code used on the app.
 *
 * @example
 * import { getCountryCode } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     activeCountryCode: getCountryCode(state)
 * });
 */
export const getCountryCode = (state: StoreState): State['countryCode'] =>
  getCountryCodeFromReducer(state.locale);

/**
 * Returns the country currency code for the given countryCode.
 * By default, returns the currency code of the current country.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} [countryCode=getCountryCode(state)] - The country code to find a specific country.
 *
 * @returns {string | undefined} - The currency code for the countryCode received.
 *
 * @example
 * import { getCountryCurrencyCode } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     activeCurrencyCode: getCountryCurrencyCode(state)
 * });
 */
export const getCountryCurrencyCode = (
  state: StoreState,
  countryCode: string | null = getCountryCode(state),
): string => {
  const countryCurrencies = getCountryCurrencies(state, countryCode);

  return get(countryCurrencies, '[0].isoCode');
};

/**
 * Returns the culture code for the given countryCode.
 * By default, returns the culture code of the current country.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} [countryCode=getCountryCode(state)] - The country code to find a specific country.
 *
 * @returns {string | undefined} - The culture code for the countryCode received.
 *
 * @example
 * import { getCountryCultureCode } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     activeCultureCode: getCountryCultureCode(state)
 * });
 */
export const getCountryCultureCode = (
  state: StoreState,
  countryCode: string | null = getCountryCode(state),
): string | undefined => {
  const country = countryCode && getCountry(state, countryCode);

  return get(country, 'cultures[0]');
};

/**
 * Returns the country structure for the given countryCode.
 * By default, returns the structure of the current country.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} [countryCode=getCountryCode(state)] - The country code to find a specific country.
 *
 * @returns {string | undefined} - The structure for the countryCode received.
 *
 * @example
 * import { getCountryStructure } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     activeStructure: getCountryStructure(state)
 * });
 */
export const getCountryStructure = (
  state: StoreState,
  countryCode: string | null = getCountryCode(state),
): string | undefined => {
  const country = countryCode && getCountry(state, countryCode);

  return get(country, 'structure');
};

/**
 * Returns the country structures list for the given countryCode.
 * By default, returns the structures of the current country.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} [countryCode=getCountryCode(state)] - The country code to find a specific country.
 *
 * @returns {Array | undefined} - The list of structures for the countryCode received.
 *
 * @example
 * import { getCountryStructures } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     activeStructures: getCountryStructures(state)
 * });
 */
export const getCountryStructures = (
  state: StoreState,
  countryCode: string | null = getCountryCode(state),
): string | undefined => {
  const country = countryCode && getCountry(state, countryCode);

  return get(country, 'structures');
};

/**
 * Returns the country cities error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} - Cities error.
 *
 * @example
 * import { getCountryCitiesError } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     error: getCountryCitiesError(state)
 * });
 */
export const getCountryCitiesError = (
  state: StoreState,
): State['cities']['error'] => getCountryCitiesErrorFromReducer(state.locale);

/**
 * Returns the loading status for the cities.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - Cities Loading status.
 *
 * @example
 * import { areCountryCitiesLoading } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areCountryCitiesLoading(state)
 * });
 */
export const areCountryCitiesLoading = (state: StoreState): boolean =>
  getAreCountryCitiesLoading(state.locale);

/**
 * Returns the countries error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} - Countries error.
 *
 * @example
 * import { getCountriesError } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     error: getCountriesError(state)
 * });
 */
export const getCountriesError = (
  state: StoreState,
): State['countries']['error'] => getCountriesErrorFromReducer(state.locale);

/**
 * Returns the loading status for the countries.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - Countries Loading status.
 *
 * @example
 * import { areCountriesLoading } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areCountriesLoading(state)
 * });
 */
export const areCountriesLoading = (state: StoreState): boolean =>
  getAreCountriesLoading(state.locale);

/**
 * Returns the country currencies error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} - Currencies error.
 *
 * @example
 * import { getCountryCurrenciesError } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     error: getCountryCurrenciesError(state)
 * });
 */
export const getCountryCurrenciesError = (
  state: StoreState,
): State['currencies']['error'] =>
  getCountryCurrenciesErrorFromReducer(state.locale);

/**
 * Returns the loading status for the country currencies.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - Currencies Loading status.
 *
 * @example
 * import { areCountryCurrenciesLoading } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areCountryCurrenciesLoading(state)
 * });
 */
export const areCountryCurrenciesLoading = (state: StoreState): boolean =>
  getAreCountryCurrenciesLoading(state.locale);

/**
 * Returns the country states error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} - States error.
 *
 * @example
 * import { getCountryStatesError } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     error: getCountryStatesError(state)
 * });
 */
export const getCountryStatesError = (
  state: StoreState,
): State['states']['error'] => getCountryStatesErrorFromReducer(state.locale);

/**
 * Returns the loading status for the country states.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - States Loading status.
 *
 * @example
 * import { areCountryStatesLoading } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areCountryStatesLoading(state)
 * });
 */
export const areCountryStatesLoading = (state: StoreState): boolean =>
  getAreCountryStatesLoading(state.locale);

/**
 * Returns all the country cities.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {number} stateId - The state identifier.
 *
 * @returns {Array|undefined} - All the cities related to the stateId received.
 *
 * @example
 * import { getCountryCities } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     cities: getCountryCities(state, stateId)
 * });
 */
export const getCountryCities = (
  state: StoreState,
  stateId: number,
): Array<Cities> | undefined => {
  const stateEntity = getState(state, stateId);
  const citiesIds = get(stateEntity, 'cities');

  return citiesIds && citiesIds.map((id: number) => getCity(state, id));
};

/**
 * Returns a list of country currencies.
 * By default, returns the currencies of the current country.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} [countryCode=getCountryCode(state)] - The country code to find a specific country.
 *
 * @returns {Array|undefined} - The currencies for the countryCode received.
 *
 * @example
 * import { getCountryCurrencies } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     currencies: getCountryCurrencies(state)
 * });
 */
export const getCountryCurrencies = (
  state: StoreState,
  countryCode: string | null = getCountryCode(state),
): Array<Currencies> | undefined => {
  const country = countryCode && getCountry(state, countryCode);

  return get(country, 'currencies');
};

/**
 * Returns a list of country states.
 * By default, returns the states of the current country.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} [countryCode=getCountryCode(state)] - The country code to find a specific country.
 *
 * @returns {Array|undefined} - The states for the countryCode received.
 *
 * @example
 * import { getCountryStates } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     states: getCountryStates(state)
 * });
 */
export const getCountryStates = (
  state: StoreState,
  countryCode: string | null = getCountryCode(state),
): Array<States> | undefined => {
  const country = countryCode && getCountry(state, countryCode);
  const statesIds = get(country, 'states');

  return statesIds && statesIds.map((id: number) => getState(state, id));
};
