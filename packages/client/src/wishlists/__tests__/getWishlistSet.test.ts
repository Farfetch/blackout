import { getWishlistSet } from '..';
import {
  mockWishlistId,
  mockWishlistSetId,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/getWishlistSet.fixtures';
import mswServer from '../../../tests/mswServer';

describe('getWishlistSet', () => {
  const expectedConfig = undefined;
  const wishlistId = mockWishlistId;
  const wishlistSetId = mockWishlistSetId;
  const spy = jest.spyOn(client, 'get');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    const response = mockWishlistsSetResponse;

    mswServer.use(fixtures.success(response));
    expect.assertions(2);

    await expect(getWishlistSet(wishlistId, wishlistSetId)).resolves.toEqual(
      response,
    );

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/sets/${wishlistSetId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());
    expect.assertions(2);

    await expect(
      getWishlistSet(wishlistId, wishlistSetId),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${wishlistId}/sets/${wishlistSetId}`,
      expectedConfig,
    );
  });
});
