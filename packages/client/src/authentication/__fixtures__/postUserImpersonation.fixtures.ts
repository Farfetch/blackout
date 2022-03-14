import moxios from 'moxios';
import type { PostTokenResponse } from '../types';

export default {
  success: (params: { response: PostTokenResponse }) => {
    moxios.stubRequest('/api/authentication/v1/userImpersonations', {
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/authentication/v1/userImpersonations', {
      response: 'stub error',
      status: 404,
    });
  },
};
