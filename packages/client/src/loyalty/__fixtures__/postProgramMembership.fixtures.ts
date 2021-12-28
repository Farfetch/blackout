import join from 'proper-url-join';
import moxios from 'moxios';
import type { Program, ProgramMembership } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: {
    programId: Program['id'];
    data: ProgramMembership;
    response: ProgramMembership;
  }): void => {
    moxios.stubRequest(
      join('/api/loyalty/v1/programs', params.programId, 'memberships'),
      {
        response: params.response,
        status: 201,
      },
    );
  },
  failure: (params: { programId: Program['id'] }): void => {
    moxios.stubRequest(
      join('/api/loyalty/v1/programs', params.programId, 'memberships'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
