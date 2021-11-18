import * as actionTypes from '../actionTypes';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';

/**
 * @callback GetCurrenciesThunkFactory
 * @param {string} countryCode - Country identifier (ISO 3166-1 alpha-2) to find the currencies related.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets all currencies from a specific country.
 *
 * @function doGetCurrencies
 * @memberof module:locale/actions
 *
 * @param {Function} getCurrencies - Get currencies client.
 *
 * @returns {GetCurrenciesThunkFactory} Thunk factory.
 */
export default getCurrencies => (countryCode, config) => async dispatch => {
  dispatch({
    meta: { countryCode },
    type: actionTypes.GET_CURRENCIES_REQUEST,
  });

  try {
    const result = await getCurrencies(countryCode, config);
    const countryWithCurrencies = {
      code: countryCode,
      currencies: result,
    };

    dispatch({
      meta: { countryCode },
      payload: {
        ...normalize(countryWithCurrencies, country),
      },
      type: actionTypes.GET_CURRENCIES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { countryCode },
      payload: { error },
      type: actionTypes.GET_CURRENCIES_FAILURE,
    });

    throw error;
  }
};
