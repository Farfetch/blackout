import {
  mockSharedWishlistId,
  mockSharedWishlistsResponse,
} from 'tests/__fixtures__/sharedWishlists';
import { putSharedWishlist } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/putSharedWishlist.fixtures';
import mswServer from '../../../tests/mswServer';

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
