import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      join('/api/commerce/v1/sharedWishlists', params.sharedWishlistId),
      { method: 'delete', status: 204 },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join('/api/commerce/v1/sharedWishlists', params.sharedWishlistId),
      { method: 'delete', response: 'stub error', status: 404 },
    );
  },
};
