import { getEntities, getEntityById } from './entity';
import type {
  Countries,
  Country,
} from '@farfetch/blackout-client/locale/types';
import type { StoreState } from '../../types';

/**
 * Returns a specific country by its countryCode.
 *
 * @function getCountry
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {string} countryCode - Identifier of the country.
 *
 * @returns {object} - Country normalized.
 */
export const getCountry = (state: StoreState, countryCode: string): Country =>
  getEntityById(state, 'countries', countryCode);

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
export const getCountries = (state: StoreState): Countries =>
  getEntities(state, 'countries');
