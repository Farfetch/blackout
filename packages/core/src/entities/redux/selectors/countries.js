import { getEntity } from './entity';

/**
 * Returns a specific country by its countryCode.
 *
 * @function getCountry
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} countryCode - Identifier of the country.
 *
 * @returns {object} - Country normalized.
 */
export const getCountry = (state, countryCode) =>
  getEntity(state, 'countries', countryCode);

/**
 * Returns all countries from state.
 *
 * @function getCountries
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object} - Object with key values pairs representing countryCode and country properties.
 */
export const getCountries = state => getEntity(state, 'countries');
