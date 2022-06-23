import join from 'proper-url-join';
import moxios from 'moxios';
import type { GetCreditResponse } from '../types';

export default {
  success: (params: { id: string; response: GetCreditResponse }): void => {
    moxios.stubRequest(join('api/legacy/v1/users', params.id, 'credits'), {
      response: params.response,
      status: 200,
    });
  },
  failure: (params: { id: string }): void => {
    moxios.stubRequest(join('api/legacy/v1/users', params.id, 'credits'), {
      response: 'stub error',
      status: 404,
    });
  },
};
