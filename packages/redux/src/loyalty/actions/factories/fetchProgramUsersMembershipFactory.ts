import * as actionTypes from '../../actionTypes.js';
import {
  type Config,
  type GetProgramUsersMembership,
  type Program,
  type ProgramMembership,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import membershipSchema from '../../../entities/schemas/membership.js';
import type { Dispatch } from 'redux';
import type { FetchProgramUsersMembershipAction } from '../../types/index.js';

/**
 * Load program membership statements.
 *
 * @param getProgramUsersMembership - Get program users membership client.
 *
 * @returns Thunk factory.
 */

const fetchProgramUsersMembershipFactory =
  (getProgramUsersMembership: GetProgramUsersMembership) =>
  (programId: Program['id'], config?: Config) =>
  async (
    dispatch: Dispatch<FetchProgramUsersMembershipAction>,
  ): Promise<ProgramMembership> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_REQUEST,
      });

      const result = await getProgramUsersMembership(programId, config);

      dispatch({
        payload: normalize(result, membershipSchema),
        type: actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchProgramUsersMembershipFactory;
