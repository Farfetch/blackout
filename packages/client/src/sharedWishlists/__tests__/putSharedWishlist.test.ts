import {
  mockSharedWishlistId,
  mockSharedWishlistsResponse,
} from 'tests/__fixtures__/sharedWishlists/index.mjs';
import { putSharedWishlist } from '../index.js';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/putSharedWishlist.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('putSharedWishlist', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'put');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    const response = mockSharedWishlistsResponse;

    mswServer.use(fixtures.success(response));

    await expect(putSharedWishlist(mockSharedWishlistId)).resolves.toEqual(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sharedWishlists/${mockSharedWishlistId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      putSharedWishlist(mockSharedWishlistId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/sharedWishlists/${mockSharedWishlistId}`,
      expectedConfig,
    );
  });
});
