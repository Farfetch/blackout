/**
 * Locale selectors.
 */

import {
  getAreCountriesLoading,
  getAreCountryCitiesLoading,
  getAreCountryCurrenciesLoading,
  getAreCountryStatesLoading,
  getCountriesAddressSchemas as getCountriesAddressSchemasFromReducer,
  getCountriesError as getCountriesErrorFromReducer,
  getCountryCitiesError as getCountryCitiesErrorFromReducer,
  getCountryCode as getCountryCodeFromReducer,
  getCountryCurrenciesError as getCountryCurrenciesErrorFromReducer,
  getCountryStatesError as getCountryStatesErrorFromReducer,
  getSourceCountryCode as getSourceCountryCodeFromReducer,
} from './reducer';
import { getEntities, getEntityById } from '../entities/selectors/entity';
import get from 'lodash/get';
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
  countryCode: string = getCountryCode(state),
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
  countryCode: string = getCountryCode(state),
) => {
  const country = getCountry(state, countryCode);

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
  countryCode: string = getCountryCode(state),
) => {
  const country = getCountry(state, countryCode);

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
  countryCode: string = getCountryCode(state),
) => {
  const country = getCountry(state, countryCode);

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
  countryCode: string = getCountryCode(state),
) => {
  const country = getCountry(state, countryCode);

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
 * Returns a specific country by its countryCode.
 *
 * @param state       - Application state.
 * @param countryCode - Identifier of the country.
 *
 * @returns - Country normalized.
 */
export const getCountry = (
  state: StoreState,
  countryCode: string = getCountryCode(state),
) => getEntityById(state, 'countries', countryCode);

/**
 * Returns all countries from state.
 *
 * @param state - Application state.
 *
 * @returns - Object with key values pairs representing countryCode and country properties.
 */
export const getCountries = (state: StoreState) =>
  getEntities(state, 'countries');

/**
 * Retrieves if countries have been fetched.
 *
 * Will return true if a fetch countries request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @example
 * ```
 * import { areCountriesFetched } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isFetched: areCountriesFetched(state)
 * });
 * ```
 * @param state - Application state.
 *
 * @returns isFetched status of countries.
 */
export const areCountriesFetched = (state: StoreState) => {
  const countries = getCountries(state);
  const countriesCount = countries ? Object.entries(countries).length : 0;

  return (
    (countriesCount > 1 || !!getCountriesError(state)) &&
    !areCountriesLoading(state)
  );
};

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
  countryCode: string = getCountryCode(state),
) => {
  const country = getCountry(state, countryCode);
  const statesIds = get(country, 'states');

  return statesIds?.map((id: number) => getState(state, id));
};

export const getState = (state: StoreState, id: number) =>
  getEntityById(state, 'states', id);

/**
 * Retrieves if country states have been fetched.
 *
 * Will return true if a fetch country states request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @example
 * ```
 * import { areCountryStatesFetched } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isFetched: areCountryStatesFetched(state)
 * });
 * ```
 * @param state - Application state.
 *
 * @returns isFetched status of country states.
 */
export const areCountryStatesFetched = (
  state: StoreState,
  countryCode: string,
) =>
  ((getCountryStates(state, countryCode)?.length ?? 0) > 0 ||
    !!getCountryStatesError(state)) &&
  !areCountryStatesLoading(state);

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
 * Returns a specific city by its id.
 *
 * @param state - Application state.
 * @param id    - Identifier of the city.
 *
 * @returns - City normalized.
 */
export const getCity = (state: StoreState, id: number) =>
  getEntityById(state, 'cities', id);

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

export const getCountryCity = (state: StoreState, id: number) =>
  getEntityById(state, 'cities', id);

/**
 * Retrieves if country state cities have been fetched.
 *
 * Will return true if a fetch country state cities request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @example
 * ```
 * import { areCountryCitiesFetched } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isFetched: areCountryCitiesFetched(state)
 * });
 * ```
 * @param state - Application state.
 *
 * @returns isFetched status of country state cities.
 */
export const areCountryCitiesFetched = (state: StoreState, stateId: number) =>
  ((getCountryCities(state, stateId)?.length ?? 0) > 0 ||
    !!getCountryCitiesError(state)) &&
  !areCountryCitiesLoading(state);

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
  countryCode: string = getCountryCode(state),
) => {
  const country = getCountry(state, countryCode);

  return get(country, 'currencies');
};

/**
 * Returns a list with all country address schemas in the application state.
 *
 * @param state - Application state.
 *
 * @returns - Schemas with the correspondent Iso code.
 */
export const getCountriesAddressSchemas = (state: StoreState) =>
  getEntities(state, 'countriesAddressSchemas');

/**
 * Returns a specific country address schema with the specified 'Iso code'.
 *
 * @param state   - Application state.
 * @param isoCode - Iso code or CountryId (deprecated).
 *
 * @returns Schema information object.
 */
export const getCountryAddressSchemas = (state: StoreState, isoCode: string) =>
  getEntityById(state, 'countriesAddressSchemas', isoCode);

/**
 * @param state - Application state.
 *
 * @returns Loader status.
 */
export const areCountriesAddressSchemasLoading = (state: StoreState) =>
  getCountriesAddressSchemasFromReducer(state.locale as LocaleState).isLoading;

/**
 * @param state - Application state.
 *
 * @returns Error details.
 */
export const getCountriesAddressSchemasError = (state: StoreState) =>
  getCountriesAddressSchemasFromReducer(state.locale as LocaleState).error;

/**
 * Retrieves if country address schemas have been fetched.
 *
 * Will return true if a fetch country address schemas request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @example
 * ```
 * import { areCountryAddressSchemasFetched } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isFetched: areCountryAddressSchemasFetched(state)
 * });
 * ```
 * @param state - Application state.
 *
 * @returns isFetched status of country address schemas.
 */
export const areCountryAddressSchemasFetched = (
  state: StoreState,
  countryCode: string,
) => {
  const countryAddressSchemas = getCountryAddressSchemas(state, countryCode);
  const schemasCount = countryAddressSchemas
    ? Object.entries(countryAddressSchemas).length
    : 0;

  return (
    (schemasCount > 0 || !!getCountriesAddressSchemasError(state)) &&
    !areCountriesAddressSchemasLoading(state)
  );
};
