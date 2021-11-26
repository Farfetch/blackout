import { putDefaultContactAddress } from '../';
import client from '../../helpers/client';
import fixture from '../__fixtures__/putDefaultContactAddress.fixtures';
import moxios from 'moxios';

describe('putDefaultContactAddress', () => {
  const id = '123456';
  const userId = '1213';
  const spy = jest.spyOn(client, 'put');
  const expectedConfig = undefined;
  const expectedUrl = `/account/v1/users/${userId}/addresses/preferred/${id}`;

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixture.success({ id, userId });

    expect.assertions(2);

    await expect(putDefaultContactAddress(userId, id)).resolves.toBe(204);
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });

  it('should receive a client request error', async () => {
    fixture.failure({ id, userId });

    expect.assertions(2);

    await expect(
      putDefaultContactAddress(userId, id),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(expectedUrl, expectedConfig);
  });
});
