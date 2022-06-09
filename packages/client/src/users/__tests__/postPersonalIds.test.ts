import {
  mockPostPersonalIdsData,
  mockPostPersonalIdsResponse,
} from 'tests/__fixtures__/users';
import { postPersonalIds } from '..';
import client from '../../helpers/client';
import fixtures from '../__fixtures__/postPersonalIds.fixtures';
import mswServer from '../../../tests/mswServer';

describe('postPersonalIds', () => {
  const expectedConfig = {
    'X-SUMMER-RequestId': 'test',
  };
  const data = mockPostPersonalIdsData;
  const userId = 123456;
  const config = {
    'X-SUMMER-RequestId': 'test',
  };
  const spy = jest.spyOn(client, 'post');

  beforeEach(() => jest.clearAllMocks());

  it('should handle a client request successfully', async () => {
    const response = mockPostPersonalIdsResponse;

    mswServer.use(fixtures.success(response));

    expect.assertions(2);

    await expect(postPersonalIds(userId, data, config)).resolves.toStrictEqual(
      response,
    );

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
      postPersonalIds(userId, data, config),
    ).rejects.toMatchSnapshot();

    expect(spy).toHaveBeenCalledWith(
      `/account/v1/users/${userId}/personalids`,
      data,
      expectedConfig,
    );
  });
});
