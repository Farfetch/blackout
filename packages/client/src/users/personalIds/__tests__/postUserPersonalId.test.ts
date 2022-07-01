import {
  mockPostPersonalIdsData,
  mockPostPersonalIdsResponse,
  userId,
} from 'tests/__fixtures__/users';
import { postUserPersonalId } from '..';
import client from '../../../helpers/client';
import fixtures from '../__fixtures__/postUserPersonalId.fixtures';
import mswServer from '../../../../tests/mswServer';

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

    expect.assertions(2);

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

    expect.assertions(2);

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
