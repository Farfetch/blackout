import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: (params: { id: string; response: any }): void => {
    moxios.stubRequest(
      join('/api/legacy/v1/orders', params.id, 'returnoptions'),
      {
        response: params.response,
        status: 200,
      },
    );
  },
  failure: (params: { id: string }): void => {
    moxios.stubRequest(
      join('/api/legacy/v1/orders', params.id, 'returnoptions'),
      {
        response: 'stub error',
        status: 404,
      },
    );
  },
};
