import type { Country } from '@farfetch/blackout-client';

/**
 * Locale utils.
 */

/**
 * Build a list with all continents and respective countries.
 *
 * @example
 * ```
 * const continents = createContinentsList({ US: { continentId: 1 } });
 * ```
 *
 * @param countries - Object with a list of all countries by countryCode.
 *
 * @returns - List of continents with respective id and countries list.
 */
export const createContinentsList = (
  countries: Country[],
): Array<{ id: number; countries: Country[] }> => {
  const countriesArr = Object.values(countries) as Country[];
  const continents = Array.from(new Set(countriesArr.map(c => c.continentId)));

  return continents.sort().map(id => ({
    id,
    countries: countriesArr
      .map(country => (country.continentId === id ? country : undefined))
      .filter(Boolean) as Country[],
  }));
};
