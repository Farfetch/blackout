import join from 'proper-url-join';
import moxios from 'moxios';
import type { StaffMember } from '../types';

/**
 * Response payloads.
 */
export default {
  success: (params: { id: number; response: StaffMember }): void => {
    moxios.stubRequest(join('/api/account/v1/staffMembers', params.id), {
      response: params.response,
      status: 200,
    });
  },
  failure: (params: { id: number }): void => {
    moxios.stubRequest(join('/api/account/v1/staffMembers', params.id), {
      response: 'stub error',
      status: 404,
    });
  },
};
