import * as profileClient from '..';
import {
  mockUserAttributesData,
  mockUserAttributesResponse,
  userId,
} from 'tests/__fixtures__/users';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postUserAttribute.fixtures';
import mswServer from '../../../../tests/mswServer';

describe('postUserAttribute', () => {
  const expectedConfig = undefined;
  const data = mockUserAttributesData;
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockUserAttributesResponse));

    expect.assertions(2);

    await expect(
      profileClient.postUserAttribute(userId, data),
    ).resolves.toStrictEqual(mockUserAttributesResponse);
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    expect.assertions(2);

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
