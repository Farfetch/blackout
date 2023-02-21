import * as actionTypes from '../../actionTypes';
import {
  type Config,
  type GetProgramMembershipStatements,
  type GetProgramMembershipStatementsQuery,
  type Program,
  type ProgramMembership,
  type ProgramMembershipStatement,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import statementSchema from '../../../entities/schemas/statement';
import type { Dispatch } from 'redux';
import type { FetchProgramMembershipStatementsAction } from '../../types';

/**
 * Load program membership statements.
 *
 * @param getProgramMembershipStatements - Get program membership statements client.
 *
 * @returns Thunk factory.
 */
const fetchProgramMembershipStatementsFactory =
  (getProgramMembershipStatements: GetProgramMembershipStatements) =>
  (
    programId: Program['id'],
    membershipId: ProgramMembership['id'],
    query: GetProgramMembershipStatementsQuery = {},
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch<FetchProgramMembershipStatementsAction>,
  ): Promise<ProgramMembershipStatement[]> => {
    try {
      dispatch({
        type: actionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_REQUEST,
      });

      const result = await getProgramMembershipStatements(
        programId,
        membershipId,
        query,
        config,
      );

      dispatch({
        payload: normalize(result, [statementSchema]),
        type: actionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchProgramMembershipStatementsFactory;
