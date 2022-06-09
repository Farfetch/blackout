import * as profileClient from '..';
import {
  mockUserAttributesData,
  mockUserAttributesResponse,
} from 'tests/__fixtures__/users';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postUserAttributes.fixtures';
import mswServer from '../../../tests/mswServer';

describe('postUserAttributes', () => {
  const expectedConfig = undefined;
  const data = mockUserAttributesData;
  const userId = 123456;
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = mockUserAttributesResponse;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(
      profileClient.postUserAttributes(userId, data),
    ).resolves.toStrictEqual(response);
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
      profileClient.postUserAttributes(userId, data),
    ).rejects.toMatchSnapshot();
    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/attributes`,
      data,
      expectedConfig,
    );
  });
});
