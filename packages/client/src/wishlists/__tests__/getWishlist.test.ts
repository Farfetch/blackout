import { getWishlist } from '..';
import {
  mockWishlistId,
  mockWishlistsResponse,
} from 'tests/__fixtures__/wishlists';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getWishlist.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getWishlist', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockWishlistsResponse));
    expect.assertions(2);

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
    expect.assertions(2);

    await expect(getWishlist(mockWishlistId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}?hydrate=true`,
      expectedConfig,
    );
  });
});
