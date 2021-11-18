import { deleteDefaultContactAddress } from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/deleteDefaultContactAddress.fixtures';
import moxios from 'moxios';

describe('deleteDefaultContactAddress', () => {
  const userId = 'c9ce5410-58d9-4298-a385-231a79373e4a';
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');
  const expectedUrl = `/account/v1/users/${userId}/addresses/preferred/current`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixture.success({ userId });

    expect.assertions(2);

    await expect(deleteDefaultContactAddress(userId)).resolves.toBe(204);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixture.failure({ userId });

    expect.assertions(2);

    await expect(deleteDefaultContactAddress(userId)).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
