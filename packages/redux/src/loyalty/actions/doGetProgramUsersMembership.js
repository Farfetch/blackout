import {
  GET_PROGRAM_USERS_MEMBERSHIP_FAILURE,
  GET_PROGRAM_USERS_MEMBERSHIP_REQUEST,
  GET_PROGRAM_USERS_MEMBERSHIP_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import membershipSchema from '../../entities/schemas/membership';

/**
 * @callback GetProgramUsersMembershipThunkFactory
 * @param {string} programId - Program identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load program membership statements.
 *
 * @function doGetProgramUsersMembership
 * @memberof module:loyalty/actions
 *
 * @param {Function} getProgramUsersMembership - Get program users membership
 *  client.
 *
 * @returns {GetProgramUsersMembershipThunkFactory} Thunk factory.
 */
export default getProgramUsersMembership =>
  (programId, config) =>
  async dispatch => {
    dispatch({
      type: GET_PROGRAM_USERS_MEMBERSHIP_REQUEST,
    });

    try {
      const result = await getProgramUsersMembership(programId, config);

      dispatch({
        payload: normalize(result, membershipSchema),
        type: GET_PROGRAM_USERS_MEMBERSHIP_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: GET_PROGRAM_USERS_MEMBERSHIP_FAILURE,
      });

      throw error;
    }
  };
