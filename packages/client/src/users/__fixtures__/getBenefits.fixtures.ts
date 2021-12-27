import get from 'lodash/get';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest('/api/legacy/v1/userbenefits', {
      response: get(params, 'response'),
      status: 200,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/legacy/v1/userbenefits', {
      response: 'stub error',
      status: 404,
    });
  },
};
