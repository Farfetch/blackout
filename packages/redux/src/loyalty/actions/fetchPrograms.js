import {
  FETCH_PROGRAMS_FAILURE,
  FETCH_PROGRAMS_REQUEST,
  FETCH_PROGRAMS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import programSchema from '../../entities/schemas/program';

/**
 * @callback FetchProgramUsersThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load programs.
 *
 * @function fetchPrograms
 * @memberof module:loyalty/actions
 *
 * @param {Function} getPrograms - Get programs client.
 *
 * @returns {FetchProgramUsersThunkFactory} Thunk factory.
 */
export default getPrograms => config => async dispatch => {
  dispatch({
    type: FETCH_PROGRAMS_REQUEST,
  });

  try {
    const result = await getPrograms(config);

    dispatch({
      payload: normalize(result, [programSchema]),
      type: FETCH_PROGRAMS_SUCCESS,
    });

    return result;
  } catch (error) {
    dispatch({
      payload: { error },
      type: FETCH_PROGRAMS_FAILURE,
    });

    throw error;
  }
};
