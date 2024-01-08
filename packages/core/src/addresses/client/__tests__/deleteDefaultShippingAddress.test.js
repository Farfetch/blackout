import { deleteDefaultShippingAddress } from '../';
import client from '../../../helpers/client';
import fixture from '../__fixtures__/deleteDefaultShippingAddress.fixtures';
import moxios from 'moxios';

describe('deleteDefaultShippingAddress', () => {
  const userId = '123456';
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');
  const expectedUrl = `/account/v1/users/${userId}/addresses/shipping/current`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixture.success({ userId });

    expect.assertions(2);

    await expect(deleteDefaultShippingAddress(userId)).resolves.toBe(204);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixture.failure({ userId });

    expect.assertions(2);

    await expect(
      deleteDefaultShippingAddress(userId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
