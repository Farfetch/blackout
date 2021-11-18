import join from 'proper-url-join';
import moxios from 'moxios';

export default {
  success: params => {
    moxios.stubRequest(
      join(
        '/api/commerce/v1/wishlists',
        params.wishlistId,
        'sets',
        params.wishlistSetId,
      ),
      {
        method: 'patch',
        status: 204, // No content
      },
    );
  },
  failure: params => {
    moxios.stubRequest(
      join(
        '/api/commerce/v1/wishlists',
        params.wishlistId,
        'sets',
        params.wishlistSetId,
      ),
      {
        method: 'patch',
        response: 'stub error',
        status: 404,
      },
    );
  },
};
