import { getWishlistSet } from '../index.js';
import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists/index.mjs';
import client from '../../helpers/client/index.js';
import fixtures from '../__fixtures__/getWishlistSet.fixtures.js';
import mswServer from '../../../tests/mswServer.js';

describe('getWishlistSet', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockWishlistsSetResponse));

    await expect(
      getWishlistSet(mockWishlistId, mockWishlistSetId),
    ).resolves.toEqual(mockWishlistsSetResponse);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/sets/${mockWishlistSetId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      getWishlistSet(mockWishlistId, mockWishlistSetId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/sets/${mockWishlistSetId}`,
      expectedConfig,
    );
  });
});
