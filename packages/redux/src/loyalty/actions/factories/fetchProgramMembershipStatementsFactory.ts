import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetProgramMembershipStatements,
  GetProgramMembershipStatementsQuery,
  Program,
  ProgramMembership,
  ProgramMembershipStatement,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import statementSchema from '../../../entities/schemas/statement';
import type { Dispatch } from 'redux';
import type { FetchProgramMembershipStatementsAction } from '../../types';

/**
 * @param programId    - Program identifier.
 * @param membershipId - Membership identifier.
 * @param query        - Data to retrieve memberships statements.
 * @param config       - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

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
      dispatch({
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PROGRAM_MEMBERSHIP_STATEMENTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchProgramMembershipStatementsFactory;
