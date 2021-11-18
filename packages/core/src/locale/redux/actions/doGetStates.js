import * as actionTypes from '../actionTypes';
import { normalize } from 'normalizr';
import country from '../../../entities/schemas/country';

/**
 * @callback GetStatesThunkFactory
 * @param {string} countryCode - Country identifier (ISO 3166-1 alpha-2) to find the states related.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Gets all states from a specific country.
 *
 * @function doGetStates
 * @memberof module:locale/actions
 *
 * @param {Function} getStates - Get states client.
 *
 * @returns {GetStatesThunkFactory} Thunk factory.
 */
export default getStates => (countryCode, config) => async dispatch => {
  dispatch({
    meta: { countryCode },
    type: actionTypes.GET_STATES_REQUEST,
  });

  try {
    const result = await getStates(countryCode, config);
    const countryWithStates = {
      code: countryCode,
      states: result,
    };

    dispatch({
      meta: { countryCode },
      payload: {
        ...normalize(countryWithStates, country),
      },
      type: actionTypes.GET_STATES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { countryCode },
      payload: { error },
      type: actionTypes.GET_STATES_FAILURE,
    });

    throw error;
  }
};
