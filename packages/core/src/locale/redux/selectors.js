/**
 * Locale selectors.
 *
 * @module locale/selectors
 * @category Locale
 * @subcategory Selectors
 */

import {
  getAreCitiesLoading,
  getAreCountriesLoading,
  getAreCurrenciesLoading,
  getAreStatesLoading,
  getCitiesError as getCitiesErrorFromReducer,
  getCountriesError as getCountriesErrorFromReducer,
  getCountryCode as getCountryCodeFromReducer,
  getCurrenciesError as getCurrenciesErrorFromReducer,
  getStatesError as getStatesErrorFromReducer,
} from './reducer';
import { getCity, getCountry, getState } from '../../entities/redux/selectors';
import get from 'lodash/get';

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
 * import { getCountryCode } from '@farfetch/blackout-core/locale/redux';
 *
 * const mapStateToProps = state => ({
 *     activeCountryCode: getCountryCode(state)
 * });
 */
export const getCountryCode = state => getCountryCodeFromReducer(state.locale);

/**
 * Returns a list of currencies for the given countryCode.
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
 * import { getCurrenciesByCountryCode } from '@farfetch/blackout-core/locale/redux';
 *
 * const mapStateToProps = state => ({
 *     currencies: getCurrenciesByCountryCode(state)
 * });
 */
export const getCurrenciesByCountryCode = (
  state,
  countryCode = getCountryCode(state),
) => {
  const country = getCountry(state, countryCode);

  return get(country, 'currencies');
};

/**
 * Returns the currency code for the given countryCode.
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
 * import { getCurrencyCode } from '@farfetch/blackout-core/locale/redux';
 *
 * const mapStateToProps = state => ({
 *     activeCurrencyCode: getCurrencyCode(state)
 * });
 */
export const getCurrencyCode = (state, countryCode = getCountryCode(state)) => {
  const countryCurrencies = getCurrenciesByCountryCode(state, countryCode);

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
 * import { getCultureCode } from '@farfetch/blackout-core/locale/redux';
 *
 * const mapStateToProps = state => ({
 *     activeCultureCode: getCultureCode(state)
 * });
 */
export const getCultureCode = (state, countryCode = getCountryCode(state)) => {
  const country = getCountry(state, countryCode);

  return get(country, 'cultureCode');
};

/**
 * Returns the subfolder for the given countryCode.
 * By default, returns the subfolder of the current country.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} [countryCode=getCountryCode(state)] - The country code to find a specific country.
 *
 * @returns {string | undefined} - The subfolder for the countryCode received.
 *
 * @example
 * import { getSubfolder } from '@farfetch/blackout-core/locale/redux';
 *
 * const mapStateToProps = state => ({
 *     activeSubfolder: getSubfolder(state)
 * });
 */
export const getSubfolder = (state, countryCode = getCountryCode(state)) => {
  const country = getCountry(state, countryCode);

  return get(country, 'structure');
};

/**
 * Returns the cities error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} - Cities error.
 *
 * @example
 * import { getCitiesError } from '@farfetch/blackout-core/locale/redux';
 *
 * const mapStateToProps = state => ({
 *     error: getCitiesError(state)
 * });
 */
export const getCitiesError = state => getCitiesErrorFromReducer(state.locale);

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
 * import { areCitiesLoading } from '@farfetch/blackout-core/locale/redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areCitiesLoading(state)
 * });
 */
export const areCitiesLoading = state => getAreCitiesLoading(state.locale);

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
 * import { getCountriesError } from '@farfetch/blackout-core/locale/redux';
 *
 * const mapStateToProps = state => ({
 *     error: getCountriesError(state)
 * });
 */
export const getCountriesError = state =>
  getCountriesErrorFromReducer(state.locale);

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
 * import { areCountriesLoading } from '@farfetch/blackout-core/locale/redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areCountriesLoading(state)
 * });
 */
export const areCountriesLoading = state =>
  getAreCountriesLoading(state.locale);

/**
 * Returns the currencies error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} - Currencies error.
 *
 * @example
 * import { getCurrenciesError } from '@farfetch/blackout-core/locale/redux';
 *
 * const mapStateToProps = state => ({
 *     error: getCurrenciesError(state)
 * });
 */
export const getCurrenciesError = state =>
  getCurrenciesErrorFromReducer(state.locale);

/**
 * Returns the loading status for the currencies.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - Currencies Loading status.
 *
 * @example
 * import { areCurrenciesLoading } from '@farfetch/blackout-core/locale/redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areCurrenciesLoading(state)
 * });
 */
export const areCurrenciesLoading = state =>
  getAreCurrenciesLoading(state.locale);

/**
 * Returns the states error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} - States error.
 *
 * @example
 * import { getStatesError } from '@farfetch/blackout-core/locale/redux';
 *
 * const mapStateToProps = state => ({
 *     error: getStatesError(state)
 * });
 */
export const getStatesError = state => getStatesErrorFromReducer(state.locale);

/**
 * Returns the loading status for the states.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - States Loading status.
 *
 * @example
 * import { areStatesLoading } from '@farfetch/blackout-core/locale/redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areStatesLoading(state)
 * });
 */
export const areStatesLoading = state => getAreStatesLoading(state.locale);

/**
 * Returns all the cities related to a given stateId.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {number} stateId - The state identifier.
 *
 * @returns {Array|undefined} - All the cities related to the stateId received.
 *
 * @example
 * import { getCitiesByStateId } from '@farfetch/blackout-core/locale/redux';
 *
 * const mapStateToProps = state => ({
 *     cities: getCitiesByStateId(state, stateId)
 * });
 */
export const getCitiesByStateId = (state, stateId) => {
  const stateEntity = getState(state, stateId);
  const citiesIds = get(stateEntity, 'cities');

  return citiesIds && citiesIds.map(id => getCity(state, id));
};

/**
 * Returns a list of states for the given countryCode.
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
 * import { getStatesByCountryCode } from '@farfetch/blackout-core/locale/redux';
 *
 * const mapStateToProps = state => ({
 *     states: getStatesByCountryCode(state)
 * });
 */
export const getStatesByCountryCode = (
  state,
  countryCode = getCountryCode(state),
) => {
  const country = getCountry(state, countryCode);
  const statesIds = get(country, 'states');

  return statesIds && statesIds.map(id => getState(state, id));
};
