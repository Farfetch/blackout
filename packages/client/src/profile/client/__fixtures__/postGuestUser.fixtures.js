import get from 'lodash/get';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest('/api/account/v1/guestUsers', {
      method: 'post',
      response: get(params, 'response'),
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/account/v1/guestUsers', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
