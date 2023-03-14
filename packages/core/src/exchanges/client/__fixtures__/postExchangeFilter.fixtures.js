import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: response => {
    moxios.stubRequest(join('/api/account/v1/exchangeFilters'), {
      method: 'post',
      response: response,
      status: 202,
    });
  },
  failure: () => {
    moxios.stubRequest(join('/api/account/v1/exchangeFilters'), {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
