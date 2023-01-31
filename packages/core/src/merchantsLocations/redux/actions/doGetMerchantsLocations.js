import * as actionTypes from '../actionTypes';
import { normalize } from 'normalizr';
import merchantsLocationsSchema from '../../../entities/schemas/merchantsLocations';

/**
 * @typedef {object} GetMerchantsLocationsQuery
 * @property {string} [merchantIds] - Merchant ids to filter the merchants
 * locations.
 * @property {string} [merchantLocationIds] - Merchants location ids to filter
 * the merchants locations.
 * @property {number} [countryId] - Country id to filter the merchants
 * locations.
 */

/**
 * @callback GetMerchantsLocationsThunkFactory
 * @param {GetMerchantsLocationsQuery} [query] - Query with parameters to get
 * the merchants locations.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load merchants locations for a given set of merchant, merchantLocation and
 * country ids.
 *
 * @function doGetMerchantsLocations
 * @memberof module:merchantsLocations/actions
 *
 * @param {Function} getMerchantsLocations - Get merchants locations client.
 *
 * @returns {GetMerchantsLocationsThunkFactory} Thunk factory.
 */
export default getMerchantsLocations => (query, config) => async dispatch => {
  dispatch({
    type: actionTypes.GET_MERCHANTS_LOCATIONS_REQUEST,
  });

  try {
    const result = await getMerchantsLocations(query, config);

    return dispatch({
      payload: normalize(result, [merchantsLocationsSchema]),
      type: actionTypes.GET_MERCHANTS_LOCATIONS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: actionTypes.GET_MERCHANTS_LOCATIONS_FAILURE,
    });

    throw error;
  }
};
