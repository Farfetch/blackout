import { normalize } from 'normalizr';
import {
  REQUEST_PROGRAM_MEMBERSHIP_REPLACEMENT_FAILURE,
  REQUEST_PROGRAM_MEMBERSHIP_REPLACEMENT_REQUEST,
  REQUEST_PROGRAM_MEMBERSHIP_REPLACEMENT_SUCCESS,
} from '../actionTypes';
import replacementSchema from '../../../entities/schemas/replacement';

/**
 * @callback RequestProgramMembershipReplacementThunkFactory
 * @param {string} programId - Program identifier.
 * @param {string} membershipId - Membership identifier.
 * @param {object} data - Replacement to be created.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Request a new membership id by replacement.
 *
 * @function doRequestProgramMembershipReplacement
 * @memberof module:loyalty/actions
 *
 * @param {Function} postProgramMembershipReplacement - Post program membership
 * replacement client.
 *
 * @returns {RequestProgramMembershipReplacementThunkFactory} Thunk factory.
 */
export default postProgramMembershipReplacement =>
  (programId, membershipId, data, config) =>
  async dispatch => {
    dispatch({
      type: REQUEST_PROGRAM_MEMBERSHIP_REPLACEMENT_REQUEST,
    });

    try {
      const result = await postProgramMembershipReplacement(
        programId,
        membershipId,
        data,
        config,
      );

      dispatch({
        payload: normalize(result, replacementSchema),
        type: REQUEST_PROGRAM_MEMBERSHIP_REPLACEMENT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error },
        type: REQUEST_PROGRAM_MEMBERSHIP_REPLACEMENT_FAILURE,
      });

      throw error;
    }
  };
