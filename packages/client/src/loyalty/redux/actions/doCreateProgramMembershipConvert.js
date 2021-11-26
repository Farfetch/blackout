import {
  CREATE_PROGRAM_MEMBERSHIP_CONVERT_FAILURE,
  CREATE_PROGRAM_MEMBERSHIP_CONVERT_REQUEST,
  CREATE_PROGRAM_MEMBERSHIP_CONVERT_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import convertSchema from '../../../entities/schemas/convert';

/**
 * @callback CreateProgramMembershipConvertThunkFactory
 * @param {string} programId - Program identifier.
 * @param {string} membershipId - Membership identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Create program membership convert.
 *
 * @function doCreateProgramMembershipConvert
 * @memberof module:loyalty/actions
 *
 * @param {Function} postProgramMembershipConvert - Post program membership
 * convert client.
 *
 * @returns {CreateProgramMembershipConvertThunkFactory} Thunk factory.
 */
export default postProgramMembershipConvert =>
  (programId, membershipId, config) =>
  async dispatch => {
    dispatch({
      type: CREATE_PROGRAM_MEMBERSHIP_CONVERT_REQUEST,
    });

    try {
      const result = await postProgramMembershipConvert(
        programId,
        membershipId,
        config,
      );

      dispatch({
        payload: normalize(result, convertSchema),
        type: CREATE_PROGRAM_MEMBERSHIP_CONVERT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_PROGRAM_MEMBERSHIP_CONVERT_FAILURE,
      });

      throw error;
    }
  };
