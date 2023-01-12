import * as actionTypes from '../../actionTypes';
import {
  Config,
  PostProgramMembershipConvert,
  Program,
  ProgramMembership,
  ProgramMembershipConvert,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import convertSchema from '../../../entities/schemas/convert';
import type { CreateProgramMembershipConvertAction } from '../../types';
import type { Dispatch } from 'redux';

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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.CREATE_PROGRAM_MEMBERSHIP_CONVERT_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default createProgramMembershipConvertFactory;
