import { deleteDefaultContactAddress } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deleteDefaultContactAddress.fixtures';
import mswServer from '../../../tests/mswServer';

describe('deleteDefaultContactAddress', () => {
  const userId = 78910;
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');
  const expectedUrl = `/account/v1/users/${userId}/addresses/preferred/current`;

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success());

    expect.assertions(2);

    await expect(deleteDefaultContactAddress(userId)).resolves.toBe(204);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(deleteDefaultContactAddress(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
