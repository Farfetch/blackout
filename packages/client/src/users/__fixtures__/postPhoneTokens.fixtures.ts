import moxios from 'moxios';

export default {
  success: (params: { response: Record<string, unknown> }): void => {
    moxios.stubRequest('/api/account/v1/users/phoneTokens', {
      response: params.response,
      status: 200,
    });
  },
  failure: (): void => {
    moxios.stubRequest('/api/account/v1/users/phoneTokens', {
      response: 'stub error',
      status: 404,
    });
  },
};
