import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
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
 * @param programId    - Program identifier.
 * @param membershipId - Membership identifier.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Create program membership convert.
 *
 * @param postProgramMembershipConvert - Post program membership convert client.
 *
 * @returns Thunk factory.
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
    try {
      dispatch({
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_CONVERT_REQUEST,
      });

      const result = await postProgramMembershipConvert(
        programId,
        membershipId,
        config,
      );

      dispatch({
        payload: normalize(result, convertSchema),
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_CONVERT_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_CONVERT_FAILURE,
      });

      throw error;
    }
  };

export default createProgramMembershipConvertFactory;
