import * as actionTypes from '../actionTypes';
import { normalize } from 'normalizr';
import state from '../../../entities/schemas/state';

/**
 * @callback GetCitiesThunkFactory
 * @param {string} countryCode - Country identifier (ISO 3166-1 alpha-2) to find the cities related.
 * @param {number} stateId - State identifier to find the cities related.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets all cities from an specific country and state.
 *
 * @function doGetCities
 * @memberof module:locale/actions
 *
 * @param {Function} getCities - Get cities client.
 *
 * @returns {GetCitiesThunkFactory} Thunk factory.
 */
export default getCities => (countryCode, stateId, config) => async dispatch => {
  dispatch({
    meta: {
      countryCode,
      stateId,
    },
    type: actionTypes.GET_CITIES_REQUEST,
  });

  try {
    const result = await getCities(countryCode, stateId, config);
    const stateWithCities = {
      id: stateId,
      cities: result,
    };

    dispatch({
      meta: {
        countryCode,
        stateId,
      },
      payload: {
        ...normalize(stateWithCities, state),
      },
      type: actionTypes.GET_CITIES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: {
        countryCode,
        stateId,
      },
      payload: { error },
      type: actionTypes.GET_CITIES_FAILURE,
    });

    throw error;
  }
};
