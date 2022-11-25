import {
  mockSharedWishlistPostData,
  mockSharedWishlistsResponse,
} from 'tests/__fixtures__/sharedWishlists';
import { postSharedWishlist } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postSharedWishlist.fixtures';
import mswServer from '../../../tests/mswServer';

describe('postSharedWishlist', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    const response = mockSharedWishlistsResponse;

    mswServer.use(fixtures.success(response));
    expect.assertions(2);

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
    expect.assertions(2);

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
