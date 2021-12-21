import {
  CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_FAILURE,
  CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_REQUEST,
  CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import replacementSchema from '../../../entities/schemas/replacement';

/**
 * @typedef {object} CreateProgramMembershipReplacementData
 * @property {string} reason - Reason of replacement.
 */

/**
 * @callback CreateProgramMembershipReplacementThunkFactory
 * @param {string} programId - Program identifier.
 * @param {string} membershipId - Membership identifier.
 * @param {CreateProgramMembershipReplacementData} data - Replacement to be created.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Request a new membership id by replacement.
 *
 * @function createProgramMembershipReplacementFactory
 * @memberof module:loyalty/actions/factories
 *
 * @param {Function} postProgramMembershipReplacement - Post program membership
 * replacement client.
 *
 * @returns {CreateProgramMembershipReplacementThunkFactory} Thunk factory.
 */
export default postProgramMembershipReplacement =>
  (programId, membershipId, data, config) =>
  async dispatch => {
    dispatch({
      type: CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_REQUEST,
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
        type: CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_FAILURE,
      });

      throw error;
    }
  };
