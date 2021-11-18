import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      join(
        '/api/commerce/v1/wishlists',
        params.wishlistId,
        'items',
        params.wishlistItemId,
      ),
      {
        method: 'delete',
        response: params.response,
        status: 200,
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join(
        '/api/commerce/v1/wishlists',
        params.wishlistId,
        'items',
        params.wishlistItemId,
      ),
      {
        method: 'delete',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
