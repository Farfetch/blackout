import {
  mockWishlistId,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists';
import { postWishlistSet } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postWishlistSet.fixtures';
import mswServer from '../../../tests/mswServer';

describe('postWishlistSet', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'post');

  beforeEach(jest.clearAllMocks);

  it('should handle a client request successfully', async () => {
    const response = mockWishlistsSetResponse;

    mswServer.use(fixtures.success(response));

    await expect(
      postWishlistSet(mockWishlistId, mockWishlistsSetResponse),
    ).resolves.toEqual(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/sets`,
      mockWishlistsSetResponse,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      postWishlistSet(mockWishlistId, mockWishlistsSetResponse),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/sets`,
      mockWishlistsSetResponse,
      expectedConfig,
    );
  });
});
