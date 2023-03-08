import { getSharedWishlist } from '../index.js';
import {
  mockSharedWishlistId,
  mockSharedWishlistsResponse,
} from 'tests/__fixtures__/sharedWishlists/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getSharedWishlist.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getSharedWishlist', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockSharedWishlistsResponse));

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

    await expect(
      getSharedWishlist(mockSharedWishlistId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sharedWishlists/${mockSharedWishlistId}`,
      expectedConfig,
    );
  });
});
