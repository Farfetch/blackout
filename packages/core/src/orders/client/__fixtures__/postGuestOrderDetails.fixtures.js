import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(join('/api/legacy/v1/guestorders', params.orderId), {
      method: 'post',
      response: params.response,
      status: 202,
    });
  },
  failure: params => {
    moxios.stubRequest(join('/api/legacy/v1/guestorders', params.orderId), {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
