import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import membershipSchema from '../../../entities/schemas/membership';
import type { Config } from '@farfetch/blackout-client/types';
import type { CreateProgramMembershipAction } from '../../types';
import type { Dispatch } from 'redux';
import type {
  PostProgramMembership,
  Program,
  ProgramMembership,
} from '@farfetch/blackout-client/loyalty/types';

/**
 * @param programId - Program identifier.
 * @param data      - Membership to be created.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Create program membership.
 *
 * @param postProgramMembership - Post program membership client.
 *
 * @returns Thunk factory.
 */

const createProgramMembershipFactory =
  (postProgramMembership: PostProgramMembership) =>
  (programId: Program['id'], data: ProgramMembership, config?: Config) =>
  async (
    dispatch: Dispatch<CreateProgramMembershipAction>,
  ): Promise<ProgramMembership> => {
    try {
      dispatch({
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_REQUEST,
      });

      const result = await postProgramMembership(programId, data, config);

      dispatch({
        payload: normalize(result, membershipSchema),
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        payload: { error: toError(error) },
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_FAILURE,
      });

      throw error;
    }
  };

export default createProgramMembershipFactory;
