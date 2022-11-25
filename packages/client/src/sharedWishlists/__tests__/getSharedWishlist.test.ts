import { getSharedWishlist } from '..';
import {
  mockSharedWishlistId,
  mockSharedWishlistsResponse,
} from 'tests/__fixtures__/sharedWishlists';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getSharedWishlist.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getSharedWishlist', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockSharedWishlistsResponse));
    expect.assertions(2);

    await expect(getSharedWishlist(mockSharedWishlistId)).resolves.toEqual(
      mockSharedWishlistsResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sharedWishlists/${mockSharedWishlistId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());
    expect.assertions(2);

    await expect(
      getSharedWishlist(mockSharedWishlistId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sharedWishlists/${mockSharedWishlistId}`,
      expectedConfig,
    );
  });
});
