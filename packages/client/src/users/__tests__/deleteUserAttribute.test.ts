import * as profileClient from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/deleteUserAttribute.fixtures';
import mswServer from '../../../tests/mswServer';

describe('deleteUserAttribute', () => {
  const expectedConfig = undefined;
  const userId = 123456;
  const attributeId = '123456';
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = 200;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(
      profileClient.deleteUserAttribute(userId, attributeId),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

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
