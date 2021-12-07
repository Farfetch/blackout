import {
  CREATE_PROGRAM_MEMBERSHIP_FAILURE,
  CREATE_PROGRAM_MEMBERSHIP_REQUEST,
  CREATE_PROGRAM_MEMBERSHIP_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import membershipSchema from '../../entities/schemas/membership';

/**
 * @callback CreateProgramMembershipThunkFactory
 * @param {string} programId - Program identifier.
 * @param {object} data - Membership to be created.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Create program membership.
 *
 * @function doCreateProgramMembership
 * @memberof module:loyalty/actions
 *
 * @param {Function} postProgramMembership - Post program membership client.
 *
 * @returns {CreateProgramMembershipThunkFactory} Thunk factory.
 */
export default postProgramMembership =>
  (programId, data, config) =>
  async dispatch => {
    dispatch({
      type: CREATE_PROGRAM_MEMBERSHIP_REQUEST,
    });

    try {
      const result = await postProgramMembership(programId, data, config);

      dispatch({
        payload: normalize(result, membershipSchema),
        type: CREATE_PROGRAM_MEMBERSHIP_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_PROGRAM_MEMBERSHIP_FAILURE,
      });

      throw error;
    }
  };
