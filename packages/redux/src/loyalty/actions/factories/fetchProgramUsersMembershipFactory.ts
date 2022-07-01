import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetProgramUsersMembership,
  Program,
  ProgramMembership,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import membershipSchema from '../../../entities/schemas/membership';
import type { Dispatch } from 'redux';
import type { FetchProgramUsersMembershipAction } from '../../types';

/**
 * @param programId - Program identifier.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

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
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PROGRAM_USERS_MEMBERSHIP_FAILURE,
      });

      throw error;
    }
  };

export default fetchProgramUsersMembershipFactory;
