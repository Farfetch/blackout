import join from 'proper-url-join';
import moxios from 'moxios';
import type {
  Program,
  ProgramMembership,
  ProgramMembershipConvert,
} from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    programId: Program['id'];
    membershipId: ProgramMembership['id'];
    response: ProgramMembershipConvert;
  }): void => {
    moxios.stubRequest(
      join(
        '/api/loyalty/v1/programs',
        params.programId,
        'memberships',
        params.membershipId,
        'converts',
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
        'converts',
      ),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
