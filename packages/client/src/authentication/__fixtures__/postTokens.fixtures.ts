import moxios from 'moxios';
import type { PostTokenResponse } from '../types';
const baseUrl = 'https://api.blackandwhite-ff.com/authentication/v1/tokens';

export default {
  success: (params: { response: PostTokenResponse }) => {
    moxios.stubRequest(baseUrl, {
      response: params.response,
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest(baseUrl, {
      response: 'stub error',
      status: 404,
    });
  },
};
