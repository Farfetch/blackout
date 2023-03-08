import * as profileClient from '../index.js';
import { attributeId, userId } from 'tests/__fixtures__/users/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/patchUserAttribute.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';
import type { PatchUserAttributeData } from '../index.js';

describe('patchUserAttribute', () => {
  const expectedConfig = undefined;
  const data: PatchUserAttributeData[] = [
    {
      path: 'string',
      op: 'replace',
      value: 'string',
    },
  ];

  const spy = jest.spyOn(client, 'patch');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = 200;

    mswServer.use(fixtures.success(response));

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
