import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostProgramMembership,
  Program,
  ProgramMembership,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import membershipSchema from '../../../entities/schemas/membership';
import type { CreateProgramMembershipAction } from '../../types';
import type { Dispatch } from 'redux';

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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createProgramMembershipFactory;
