import * as profileClient from '../index.js';
import { attributeId, userId } from 'tests/__fixtures__/users/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/deleteUserAttribute.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('deleteUserAttribute', () => {
  const expectedConfig = undefined;
  const spy = jest.spyOn(client, 'delete');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = 200;

    mswServer.use(fixtures.success(response));

    await expect(
      profileClient.deleteUserAttribute(userId, attributeId),
    ).resolves.toStrictEqual(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      profileClient.deleteUserAttribute(userId, attributeId),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      expectedConfig,
    );
  });
});
