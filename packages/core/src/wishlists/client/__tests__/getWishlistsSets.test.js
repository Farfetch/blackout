import { getWishlistsSets } from '..';
import {
  mockWishlistId,
  mockWishlistsSetResponse,
} from 'tests/__fixtures__/wishlists';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/getWishlistsSets.fixtures';
import moxios from 'moxios';

describe('getWishlistsSets', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'get');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    const response = [mockWishlistsSetResponse];

    fixtures.success({ wishlistId: mockWishlistId, response });

    await expect(getWishlistsSets(mockWishlistId)).resolves.toBe(response);

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/sets`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure({ wishlistId: mockWishlistId });

    await expect(getWishlistsSets(mockWishlistId)).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/commerce/v1/wishlists/${mockWishlistId}/sets`,
      expectedConfig,
    );
  });
});
