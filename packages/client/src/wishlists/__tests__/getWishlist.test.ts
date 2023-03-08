import { getWishlist } from '../index.js';
import {
  mockWishlistId,
  mockWishlistsResponse,
} from 'tests/__fixtures__/wishlists/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getWishlist.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getWishlist', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockWishlistsResponse));

    await expect(getWishlist(mockWishlistId)).resolves.toEqual(
      mockWishlistsResponse,
    );

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}?hydrate=true`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getWishlist(mockWishlistId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}?hydrate=true`,
      expectedConfig,
    );
  });
});
