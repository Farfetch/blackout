import { getEntities, getEntityById } from './entity';
import type {
  Countries,
  Country,
} from '@farfetch/blackout-client/locale/types';
import type { StoreState } from '../../types';

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
  countryCode: string,
): Country | undefined => getEntityById(state, 'countries', countryCode);

/**
 * Returns all countries from state.
 *
 * @param state - Application state.
 *
 * @returns - Object with key values pairs representing countryCode and country properties.
 */
export const getCountries = (state: StoreState): Countries =>
  getEntities(state, 'countries');
