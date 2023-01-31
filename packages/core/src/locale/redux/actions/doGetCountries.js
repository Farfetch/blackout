import * as actionTypes from '../actionTypes';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';

/**
 * @typedef {object} GetCountriesQuery
 * @property {object} [pageIndex=1] - The current page.
 * @property {object} [pageSize=15] - Size of each page, as a number.
 */

/**
 * @callback GetCountriesThunkFactory
 * @param {GetCountriesQuery} [query] - Query parameters to apply to the request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets all countries.
 *
 * @function doGetCountries
 * @memberof module:locale/actions
 *
 * @param {Function} getCountries - Get countries client.
 *
 * @returns {GetCountriesThunkFactory} Thunk factory.
 */
export default getCountries => (query, config) => async dispatch => {
  dispatch({
    type: actionTypes.GET_COUNTRIES_REQUEST,
  });

  try {
    const result = await getCountries(query, config);

    dispatch({
      payload: {
        ...normalize(result, { entries: [country] }),
      },
      type: actionTypes.GET_COUNTRIES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: actionTypes.GET_COUNTRIES_FAILURE,
    });

    throw error;
  }
};
