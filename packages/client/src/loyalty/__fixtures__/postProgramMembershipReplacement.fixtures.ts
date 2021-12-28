import join from 'proper-url-join';
import moxios from 'moxios';
import type {
  Program,
  ProgramMembership,
  ProgramMembershipReplacement,
} from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    programId: Program['id'];
    membershipId: ProgramMembership['id'];
    data: ProgramMembershipReplacement;
    response: ProgramMembershipReplacement;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/loyalty/v1/programs',
        params.programId,
        'memberships',
        params.membershipId,
        'replacements',
      ),
      {
        response: params.response,
        status: 201,
      },
    );
  },
  failure: (params: {
    programId: Program['id'];
    membershipId: ProgramMembership['id'];
  }): void => {
    moxios.stubRequest(
      join(
        '/api/loyalty/v1/programs',
        params.programId,
        'memberships',
        params.membershipId,
        'replacements',
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
