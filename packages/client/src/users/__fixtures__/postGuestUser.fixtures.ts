import get from 'lodash/get';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest('/api/account/v1/guestUsers', {
      response: get(params, 'response'),
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/account/v1/guestUsers', {
      response: 'stub error',
      status: 404,
    });
  },
};
