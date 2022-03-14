import join from 'proper-url-join';
import moxios from 'moxios';
import type { UserIdParams } from '../types';

const baseUrl = 'https://api.blackandwhite-ff.com/authentication/v1/tokens';

export default {
  success: (params: UserIdParams): void => {
    moxios.stubRequest(join(baseUrl, params.id), {
      status: 204,
    });
  },
  failure: (params: UserIdParams): void => {
    moxios.stubRequest(join(baseUrl, params.id), {
      response: 'stub error',
      status: 404,
    });
  },
};
