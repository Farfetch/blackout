import {
  CREATE_PROGRAM_MEMBERSHIP_CONVERT_FAILURE,
  CREATE_PROGRAM_MEMBERSHIP_CONVERT_REQUEST,
  CREATE_PROGRAM_MEMBERSHIP_CONVERT_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import convertSchema from '../../../entities/schemas/convert';
import type { Config } from '@farfetch/blackout-client/types';
import type { CreateProgramMembershipConvertAction } from '../../types';
import type { Dispatch } from 'redux';
import type {
  PostProgramMembershipConvert,
  Program,
  ProgramMembership,
  ProgramMembershipConvert,
} from '@farfetch/blackout-client/loyalty/types';

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
 * @function createProgramMembershipConvertFactory
 * @memberof module:loyalty/actions/factories
 *
 * @param {Function} postProgramMembershipConvert - Post program membership
 * convert client.
 *
 * @returns {CreateProgramMembershipConvertThunkFactory} Thunk factory.
 */

const createProgramMembershipConvertFactory =
  (postProgramMembershipConvert: PostProgramMembershipConvert) =>
  (
    programId: Program['id'],
    membershipId: ProgramMembership['id'],
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<CreateProgramMembershipConvertAction>,
  ): Promise<ProgramMembershipConvert> => {
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

      return result;
    } catch (error) {
      dispatch({
        payload: { error },
        type: CREATE_PROGRAM_MEMBERSHIP_CONVERT_FAILURE,
      });

      throw error;
    }
  };

export default createProgramMembershipConvertFactory;
