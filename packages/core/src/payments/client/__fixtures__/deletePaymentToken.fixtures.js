import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(join('/api/payment/v1/tokens', params.tokenId), {
      method: 'delete',
      response: params.response,
      status: 200,
    });
  },
  failure: params => {
    moxios.stubRequest(join('/api/payment/v1/tokens', params.tokenId), {
      method: 'delete',
      response: 'stub error',
      status: 404,
    });
  },
};
