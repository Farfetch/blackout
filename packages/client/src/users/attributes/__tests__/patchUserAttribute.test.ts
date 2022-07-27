import * as profileClient from '..';
import { attributeId, userId } from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/patchUserAttribute.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('patchUserAttribute', () => {
  const expectedConfig = undefined;
  const data = [
    {
      path: 'string',
      op: 'string',
      value: 'string',
    },
  ];

  const spy = jest.spyOn(client, 'patch');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = 200;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(
      profileClient.patchUserAttribute(userId, attributeId, data),
    ).resolves.toBe(response);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

    await expect(
      profileClient.patchUserAttribute(userId, attributeId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes/${attributeId}`,
      data,
      expectedConfig,
    );
  });
});