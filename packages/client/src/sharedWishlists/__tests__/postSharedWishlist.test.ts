import {
  mockSharedWishlistPostData,
  mockSharedWishlistsResponse,
} from 'tests/__fixtures__/sharedWishlists/index.mjs';
import { postSharedWishlist } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/postSharedWishlist.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('postSharedWishlist', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    const response = mockSharedWishlistsResponse;

    mswServer.use(fixtures.success(response));

    await expect(
      postSharedWishlist(mockSharedWishlistPostData),
    ).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/sharedWishlists',
      mockSharedWishlistPostData,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      postSharedWishlist(mockSharedWishlistPostData),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      '/commerce/v1/sharedWishlists',
      mockSharedWishlistPostData,
      expectedConfig,
    );
  });
});
