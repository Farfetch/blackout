import * as profileClient from '../index.js';
import {
  mockUserAttributeResponse,
  mockUserAttributesData,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postUserAttribute.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('postUserAttribute', () => {
  const expectedConfig = undefined;
  const data = mockUserAttributesData;
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockUserAttributeResponse));

    await expect(
      profileClient.postUserAttribute(userId, data),
    ).resolves.toStrictEqual(mockUserAttributeResponse);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      profileClient.postUserAttribute(userId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes`,
      data,
      expectedConfig,
    );
  });
});
