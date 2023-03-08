import {
  mockPostPersonalIdsData,
  mockPostPersonalIdsResponse,
  userId,
} from 'tests/__fixtures__/users/index.mjs';
import { postUserPersonalId } from '../index.js';
import client from '../../../helpers/client/index.js';
import fixtures from '../__fixtures__/postUserPersonalId.fixtures.js';
import mswServer from '../../../../tests/mswServer.js';

describe('postUserPersonalId', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };
  const data = mockPostPersonalIdsData;
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    mswServer.use(fixtures.success(mockPostPersonalIdsResponse));

    await expect(
      postUserPersonalId(userId, data, config),
    ).resolves.toStrictEqual(mockPostPersonalIdsResponse);

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalids`,
      data,
      expectedConfig,
    );
  });

  it('should receive a client request error', async () => {
    mswServer.use(fixtures.failure());

    await expect(
      postUserPersonalId(userId, data, config),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalids`,
      data,
      expectedConfig,
    );
  });
});
