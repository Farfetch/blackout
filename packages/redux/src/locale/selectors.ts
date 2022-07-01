/**
 * Locale selectors.
 */

import {
  getAreCountriesLoading,
  getAreCountryCitiesLoading,
  getAreCountryCurrenciesLoading,
  getAreCountryStatesLoading,
  getCountriesError as getCountriesErrorFromReducer,
  getCountryAddressSchema as getCountryAddressSchemaFromReducer,
  getCountryCitiesError as getCountryCitiesErrorFromReducer,
  getCountryCode as getCountryCodeFromReducer,
  getCountryCurrenciesError as getCountryCurrenciesErrorFromReducer,
  getCountryStatesError as getCountryStatesErrorFromReducer,
  getSourceCountryCode as getSourceCountryCodeFromReducer,
} from './reducer';
import { getCity, getCountry, getState } from '../entities/selectors';
import { getEntities, getEntityById } from '../entities/selectors/entity';
import get from 'lodash/get';
import type { CountryAddressSchema } from '@farfetch/blackout-client';
import type { LocaleState } from './types';
import type { StoreState } from '../types';

/**
 * Returns the current country code.
 *
 * @example
 * ```
 * import { getCountryCode } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     activeCountryCode: getCountryCode(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - The current country code used on the app.
 */
export const getCountryCode = (state: StoreState) =>
  getCountryCodeFromReducer(state.locale as LocaleState);

/**
 * Returns the country currency code for the given countryCode. By default, returns
 * the currency code of the current country.
 *
 * @example
 * ```
 * import { getCountryCurrencyCode } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     activeCurrencyCode: getCountryCurrencyCode(state)
 * });
 * ```
 *
 * @param state       - Application state.
 * @param countryCode - The country code to find a specific country.
 *
 * @returns - The currency code for the countryCode received.
 */
export const getCountryCurrencyCode = (
  state: StoreState,
  countryCode: string | null = getCountryCode(state),
) => {
  const countryCurrencies = getCountryCurrencies(state, countryCode);

  return get(countryCurrencies, '[0].isoCode');
};

/**
 * Returns the culture code for the given countryCode. By default, returns the
 * culture code of the current country.
 *
 * @example
 * ```
 * import { getCountryCulture } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     activeCultureCode: getCountryCulture(state)
 * });
 * ```
 *
 * @param state       - Application state.
 * @param countryCode - The country code to find a specific country.
 *
 * @returns - The culture code for the countryCode received.
 */
export const getCountryCulture = (
  state: StoreState,
  countryCode: string | null = getCountryCode(state),
) => {
  const country = countryCode && getCountry(state, countryCode);

  return get(country, 'defaultCulture');
};

/**
 * Returns the culture list for the given countryCode. By default, returns the
 * culture of the current country.
 *
 * @example
 * ```
 * import { getCountryCultures } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     activeCultureCode: getCountryCulture(state)
 * });
 * ```
 *
 * @param state       - Application state.
 * @param countryCode - The country code to find a specific country.
 *
 * @returns - The list of cultures for the countryCode received.
 */
export const getCountryCultures = (
  state: StoreState,
  countryCode: string | null = getCountryCode(state),
): string => {
  const country = countryCode && getCountry(state, countryCode);

  return get(country, 'cultures');
};

/**
 * Returns the country structure for the given countryCode. By default, returns the
 * structure of the current country.
 *
 * @example
 * ```
 * import { getCountryStructure } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     activeStructure: getCountryStructure(state)
 * });
 * ```
 *
 * @param state       - Application state.
 * @param countryCode - The country code to find a specific country.
 *
 * @returns - The structure for the countryCode received.
 */
export const getCountryStructure = (
  state: StoreState,
  countryCode: string | null = getCountryCode(state),
) => {
  const country = countryCode && getCountry(state, countryCode);

  return get(country, 'defaultSubfolder');
};

/**
 * Returns the country structures list for the given countryCode. By default,
 * returns the structures of the current country.
 *
 * @example
 * ```
 * import { getCountryStructures } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     activeStructures: getCountryStructures(state)
 * });
 * ```
 *
 * @param state       - Application state.
 * @param countryCode - The country code to find a specific country.
 *
 * @returns - The list of structures for the countryCode received.
 */
export const getCountryStructures = (
  state: StoreState,
  countryCode: string | null = getCountryCode(state),
) => {
  const country = countryCode && getCountry(state, countryCode);

  return get(country, 'structures');
};

/**
 * Returns the current source country code.
 *
 * @example
 * ```
 * import { getSourceCountryCode } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     sourceCountryCode: getSourceCountryCode(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - The current source country code used on the app.
 */
export const getSourceCountryCode = (
  state: StoreState,
): LocaleState['sourceCountryCode'] =>
  getSourceCountryCodeFromReducer(state.locale as LocaleState);

/**
 * Returns the country cities error.
 *
 * @example
 * ```
 * import { getCountryCitiesError } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     error: getCountryCitiesError(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Cities error.
 */
export const getCountryCitiesError = (state: StoreState) =>
  getCountryCitiesErrorFromReducer(state.locale as LocaleState);

/**
 * Returns the loading status for the cities.
 *
 * @example
 * ```
 * import { areCountryCitiesLoading } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areCountryCitiesLoading(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Cities Loading status.
 */
export const areCountryCitiesLoading = (state: StoreState) =>
  getAreCountryCitiesLoading(state.locale as LocaleState);

/**
 * Returns the countries error.
 *
 * @example
 * ```
 * import { getCountriesError } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     error: getCountriesError(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Countries error.
 */
export const getCountriesError = (state: StoreState) =>
  getCountriesErrorFromReducer(state.locale as LocaleState);

/**
 * Returns the loading status for the countries.
 *
 * @example
 * ```
 * import { areCountriesLoading } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areCountriesLoading(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Countries Loading status.
 */
export const areCountriesLoading = (state: StoreState) =>
  getAreCountriesLoading(state.locale as LocaleState);

/**
 * Returns the country currencies error.
 *
 * @example
 * ```
 * import { getCountryCurrenciesError } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     error: getCountryCurrenciesError(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Currencies error.
 */
export const getCountryCurrenciesError = (state: StoreState) =>
  getCountryCurrenciesErrorFromReducer(state.locale as LocaleState);

/**
 * Returns the loading status for the country currencies.
 *
 * @example
 * ```
 * import { areCountryCurrenciesLoading } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areCountryCurrenciesLoading(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - Currencies Loading status.
 */
export const areCountryCurrenciesLoading = (state: StoreState) =>
  getAreCountryCurrenciesLoading(state.locale as LocaleState);

/**
 * Returns the country states error.
 *
 * @example
 * ```
 * import { getCountryStatesError } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     error: getCountryStatesError(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - States error.
 */
export const getCountryStatesError = (state: StoreState) =>
  getCountryStatesErrorFromReducer(state.locale as LocaleState);

/**
 * Returns the loading status for the country states.
 *
 * @example
 * ```
 * import { areCountryStatesLoading } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areCountryStatesLoading(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns - States Loading status.
 */
export const areCountryStatesLoading = (state: StoreState) =>
  getAreCountryStatesLoading(state.locale as LocaleState);

/**
 * Returns all the country cities.
 *
 * @example
 * ```
 * import { getCountryCities } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     cities: getCountryCities(state, stateId)
 * });
 * ```
 *
 * @param state   - Application state.
 * @param stateId - The state identifier.
 *
 * @returns - All the cities related to the stateId received.
 */
export const getCountryCities = (state: StoreState, stateId: number) => {
  const stateEntity = getState(state, stateId);
  const citiesIds = get(stateEntity, 'cities');

  return citiesIds && citiesIds.map((id: number) => getCity(state, id));
};

/**
 * Returns a list of country currencies. By default, returns the currencies of the
 * current country.
 *
 * @example
 * ```
 * import { getCountryCurrencies } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     currencies: getCountryCurrencies(state)
 * });
 * ```
 *
 * @param state       - Application state.
 * @param countryCode - The country code to find a specific country.
 *
 * @returns - The currencies for the countryCode received.
 */
export const getCountryCurrencies = (
  state: StoreState,
  countryCode: string | null = getCountryCode(state),
) => {
  const country = countryCode && getCountry(state, countryCode);

  return get(country, 'currencies');
};

/**
 * Returns a list of country states. By default, returns the states of the current
 * country.
 *
 * @example
 * ```
 * import { getCountryStates } from '@farfetch/blackout-redux/locale';
 *
 * const mapStateToProps = state => ({
 *     states: getCountryStates(state)
 * });
 * ```
 *
 * @param state       - Application state.
 * @param countryCode - The country code to find a specific country.
 *
 * @returns - The states for the countryCode received.
 */
export const getCountryStates = (
  state: StoreState,
  countryCode: string | null = getCountryCode(state),
) => {
  const country = countryCode && getCountry(state, countryCode);
  const statesIds = get(country, 'states');

  return statesIds && statesIds.map((id: number) => getState(state, id));
};

/**
 * Returns a list with all country address schemas in the application state.
 *
 * @param state - Application state.
 *
 * @returns - Schemas with the correspondent Iso code.
 */
export const getCountryAddressSchemas = (state: StoreState) =>
  getEntities(state, 'countryAddressSchemas');

/**
 * Returns a specific country address schema with the specified 'Iso code'.
 *
 * @param state   - Application state.
 * @param isoCode - Iso code or CountryId (deprecated).
 *
 * @returns Schema information object.
 */
export const getCountryAddressSchema = (
  state: StoreState,
  isoCode: string,
): CountryAddressSchema[] | undefined =>
  getEntityById(state, 'countryAddressSchemas', isoCode);

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areCountryAddressSchemasLoading = (
  state: StoreState,
): LocaleState['countryAddressSchema']['isLoading'] =>
  getCountryAddressSchemaFromReducer(state.locale as LocaleState).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getCountryAddressSchemaError = (
  state: StoreState,
): LocaleState['countryAddressSchema']['error'] =>
  getCountryAddressSchemaFromReducer(state.locale as LocaleState).error;
