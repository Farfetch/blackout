import { getWishlistSets } from '../index.js';
import {
  mockWishlistId,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getWishlistSets.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getWishlistSets', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    const response = [mockWishlistsSetResponse];

    mswServer.use(fixtures.success(response));

    await expect(getWishlistSets(mockWishlistId)).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/sets`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(getWishlistSets(mockWishlistId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/sets`,
      expectedConfig,
    );
  });
});
