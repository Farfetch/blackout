import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type PostProgramMembershipReplacement,
  type Program,
  type ProgramMembership,
  type ProgramMembershipReplacement,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import replacementSchema from '../../../entities/schemas/replacement';
import type { CreateProgramMembershipReplacementAction } from '../../types';
import type { Dispatch } from 'redux';

/**
 * Request a new membership id by replacement.
 *
 * @param postProgramMembershipReplacement - Post program membership replacement client.
 *
 * @returns Thunk factory.
 */

const createProgramMembershipReplacementFactory =
  (postProgramMembershipReplacement: PostProgramMembershipReplacement) =>
  (
    programId: Program['id'],
    membershipId: ProgramMembership['id'],
    data: ProgramMembershipReplacement,
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<CreateProgramMembershipReplacementAction>,
  ): Promise<ProgramMembershipReplacement> => {
    try {
      dispatch({
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_REQUEST,
      });

      const result = await postProgramMembershipReplacement(
        programId,
        membershipId,
        data,
        config,
      );

      dispatch({
        payload: normalize(result, replacementSchema),
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createProgramMembershipReplacementFactory;
