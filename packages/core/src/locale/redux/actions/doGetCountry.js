import * as actionTypes from '../actionTypes';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';

/**
 * @callback GetCountryThunkFactory
 * @param {string} countryCode - Country identifier (ISO 3166-1 alpha-2).
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets a specific country, by its country code.
 *
 * @function doGetCountry
 * @memberof module:locale/actions
 *
 * @param {Function} getCountry - Get country client.
 *
 * @returns {GetCountryThunkFactory} Thunk factory.
 */
export default getCountry => (countryCode, config) => async dispatch => {
  dispatch({
    meta: { countryCode },
    type: actionTypes.GET_COUNTRY_REQUEST,
  });

  try {
    const result = await getCountry(countryCode, config);

    dispatch({
      meta: { countryCode },
      payload: {
        ...normalize(result, country),
      },
      type: actionTypes.GET_COUNTRY_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { countryCode },
      payload: { error },
      type: actionTypes.GET_COUNTRY_FAILURE,
    });

    throw error;
  }
};
