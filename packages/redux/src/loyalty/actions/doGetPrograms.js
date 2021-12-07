import {
  GET_PROGRAMS_FAILURE,
  GET_PROGRAMS_REQUEST,
  GET_PROGRAMS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import programSchema from '../../entities/schemas/program';

/**
 * @callback GetProgramUsersThunkFactory
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load programs.
 *
 * @function doGetPrograms
 * @memberof module:loyalty/actions
 *
 * @param {Function} getPrograms - Get programs client.
 *
 * @returns {GetProgramUsersThunkFactory} Thunk factory.
 */
export default getPrograms => config => async dispatch => {
  dispatch({
    type: GET_PROGRAMS_REQUEST,
  });

  try {
    const result = await getPrograms(config);

    dispatch({
      payload: normalize(result, [programSchema]),
      type: GET_PROGRAMS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error },
      type: GET_PROGRAMS_FAILURE,
    });

    throw error;
  }
};
