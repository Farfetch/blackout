import moxios from 'moxios';
import type { PostGuestTokenResponse } from '../types';
const baseUrl =
  'https://api.blackandwhite-ff.com/authentication/v1/guestTokens';

export default {
  success: (params: { response: PostGuestTokenResponse }) => {
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
