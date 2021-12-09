import * as profileClient from '../';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/deleteUserAttribute.fixtures';
import moxios from 'moxios';

describe('deleteUserAttribute', () => {
  const expectedConfig = undefined;
  const userId = 123456;
  const attributeId = '123456';
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => {
    moxios.install(client);
    jest.clearAllMocks();
  });

  afterEach(() => moxios.uninstall(client));

  it('should handle a client request successfully', async () => {
    fixtures.success(userId, attributeId);

    expect.assertions(2);

    await expect(
      profileClient.deleteUserAttribute(userId, attributeId),
    ).resolves.toMatchObject(
      expect.objectContaining({
        status: 200,
      }),
    );
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    fixtures.failure(userId, attributeId);

    expect.assertions(2);

    await expect(
      profileClient.deleteUserAttribute(userId, attributeId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      expectedConfig,
    );
  });
});
