import {
  CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_FAILURE,
  CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_REQUEST,
  CREATE_PROGRAM_MEMBERSHIP_REPLACEMENT_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import replacementSchema from '../../../entities/schemas/replacement';
import type { Config } from '@farfetch/blackout-client/types';
import type { CreateProgramMembershipReplacementAction } from '../../types';
import type { Dispatch } from 'redux';
import type {
  PostProgramMembershipReplacement,
  Program,
  ProgramMembership,
  ProgramMembershipReplacement,
} from '@farfetch/blackout-client/loyalty/types';

/**
 * @param programId    - Program identifier.
 * @param membershipId - Membership identifier.
 * @param data         - Replacement to be created.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

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

export default createProgramMembershipReplacementFactory;
