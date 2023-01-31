/**
 * Locale utils.
 *
 * @module locale/utils
 * @category Locale
 * @subcategory Utils
 */

/**
 * Build a list with all continents and respective countries.
 *
 * @function
 *
 * @param {object} countries -  Object with a list of all countries by countryCode.
 *
 * @returns {object[]} - List of continents with respective id and countries list.
 *
 * @example
 * const continents = createContinentsList({ US: { continentId: 1 } });
 */
export const createContinentsList = countries => {
  const countriesArr = Object.values(countries);
  const continents = Array.from(new Set(countriesArr.map(c => c.continentId)));

  return continents.sort().map(id => ({
    id,
    countries: countriesArr
      .map(country => (country.continentId === id ? country : undefined))
      .filter(e => !!e),
  }));
};
