import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest('/api/commerce/v1/sharedWishlists', {
      method: 'post',
      response: params.response,
      status: 201,
    });
  },
  failure: () => {
    moxios.stubRequest('/api/commerce/v1/sharedWishlists', {
      method: 'post',
      response: 'stub error',
      status: 404,
    });
  },
};
