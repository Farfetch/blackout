import join from 'proper-url-join';
import moxios from 'moxios';
import type {
  GetProgramMembershipStatementsQuery,
  Program,
  ProgramMembership,
  ProgramMembershipStatement,
} from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    programId: Program['id'];
    membershipId: ProgramMembership['id'];
    query: GetProgramMembershipStatementsQuery;
    response: ProgramMembershipStatement[];
  }): void => {
    moxios.stubRequest(
      join(
        '/api/loyalty/v1/programs',
        params.programId,
        'memberships',
        params.membershipId,
        'statements',
        { query: params.query },
      ),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: {
    programId: Program['id'];
    membershipId: ProgramMembership['id'];
    query: GetProgramMembershipStatementsQuery;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/loyalty/v1/programs',
        params.programId,
        'memberships',
        params.membershipId,
        'statements',
        { query: params.query },
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
